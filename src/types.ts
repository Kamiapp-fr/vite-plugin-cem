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
  /**
   * Defines the name of your config file *(optional)*
   * @default 'custom-elements-manifest.config.mjs'
   */
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

/**
 * This is the current compatible option you can use with the `custom-elements-manifest.config.mjs`.
 * Other options are currently not supported.
 * For more details about this, refer to:
 *
 * https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file
 */
export interface ConfigFileOptions {
  /**
   * Globs to analyze
   */
  globs: string[],
  /**
   * Run in dev mode, provides extra logging
   */
  dev: boolean,
  /**
   * Output CEM path to `package.json`, defaults to true
   */
  packagejson: boolean,
  /**
   * Enable special handling for litelement
   */
  litelement: boolean,
  /**
   * Enable special handling for catalyst
   */
  catalyst: boolean,
  /**
   * Enable special handling for fast
   */
  fast: boolean,
  /**
   * Enable special handling for stencil
   */
  stencil: boolean,
  /**
   * Provide custom plugins
   */
  plugins: Array<() => Plugin>,
  /**
   * Overrides default module creation:
   */
  overrideModuleCreation: ({ ts, globs }: { ts: Typescript, globs: string[] }) => SourceFile[];
}
