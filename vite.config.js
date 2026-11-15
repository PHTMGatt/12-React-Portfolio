import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import routeMetadataPlugin from './scripts/route-metadata-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeMetadataPlugin()],
  build: {
    // Terser packs the entry chunk ~3 kB gz tighter than esbuild, which keeps
    // it under the 100 kB gz budget (npm run check:bundle). Output is identical
    // in behaviour; only minification differs.
    minify: 'terser',
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['one2-react-portfolio.onrender.com']
  }
})
