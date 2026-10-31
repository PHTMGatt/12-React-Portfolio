import { pageMetadata, metadataForPath } from '../src/data/pageMetadata.js';

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

export default function routeMetadataPlugin() {
  let enabled;
  return {
    name: 'portfolio-route-metadata',
    configResolved(config) {
      // Hash-router review builds use a single relative-base entry point.
      enabled = config.base === '/';
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        if (!enabled) return;
        const entry = bundle['index.html'];
        if (!entry || entry.type !== 'asset') throw new Error('Missing built portfolio entry point');
        const template = String(entry.source);
        for (const path of Object.keys(pageMetadata)) {
          const source = renderMetadata(template, metadataForPath(path));
          if (path === '/') entry.source = source;
          else this.emitFile({ type: 'asset', fileName: `${path.slice(1)}.html`, source });
        }
      },
    },
  };
}
