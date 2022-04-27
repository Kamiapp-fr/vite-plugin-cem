import { readFileSync } from 'fs';
import { create, litPlugin, ts } from '@custom-elements-manifest/analyzer/src/browser-entrypoint.js';
  
function createModule(path: string) {
  const source = readFileSync(path).toString();
  
  return ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.ES2015,
    true,
  );
}
  
function createManifest(paths: string[]) {
  const modules = paths.map(createModule);;
  
  return create({
    modules,
    plugins: [...litPlugin()],
    dev: false,
  });
}

export {
  createModule,
  createManifest
}