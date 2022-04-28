# vite-plugin-cem

Build automaticaly the manifest of your custom-element. This plugin is use the [@custom-elements-manifest/analyzer](https://github.com/open-wc/custom-elements-manifest/tree/master/packages/analyzer) to build the manifest.

> See the [custom-elements-manifest
](https://github.com/webcomponents/custom-elements-manifest) repository to get more information about the manifest.

## Install

```console
$ npm install --save-dev vite-plugin-cem
```

## Usage

```js
import { defineConfig } from 'vite'
import VitePluginCustomElementsManifest from 'vite-plugin-cem';

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ['./src/title-element.ts'],
      lit: true,
    })
  ]
})
```