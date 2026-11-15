import fs from 'node:fs';
import path from 'node:path';

// Every file Vite writes to /assets/ has a fingerprint of its contents in its
// name, so a given URL never changes. Browsers and CDNs may keep those files
// for a year without asking again; the HTML that points at them stays
// uncached, so a new deploy is picked up on the next visit.
//
// `vite preview` is the production server on Render, and by default it marks
// everything `no-cache`. This sets the long-lived header there. Netlify reads
// the same rule from public/_headers; keep the two in step.
export const immutableAssets = 'public, max-age=31536000, immutable';

export default function assetCachePlugin() {
  return {
    name: 'portfolio-asset-cache',
    configurePreviewServer(server) {
      const assets = path.resolve(server.config.root, server.config.build.outDir, 'assets');
      server.middlewares.use((request, response, next) => {
        const pathname = decodeURIComponent((request.url || '').split('?')[0]);
        // Only real files: a missing asset falls through to the app shell,
        // which must never be cached under a fingerprinted name.
        if (pathname.startsWith('/assets/') && !pathname.includes('..')) {
          const file = path.join(assets, pathname.slice('/assets/'.length));
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            // The preview server writes its own `no-cache` with the response
            // head, so the header has to be replaced at that moment. The
            // head arrives with a headers object for plain responses and
            // without one for compressed responses; cover both.
            const writeHead = response.writeHead;
            response.writeHead = function (status, ...rest) {
              if (status === 200 || status === 206) {
                const headers = rest.find((argument) => argument && typeof argument === 'object');
                if (headers) headers['Cache-Control'] = immutableAssets;
                this.setHeader('Cache-Control', immutableAssets);
              }
              return writeHead.call(this, status, ...rest);
            };
          }
        }
        next();
      });
    },
  };
}
