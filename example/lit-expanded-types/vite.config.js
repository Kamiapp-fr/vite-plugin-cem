import { defineConfig } from 'vite'
import { expandTypesPlugin, getTsProgram } from 'cem-plugin-expanded-types';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/**/*.ts'],
      lit: true,
      overrideModuleCreation({ ts, globs }) {
        const program = getTsProgram(ts, globs, "tsconfig.json");

        return program
          .getSourceFiles()
          .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
      },
      plugins: [
        expandTypesPlugin(),
      ]
    })
  ]
})