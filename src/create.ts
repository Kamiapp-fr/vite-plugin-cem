import glob from 'glob';
import { readFileSync } from 'fs';
import {
  create,
  litPlugin,
  catalystPlugin,
  stencilPlugin,
  fastPlugin,
  ts,
} from '@custom-elements-manifest/analyzer/src/browser-entrypoint.js';
import type { SourceFile } from 'typescript';
import type { CreateManifestOptions } from './types';

function createModule(path: string) {
  const source = readFileSync(path).toString();

  return ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.ES2015,
    true,
  ) as SourceFile;
}

function createManifest(paths: string[], {
  lit,
  fast,
  stencil,
  catalyst,
  dev = false,
  plugins = [],
  overrideModuleCreation,
}: CreateManifestOptions = {}) {
  const useCustomModuleCreation = overrideModuleCreation !== undefined;
  const files = paths.map((p) => glob.sync(p, { absolute: useCustomModuleCreation })).flat();

  const modules = useCustomModuleCreation
    ? overrideModuleCreation({ ts, globs: files })
    : files.map(createModule);

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
