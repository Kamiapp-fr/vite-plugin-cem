import { defineConfig } from 'vite';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/my-element.ts'],
      lit: true,
    }),
  ],
});
