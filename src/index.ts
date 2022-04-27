import { Plugin } from 'vite';
import { createManifest, CreateManifestOptions } from './create';

export interface VitePluginCustomElementsManifestOptions extends CreateManifestOptions {
  endpoint?: string,
  files?: string[],
}

function VitePluginCustomElementsManifest({
  endpoint = '/custom-element.json',
  files = [],
  ...createManifestOptions
}: VitePluginCustomElementsManifestOptions = {}): Plugin {
  return {
    name: 'vite-plugin-custom-elements-manifest',
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res, next) => {
        const manifest = await createManifest(files, createManifestOptions);

        res.end(JSON.stringify(manifest))
      })
    },
  }
}

export default VitePluginCustomElementsManifest;