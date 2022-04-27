import { readFileSync } from 'fs';
import { 
  create, 
  litPlugin,
  catalystPlugin,
  stencilPlugin,
  fastPlugin,
  ts 
} from '@custom-elements-manifest/analyzer/src/browser-entrypoint.js';
  
interface CreateManifestOptions {
  lit?: boolean,
  fast?: boolean,
  stencil?: boolean,
  catalyst?: boolean,
  dev?: boolean,
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
  
function createManifest(paths: string[], {
  lit,
  fast,
  stencil,
  catalyst,
  dev = false
}: CreateManifestOptions = {}) {
  const plugins = [];
  const modules = paths.map(createModule);

  if (lit) {
    plugins.push(...litPlugin());
  }

  if (fast) {
    plugins.push(...fastPlugin());
  }

  if (stencil) {
    plugins.push(...stencilPlugin());
  }

  if (catalyst) {
    plugins.push(...catalystPlugin());
  }
  
  return create({
    modules,
    plugins,
    dev,
  });
}

export {
  createModule,
  createManifest,
  CreateManifestOptions
}