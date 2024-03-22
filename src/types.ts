import { Plugin } from '@custom-elements-manifest/analyzer';
import type { SourceFile } from 'typescript';

type Typescript = typeof import('typescript');

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
     * Add the custom-elements-manifest field to the package.json.
     * @default false
     */
  packageJson?: boolean,
  /**
     * Register files which will be used to build the manifest.
     * You can use pattern to find files.
     * @default []
     */
  files?: string[],

  config?: string,
}

export interface CreateManifestOptions {
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
  /**
     * Use ``custom-elements-manifest/analyzer`` plugins.
     * Get more information about these plugins here:
     *
     * https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/
     */
  plugins?: Plugin[],
  /**
     * Custom override for source file creation in module generation.
     * For more details on this feature, refer to:
     *
     * https://custom-elements-manifest.open-wc.org/analyzer/plugins/authoring/#overriding-sourcefile-creation
     *
     * @param {Object} options - The options object.
     * @param {Typescript} options.ts - The TypeScript instance.
     * @param {string[]} options.globs - An array of glob patterns.
     * @returns {SourceFile[]} An array of SourceFile.
     */
  overrideModuleCreation?: ({ ts, globs }: { ts: Typescript, globs: string[] }) => SourceFile[];
}

export interface ConfigFileOptions {
  globs: string[],
  exclude: string[],
  outdir: string,
  dev: boolean,
  watch: boolean,
  dependencies: boolean,
  packagejson: boolean,

  litelement: boolean,
  catalyst: boolean,
  fast: boolean,
  stencil: boolean,

  plugins: Array<() => Plugin>,
  overrideModuleCreation: ({ ts, globs }: { ts: Typescript, globs: string[] }) => SourceFile[];
}
