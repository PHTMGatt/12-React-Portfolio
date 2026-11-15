import fs from 'node:fs';
import path from 'node:path';
import { pageMetadata, metadataForPath } from '../src/data/pageMetadata.js';
import { caseStudyHeroSizes, portraitSizes, studyTileSizes } from '../src/data/imageSizes.js';

const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderMetadata(html, metadata) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`)
    .replace(/<meta\s+(name|property)="(description|og:title|og:description|og:url|twitter:title|twitter:description)"\s+content="[^"]*"\s*\/>/g,
      (_, attribute, name) => {
        const value = name === 'og:url' ? metadata.canonical : name.endsWith('title') ? metadata.title : metadata.description;
        return `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`;
      });
}

// --- Resource hints -------------------------------------------------------
// Every page except the home page is a lazy chunk, and every opening image is
// only discovered once React has rendered. Left alone, the browser fetches
// them one after another: HTML, then the app, then the page, then the image.
// Each built entry point therefore names what its own page needs, so those
// downloads start alongside the app instead of after it.

// The lazy page each entry point renders first.
const routeModules = [
  [/^\/work\/[^/]+$/, 'src/pages/CaseStudy/CaseStudy.jsx'],
  [/^\/work$/, 'src/pages/Portfolio/Portfolio.jsx'],
  [/^\/resume$/, 'src/pages/Resume/Resume.jsx'],
  [/^\/contact$/, 'src/pages/Contact/Contact.jsx'],
];

const generatedDir = 'src/assets/photos/generated';

// Which artwork each case study opens with, read from the same file the
// pages use, so a swapped image never needs a second edit here.
function readCaseStudyArtwork(root) {
  const source = fs.readFileSync(path.join(root, 'src/data/caseStudies.js'), 'utf8');
  const imports = new Map(
    [...source.matchAll(/^import (\w+) from '\.\.\/assets\/photos\/generated\/([^']+)\.js';$/gm)].map((match) => [match[1], match[2]])
  );
  return [...source.matchAll(/\bslug: '([^']+)'[\s\S]*?\bimage: (\w+),/g)].map((match) => ({ slug: match[1], artwork: imports.get(match[2]) }));
}

// The opening image of a route: [generated image module, `sizes` hint].
function openingImage(route, studies) {
  if (route === '/') return ['bryen-headshot.webp', portraitSizes];
  if (route === '/work') return [studies[0]?.artwork, studyTileSizes];
  const study = studies.find((item) => route === `/work/${item.slug}`);
  return study ? [study.artwork, caseStudyHeroSizes] : null;
}

// Turn a generated image module into the built, fingerprinted srcset.
function builtSrcset(root, name, builtFile) {
  const module = fs.readFileSync(path.join(root, generatedDir, `${name}.js`), 'utf8');
  const files = new Map([...module.matchAll(/^import (\w+) from "([^"]+)";$/gm)].map((match) => [match[1], match[2]]));
  const candidates = [...module.matchAll(/(\w+) \+ ' (\d+)w'/g)].map((match) => ({ file: files.get(match[1]), width: match[2] }));
  const fallback = files.get(module.match(/\bsrc: (\w+)/)?.[1]);
  if (!candidates.length || !fallback) throw new Error(`Cannot read image candidates from ${name}.js`);
  const resolve = (file) => builtFile(path.posix.join(generatedDir, file));
  return { src: resolve(fallback), srcset: candidates.map(({ file, width }) => `${resolve(file)} ${width}w`).join(', ') };
}

export default function routeMetadataPlugin() {
  let enabled;
  let root;
  return {
    name: 'portfolio-route-metadata',
    configResolved(config) {
      // Hash-router review builds use a single relative-base entry point.
      enabled = config.base === '/';
      root = config.root;
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        if (!enabled) return;
        const entry = bundle['index.html'];
        if (!entry || entry.type !== 'asset') throw new Error('Missing built portfolio entry point');
        const template = String(entry.source);
        const files = Object.values(bundle);
        const normalise = (file) => file.replace(/\\/g, '/');

        const builtFile = (sourcePath) => {
          const asset = files.find((file) => file.type === 'asset' && file.originalFileNames?.some((original) => normalise(original) === sourcePath));
          if (!asset) throw new Error(`No built file for ${sourcePath}`);
          return `/${encodeURI(asset.fileName)}`;
        };

        // The page chunk, the chunks it imports and their styles, skipping
        // anything the shared entry point already loads.
        const pageHints = (route) => {
          const module = routeModules.find(([pattern]) => pattern.test(route))?.[1];
          if (!module) return [];
          const page = files.find((file) => file.type === 'chunk' && file.facadeModuleId && normalise(file.facadeModuleId).endsWith(`/${module}`));
          if (!page) throw new Error(`No built chunk for ${module}`);
          const scripts = [];
          const styles = [];
          const visit = (chunk) => {
            if (scripts.includes(chunk.fileName) || template.includes(chunk.fileName)) return;
            scripts.push(chunk.fileName);
            for (const style of chunk.viteMetadata?.importedCss ?? []) if (!styles.includes(style) && !template.includes(style)) styles.push(style);
            for (const imported of chunk.imports) if (bundle[imported]?.type === 'chunk') visit(bundle[imported]);
          };
          visit(page);
          return [
            ...styles.map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
            ...scripts.map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
          ];
        };

        const studies = readCaseStudyArtwork(root);
        const imageHint = (route) => {
          const image = openingImage(route, studies);
          if (!image) return [];
          const [name, sizes] = image;
          if (!name) throw new Error(`No opening image known for ${route}`);
          const { src, srcset } = builtSrcset(root, name, builtFile);
          return [`<link rel="preload" as="image" href="${escapeHtml(src)}" imagesrcset="${escapeHtml(srcset)}" imagesizes="${escapeHtml(sizes)}">`];
        };

        for (const route of Object.keys(pageMetadata)) {
          const hints = [...pageHints(route), ...imageHint(route)].map((tag) => `    ${tag}\n`).join('');
          const source = renderMetadata(template, metadataForPath(route)).replace('  </head>', `${hints}  </head>`);
          if (route === '/') entry.source = source;
          else this.emitFile({ type: 'asset', fileName: `${route.slice(1)}.html`, source });
        }
      },
    },
  };
}
