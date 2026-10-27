import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import { type FrameportOptionsInterface } from '../../types';
import dom from '../dom';

describe('dom', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const target = (): HTMLElement => {
    const element = document.createElement('div');

    document.body.append(element);

    return element;
  };

  it('should render nothing without a target', () => {
    dom(null as unknown as HTMLElement, { html: '<p>Hello</p>', width: 320 });
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });

  it('should render nothing without options', () => {
    dom(target(), undefined as unknown as FrameportOptionsInterface);
    dom(target(), {} as FrameportOptionsInterface);
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });

  it('should render nothing without html', () => {
    dom(target(), { html: '', width: 320 });
    assert.equal(document.querySelectorAll('iframe').length, 0);
  });

  it('should render one iframe per viewport', () => {
    const element = target();

    dom(element, {
      html: '<p>Hello</p>',
      viewports: '100x100,200x200',
      templateElement: element
    });
    assert.equal(document.querySelectorAll('iframe').length, 2);
  });
});
