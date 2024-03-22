import {
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { loadConfigFromFile, loadOptions } from '../src/config';

describe('#config', () => {
  const current = process.cwd();

  afterAll(() => {
    vi.resetAllMocks();
  });

  describe('#loadConfigFromFile', () => {
    it('should return nothing if no config file set', async () => {
      const config = await loadConfigFromFile();

      expect(config).toBeUndefined();
    });

    it('should return the default config file if no config option is set', async () => {
      vi.spyOn(process, 'cwd').mockReturnValue(`${current}/example/vanilla-ts`);

      const config = await loadConfigFromFile();

      expect(config).toHaveProperty('globs');
      expect(config).toHaveProperty('litelement');
      expect(config).toHaveProperty('plugins');
    });

    it('shoud return a custom config file if a config option is set', async () => {
      vi.spyOn(process, 'cwd').mockReturnValue(`${current}/example/lit-ts`);

      const config = await loadConfigFromFile();
      const custom = await loadConfigFromFile('cem.config.mjs');

      expect(config).toBeUndefined();
      expect(custom).toHaveProperty('globs');
      expect(custom).toHaveProperty('litelement');
      expect(custom).toHaveProperty('packagejson');
    });
  });

  describe('#loadOptions', () => {
    it('should load the default options', async () => {
      const options = await loadOptions({});

      expect(options).toMatchObject({
        endpoint: '/custom-elements.json',
        output: 'custom-elements.json',
        packageJson: false,
        files: [],
      });
    });

    it('should load options pass as params', async () => {
      const options = await loadOptions({
        files: ['./test.ts'],
        lit: true,
        packageJson: true,
      });

      expect(options).toMatchObject({
        endpoint: '/custom-elements.json',
        output: 'custom-elements.json',
        files: ['./test.ts'],
        packageJson: true,
        lit: true,
      });
    });

    it('should load options from the config file', async () => {
      vi.spyOn(process, 'cwd').mockReturnValue(`${current}/example/vanilla-ts`);

      const options = await loadOptions({});

      expect(options).toMatchObject({
        endpoint: '/custom-elements.json',
        output: 'custom-elements.json',
        files: ['src/title-element.ts'],
        lit: true,
        packageJson: false,
      });

      expect(options.plugins![0].name).toBe('jsdoc-example');
    });

    it('should merge options from the config file and from the params', async () => {
      vi.spyOn(process, 'cwd').mockReturnValue(`${current}/example/lit-ts`);

      const options = await loadOptions({
        endpoint: '/cem.json',
        config: 'cem.config.mjs',
      });

      expect(options).toMatchObject({
        endpoint: '/cem.json',
        output: 'custom-elements.json',
        files: ['./src/my-element.ts'],
        lit: true,
        packageJson: true,
      });
    });
  });
});
