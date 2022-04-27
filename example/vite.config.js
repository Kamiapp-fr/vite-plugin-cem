import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from '../dist/index.js';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest()
  ]
})