import assert from 'node:assert/strict';
import { describe, it, before, after } from 'node:test';

import { activate } from '../browser';

describe('activate', () => {
  describe('without a DOM', () => {
    let descriptor: PropertyDescriptor | undefined;

    before(() => {
      // Remove the document global-jsdom registered, as in plain Node
      descriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
      delete (globalThis as { document?: Document }).document;
    });

    after(() => {
      if (descriptor) Object.defineProperty(globalThis, 'document', descriptor);
    });

    it('should not throw', () => {
      assert.equal(typeof document, 'undefined');
      assert.doesNotThrow(() => activate(() => {}));
    });

    it('should not call frameport', () => {
      let called = false;

      activate(() => {
        called = true;
      });

      assert.equal(called, false);
    });
  });
});
