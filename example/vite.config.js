import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-cem';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/title-element.ts'],
      lit: true,
    })
  ]
})