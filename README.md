# vite-plugin-custom-elements-manifest

Build automaticaly the manifest of your custom-element. This plugin is use the [@custom-elements-manifest/analyzer](https://github.com/open-wc/custom-elements-manifest/tree/master/packages/analyzer) to build the manifest.

> See the [custom-elements-manifest
](https://github.com/webcomponents/custom-elements-manifest) repository to get more information about the manifest.

## Install

```console
$ npm install --save-dev vite-plugin-custom-elements-manifest
```

## Usage

```js
import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-custom-elements-manifest';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/title-element.ts'],
      lit: true,
    })
  ]
})
```