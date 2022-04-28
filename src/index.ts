import { Plugin } from 'vite';
import { createManifest, CreateManifestOptions } from './create';
import { writeFileSync } from 'fs';

export interface VitePluginCustomElementsManifestOptions extends CreateManifestOptions {
  endpoint?: string,
  output?: string,
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
      server.middlewares.use(endpoint, async (req, res, next) => {
        const manifest = createManifest(files, createManifestOptions);

        res.end(JSON.stringify(manifest))
      })
    },
    generateBundle(this, { dir }) {
      const path = `${dir}/${output}`;
      const manifest = createManifest(files, createManifestOptions);

      writeFileSync(path, JSON.stringify(manifest));
    }
  }
}

export default VitePluginCustomElementsManifest;