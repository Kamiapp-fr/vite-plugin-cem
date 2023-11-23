import { Plugin } from 'vite';
import {
  join, posix, relative, sep,
} from 'path';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { createManifest, CreateManifestOptions } from './create';

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
}

function VitePluginCustomElementsManifest({
  endpoint = '/custom-elements.json',
  output = 'custom-elements.json',
  packageJson = false,
  files = [],
  ...createManifestOptions
}: VitePluginCustomElementsManifestOptions = {}): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-cem/custom-elements-manifest';
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  return {
    name: 'vite-plugin-custom-elements-manifest',
    configureServer(server) {
      server.middlewares.use(endpoint, async (req, res) => {
        const manifest = createManifest(files, createManifestOptions);

        res.end(JSON.stringify(manifest));
      });
    },
    generateBundle(this, { dir }) {
      const path = join(dir, output);
      const manifest = createManifest(files, createManifestOptions);

      mkdirSync(dir, { recursive: true });
      writeFileSync(path, JSON.stringify(manifest));

      if (packageJson) {
        const packageJsonPath = `${process.cwd()}${sep}package.json`;
        const pkg = JSON.parse(readFileSync(packageJsonPath).toString());
        const relativePath = relative(process.cwd(), path);

        pkg.customElements = relativePath.split(sep).join(posix.sep);

        writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
      }
    },
    resolveId(id) {
      if (id !== virtualModuleId) {
        return undefined;
      }

      return resolvedVirtualModuleId;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return undefined;
      }

      const manifest = createManifest(files, createManifestOptions);
      return `export default ${JSON.stringify(manifest)}`;
    },
    async handleHotUpdate({ server }) {
      const mod = await server.moduleGraph.getModuleByUrl(resolvedVirtualModuleId);

      if (!mod) {
        return;
      }

      server.reloadModule(mod);
    },
  };
}

export default VitePluginCustomElementsManifest;
