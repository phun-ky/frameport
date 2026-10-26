import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import { generate } from '../generate';

describe('generate', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should place the iframe after a target that is its own template', () => {
    const target = document.createElement('div');

    document.body.append(target);
    generate(target, {
      html: '<p>Hello</p>',
      width: '320',
      templateElement: target
    });

    assert.equal(target.querySelector('iframe'), null);
    assert.ok(target.nextElementSibling instanceof HTMLIFrameElement);
  });

  it('should place the iframe inside the target when a template is used', () => {
    const target = document.createElement('div');
    const template = document.createElement('div');

    document.body.append(target, template);
    generate(target, {
      html: '<p>Hello</p>',
      width: '320',
      templateElement: template
    });

    assert.ok(target.firstElementChild instanceof HTMLIFrameElement);
  });

  it('should render nothing without a width', () => {
    const target = document.createElement('div');

    document.body.append(target);
    generate(target, { html: '<p>Hello</p>', templateElement: target });

    assert.equal(document.querySelectorAll('iframe').length, 0);
  });
});
