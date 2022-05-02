import { Plugin } from 'vite';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import { createManifest, CreateManifestOptions } from './create';

export interface VitePluginCustomElementsManifestOptions extends CreateManifestOptions {
  /**
   * Define where will be serve the manifest.
   * This option only work in development mode.
   * @default '/custom-elements.json'
   */
  endpoint?: string,
  /**
   * Define where will be build the final manifest.
   * This option only work in production mode.
   * @default 'custom-elements.json'
   */
  output?: string,
  /**
   * Register files which will be used to build the manifest.
   * @default []
   */
  files?: string[],
}

function VitePluginCustomElementsManifest({
  endpoint = '/custom-elements.json',
  output = 'custom-elements.json',
  files = [],
  ...createManifestOptions
}: VitePluginCustomElementsManifestOptions = {}): Plugin {
  return {
    name: 'vite-plugin-custom-elements-manifest',
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res) => {
        const manifest = createManifest(files, createManifestOptions);

        res.end(JSON.stringify(manifest));
      });
    },
    generateBundle(this, { dir }) {
      const path = join(dir, output);
      const manifest = createManifest(files, createManifestOptions);

      mkdirSync(dir, { recursive: true });
      writeFileSync(path, JSON.stringify(manifest));
    },
  };
}

export default VitePluginCustomElementsManifest;
