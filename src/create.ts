import { readFileSync } from 'fs';
import {
  create,
  litPlugin,
  catalystPlugin,
  stencilPlugin,
  fastPlugin,
  ts,
} from '@custom-elements-manifest/analyzer/src/browser-entrypoint.js';

interface CreateManifestOptions {
  /**
   * Use the lit plugin to parse files
   */
  lit?: boolean,
  /**
   * Use the fast plugin to parse files
   */
  fast?: boolean,
  /**
   * Use the stencil plugin to parse files
   */
  stencil?: boolean,
  /**
   * Use the catalyst plugin to parse files
   */
  catalyst?: boolean,
  /**
   * Run the analyze builder in dev mode.
   * @default false
   */
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
  dev = false,
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
  CreateManifestOptions,
};
