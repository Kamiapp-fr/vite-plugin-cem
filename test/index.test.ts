import { createServer } from 'vite';
import {
  describe, expect, it,
} from 'vitest';
import request from 'supertest';
import VitePluginCustomElementsManifest from '../src';

const litElement = './example/lit-ts/src/my-element.ts';

describe('#plugin', () => {
  describe('#generate', () => {
    it('should serve an empty manifest', async () => {
      const server = await createServer({
        plugins: [VitePluginCustomElementsManifest({
          files: [],
        })],
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
  });
});
