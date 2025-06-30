import { join } from 'path';
import { pathToFileURL } from 'url';
import { ConfigFileOptions, VitePluginCustomElementsManifestOptions } from './types';

export async function loadConfigFromFile(name: string = 'custom-elements-manifest.config.mjs') {
  try {
    const configPath = join(process.cwd(), name);
    const fileUrl = pathToFileURL(configPath).href;
    const config = await import(fileUrl);

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
    packagejson = packageJson,
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
    dev,
    lit,
    catalyst,
    fast,
    stencil,
    plugins,
    files: globs,
    packageJson: packagejson,
    overrideModuleCreation,
  };
}
