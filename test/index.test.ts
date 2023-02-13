import { createServer, build } from 'vite';
import { readFile, rm, writeFile } from 'fs/promises';
import {
  afterAll,
  describe,
  expect,
  it,
} from 'vitest';
import request from 'supertest';
import VitePluginCustomElementsManifest from '../src';

const litElement = './example/lit-ts/src/my-element.ts';

describe('#VitePluginCustomElementsManifest', () => {
  describe('#configureServer', () => {
    it('should serve an empty manifest', async () => {
      const server = await createServer({
        plugins: [VitePluginCustomElementsManifest()],
      });

      await server.listen(5000);

      const { text } = await request(server!.httpServer).get('/custom-elements.json');
      const manifest = JSON.parse(text);

      expect(manifest.modules.length).to.equal(0);

      await server.close();
    });

    it('should serve a manifest for a lit web component', async () => {
      const server = await createServer({
        plugins: [VitePluginCustomElementsManifest({
          files: [litElement],
          lit: true,
        })],
      });

      await server.listen(5000);

      const { text } = await request(server!.httpServer).get('/custom-elements.json');
      const manifest = JSON.parse(text);
      const [element] = manifest.modules;
      const [{
        name,
        tagName,
        description,
        superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');

      await server.close();
    });

    it('should serve the manifest with a custom endpoint', async () => {
      const server = await createServer({
        plugins: [VitePluginCustomElementsManifest({
          endpoint: '/my-custom-endpoint',
          files: [litElement],
          lit: true,
        })],
      });

      await server.listen(5000);

      const { text } = await request(server!.httpServer).get('/my-custom-endpoint');
      const manifest = JSON.parse(text);
      const [element] = manifest.modules;
      const [{
        name,
        tagName,
        description,
        superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');

      await server.close();
    });
  });

  describe('#generateBundle', () => {
    afterAll(async () => {
      await rm('./dist', { recursive: true });
    });

    it('should create an manifest for a lit web component', async () => {
      await build({
        logLevel: 'silent',
        build: {
          lib: {
            entry: litElement,
            formats: ['es'],
          },
          rollupOptions: {
            external: /^lit/,
          },
        },
        plugins: [VitePluginCustomElementsManifest({
          files: [litElement],
          lit: true,
        })],
      });

      const file = await readFile('./dist/custom-elements.json');
      const manifest = JSON.parse(file.toString());
      const [element] = manifest.modules;
      const [{
        name,
        tagName,
        description,
        superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');
    });

    it('should create a manifest with a custom name', async () => {
      await build({
        logLevel: 'silent',
        build: {
          lib: {
            entry: litElement,
            formats: ['es'],
          },
          rollupOptions: {
            external: /^lit/,
          },
        },
        plugins: [VitePluginCustomElementsManifest({
          output: 'my-custom-name.json',
          files: [litElement],
          lit: true,
        })],
      });

      const file = await readFile('./dist/my-custom-name.json');
      const manifest = JSON.parse(file.toString());
      const [element] = manifest.modules;
      const [{
        name,
        tagName,
        description,
        superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');
    });

    it('should append "custom-elements" path to package.json', async () => {
      const pkg = await readFile('./package.json');

      await build({
        logLevel: 'silent',
        build: {
          lib: {
            entry: litElement,
            formats: ['es'],
          },
          rollupOptions: {
            external: /^lit/,
          },
        },
        plugins: [
          VitePluginCustomElementsManifest({
            output: 'my-custom-name.json',
            files: [litElement],
            packageJson: true,
            lit: true,
          }),
        ],
      });

      const file = await readFile('./package.json');
      const { customElements } = JSON.parse(file.toString());

      expect(customElements).to.equal('dist/my-custom-name.json');
      writeFile('./package.json', pkg);
    });
  });
});
