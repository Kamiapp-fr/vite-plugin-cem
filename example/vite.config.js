import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from '../';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest()
  ]
})