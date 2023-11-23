import { createArgsExtractor, createLitRenderer } from 'cem-plugin-better-lit-types/storybook'
import manifest from 'virtual:vite-plugin-cem/custom-elements-manifest';

export const parameters = {
  docs: {
    extractArgTypes: createArgsExtractor(manifest),
  }
}
    
/**
 * Custom renderer made specially for LitComponents  
 */
export const render = createLitRenderer({
  wrapSlots: true, // Wraps a non-default slot in `<span slot="name">`
  joinArrays: true,  // Converts array to a comma-separated string
})