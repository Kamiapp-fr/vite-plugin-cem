import {
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { loadConfigFromFile } from '../src/config';

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
});
