import { Plugin } from 'vite';
import { createManifest } from './create';

export interface VitePluginCustomElementsManifestOptions {
  endpoint?: string,
  files?: string[],
}

function VitePluginCustomElementsManifest({
  endpoint = '/custom-element.json',
  files = [],
}: VitePluginCustomElementsManifestOptions = {}): Plugin {
  return {
    name: 'vite-plugin-custom-elements-manifest',
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res, next) => {
        const manifest = await createManifest(files);

        res.end(JSON.stringify(manifest))
      })
    },
  }
}

export default VitePluginCustomElementsManifest;