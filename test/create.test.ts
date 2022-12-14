import { describe, it, expect } from 'vitest';
import { createModule } from '../src/create';

const litElement = './example/lit-ts/src/my-element.ts';

describe('#create', () => {
  describe('#createModule', () => {
    it('should throw an error if component path does not exist', () => {    
      expect(() => createModule('./example/fake/src/fake-element.ts')).to.throw()
    });

    it('should create a module for a web component', () => {
      const module = createModule(litElement);
      const identifiers = Object.fromEntries(module.identifiers);
      
      expect(identifiers['my-element']).to.equal('my-element');
      expect(identifiers['lit']).to.equal('lit');
    });
  });
})