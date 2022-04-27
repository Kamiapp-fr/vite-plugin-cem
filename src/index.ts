import { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { create, litPlugin, ts } from '@custom-elements-manifest/analyzer/src/browser-entrypoint.js';

function createModules(paths: string[]) {
  return paths.map(createModule);
}

function createModule(path: string) {
  const source = readFileSync(path).toString();
  
  return ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.ES2015,
    true,
  );
}

function createManifest() {
  const modules = createModules([]);

  return create({
    modules,
    plugins: [...litPlugin()],
    dev: false,
});
}


function VitePluginCustomElementsManifest(): Plugin {
  return {
    name: 'vite-plugin-custom-elements-manifest',
    configureServer(server) {
      server.middlewares.use('/custom-element.json', async (req, res, next) => {
          const manifest = await createManifest();

          res.end(JSON.stringify(manifest))
      })
    },
  }
}

export default VitePluginCustomElementsManifest;