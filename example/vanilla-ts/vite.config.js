import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest()
  ]
})