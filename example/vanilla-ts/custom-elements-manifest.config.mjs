import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';

export default {
  globs: ['src/title-element.ts'],
  litelement: true,
  plugins: [
    jsdocExamplePlugin(),
  ],
};
