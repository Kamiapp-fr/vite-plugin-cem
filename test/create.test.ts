import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { createManifest, createModule } from '../src/create';

const litElement = './example/lit-ts/src/my-element.ts';

describe('#create', () => {
  describe('#createModule', () => {
    it('should throw an error if component path does not exist', () => {
      expect(() => createModule('./example/fake/src/fake-element.ts')).to.throw();
    });

    it('should create a module for a web component', () => {
      const module = createModule(litElement);
      const identifiers = Object.fromEntries((module as any).identifiers);

      expect(identifiers['my-element']).to.equal('my-element');
      expect(identifiers.lit).to.equal('lit');
    });
  });

  describe('#createManifest', () => {
    it('should create an empty manifest if no param is pass', () => {
      const manifest = createManifest([]);

      expect(manifest.schemaVersion).to.equal('1.0.0');
      expect(manifest.modules.length).to.equal(0);
    });

    it('should create a manifest for a lit web component', () => {
      const manifest = createManifest([litElement], {
        lit: true,
      });

      const [element] = manifest.modules;
      const [{
        name, tagName, description, superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');
    });

    it('should create a manifest using a pattern', () => {
      const manifest = createManifest(['./example/lit-ts/src/**/*.ts'], {
        lit: true,
      });

      const [element] = manifest.modules;
      const [{
        name, tagName, description, superclass,
      }] = element.declarations;

      // It also match the vite-env.d.ts
      expect(manifest.modules.length).to.equal(2);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');
    });

    it('should create a manifest with a custom plugin', () => {
      const manifest = createManifest([litElement], {
        lit: true,
        dev: true,
        plugins: [{
          name: 'my-super-uppercase-plugin',
          packageLinkPhase(params) {
            params.customElementsManifest.modules.forEach((module) => {
              module.declarations?.forEach((d) => {
                // eslint-disable-next-line no-param-reassign
                d.name = d.name.toUpperCase();
              });
            });
          },
        }],
      });

      const [element] = manifest.modules;
      const [{
        name,
        tagName,
        description,
        superclass,
      }] = element.declarations;

      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MYELEMENT');
      expect(tagName).to.equal('my-element');
      expect(description).to.equal('An example element.');
      expect(superclass.name).to.equal('LitElement');
    });

    it('should create a manifest with the overrideModuleCreation option', () => {
      const options = {
        lit: true,
        overrideModuleCreation({ globs }: { globs: string[] }) {
          return globs.map(createModule);
        },
      };

      const spy = vi.spyOn(options, 'overrideModuleCreation');
      const manifest = createManifest([litElement], options);

      const [element] = manifest.modules;
      const [{
        name,
        tagName,
      }] = element.declarations;

      expect(spy).toHaveBeenCalled();
      expect(manifest.modules.length).to.equal(1);
      expect(name).to.equal('MyElement');
      expect(tagName).to.equal('my-element');
    });
  });
});
