import { ConfigFileOptions, VitePluginCustomElementsManifestOptions } from './types';

export async function loadConfigFromFile(name: string = 'custom-elements-manifest.config.mjs') {
  try {
    const config = await import(`${process.cwd()}/${name}`);
    return config.default as ConfigFileOptions;
  } catch (error) {
    return undefined;
  }
}

export async function loadOptions({
  endpoint = '/custom-elements.json',
  output = 'custom-elements.json',
  packageJson = false,
  files = [],
  config,
  ...createManifestOptions
}: VitePluginCustomElementsManifestOptions): Promise<VitePluginCustomElementsManifestOptions> {
  const configFile = await loadConfigFromFile(config);

  if (!configFile) {
    return {
      endpoint,
      output,
      packageJson,
      files,
      ...createManifestOptions,
    };
  }

  const {
    globs = files,
    dev = createManifestOptions.dev,
    litelement: lit = createManifestOptions.lit,
    catalyst = createManifestOptions.catalyst,
    fast = createManifestOptions.fast,
    stencil = createManifestOptions.stencil,
    plugins = createManifestOptions.plugins,
    overrideModuleCreation = createManifestOptions.overrideModuleCreation,
  } = configFile;

  return {
    endpoint,
    output,
    files: globs,
    dev,
    packageJson,
    lit,
    catalyst,
    fast,
    stencil,
    plugins,
    overrideModuleCreation,
  };
}
