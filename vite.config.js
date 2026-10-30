import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import routeMetadataPlugin from './scripts/route-metadata-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeMetadataPlugin()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['one2-react-portfolio.onrender.com']
  }
})
