import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import { generateViewports } from '../generate-viewports';

describe('generateViewports', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const target = (): HTMLElement => {
    const element = document.createElement('div');

    document.body.append(element);

    return element;
  };

  it('should render nothing without viewports', () => {
    generateViewports(target(), { html: '<p>Hello</p>', viewports: '' });
    generateViewports(target(), { html: '<p>Hello</p>' });
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });

  it('should render one viewport', () => {
    generateViewports(target(), { html: '<p>Hello</p>', viewports: '375x667' });

    const [iframe] = document.querySelectorAll('iframe');

    assert.equal(document.querySelectorAll('iframe').length, 1);
    assert.equal(iframe.nextElementSibling, null);
  });

  it('should place the iframes after the target', () => {
    const element = target();

    generateViewports(element, {
      html: '<p>Hello</p>',
      viewports: '375x667,768x1024'
    });
    assert.equal(element.children.length, 0);
    assert.ok(element.nextElementSibling instanceof HTMLIFrameElement);
    assert.equal(document.querySelectorAll('iframe').length, 2);
  });
});
