# vite-plugin-cem

[![CI/CD](https://github.com/Kamiapp-fr/vite-plugin-cem/actions/workflows/main.yml/badge.svg)](https://github.com/Kamiapp-fr/vite-plugin-cem/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/vite-plugin-cem)
![GitHub](https://img.shields.io/github/license/kamiapp-fr/vite-plugin-cem)

Build automaticaly the manifest of your custom-elements. This plugin use the [@custom-elements-manifest/analyzer](https://github.com/open-wc/custom-elements-manifest/tree/master/packages/analyzer) to build the manifest. Here is what the plugin does depending on the environnement.

* **Development:** Serve the manifest and rebuild it on the fly.
* **Production:** Build the final manifest.

> See the [custom-elements-manifest
](https://github.com/webcomponents/custom-elements-manifest) repository to get more information about the manifest.

## Install

Run one of the following command to install the plugin.

```console
$ npm i vite-plugin-cem --save-dev
```

## Usage

Add `VitePluginCustomElementsManifest` plugin to ``vite.config.js`` and configure it :

```js
import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-cem';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/title-element.ts']
    })
  ]
})
```

Using the [api-viewer-element](https://github.com/open-wc/api-viewer-element) in your html : 

```html
<body>
  <api-viewer src="/custom-elements.json" selected="title-element"></api-viewer>

  <script type="module" src="/src/main.ts"></script>
</body>
```

### Plugins

This plugin support `custom-elements-manifest/analyzer` plugins. You can get more information about these plugins [here](https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/). This is an example how to use plugins. 
 
First install the plugin :

```console
$ npm install --save-dev cem-plugin-jsdoc-example
```

And register it using the ``plugins`` field :

```js
import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/title-element.ts'],
      lit: true,
      plugins: [
        jsdocExamplePlugin(),
      ]
    })
  ]
})
```

> Yes, it's *pluginsception* !

### Config File

Similar to the `@custom-elements-manifest/analyzer`, you can utilize a configuration file. 
By default, it will attempt to load the `custom-elements-manifest.config.mjs` file located at the root of your project.

```typescript
// It will attempt to load the `custom-elements-manifest.config.mjs` file by default
export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest()
  ]
})
```

You also have the option to specify a custom configuration file using the `config` option.

```typescript
// Here, it will attempt to load the `cem.config.mjs` file
export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      config: 'cem.config.mjs'
    })
  ]
})
```

### Virtual import

You can employ virtual import to seamlessly utilize the manifest built into your code. To achieve this, simply include the following line: 

```ts
import manifest from 'virtual:vite-plugin-cem/custom-elements-manifest';
```

#### Storybook Integration

For direct integration of your custom element with Storybook, utilize the following virtual import:

```ts
// .storybook/preview.ts
import { setCustomElementsManifest } from '@storybook/web-components'
import manifest from 'virtual:vite-plugin-cem/custom-elements-manifest';

setCustomElementsManifest(manifest)
```

#### Storybook with cem-plugin-better-lit-types

If you're leveraging the ``cem-plugin-better-lit-types`` plugin, enhance your Storybook integration with the following code:

```ts
// .storybook/preview.ts
import { createArgsExtractor, createLitRenderer } from 'cem-plugin-better-lit-types/storybook'
import manifest from 'virtual:vite-plugin-cem/custom-elements-manifest';

export const parameters = {
  docs: {
    extractArgTypes: createArgsExtractor(manifest),
  }
}

export const render = createLitRenderer({
  wrapSlots: true,
  joinArrays: true,
})
```

### Options

This is all current options of the plugin :

```ts
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
   * Run the builder in dev mode.
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
```

## Contribute

We would love you for the contribution to ``vite-plugin-cem`` project, check the [CONTRIBUTING](./CONTRIBUTING.md) file for more info.