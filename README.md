# vite-plugin-cem

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

### Options

This is all current options of the plugin :

```ts
export interface VitePluginCustomElementsManifestOptions extends CreateManifestOptions {
  /**
   * Define where will be serve the manifest.
   * This option only work in development mode.
   * @default '/custom-element.json'
   */
  endpoint?: string,
  /**
   * Define where will be build the final manifest.
   * This option only work in production mode.
   * @default 'custom-elements.json'
   */
  output?: string,
  /**
   * Register files which will be used to build the manifest.
   * @default [] 
   */
  files?: string[],
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
}
```