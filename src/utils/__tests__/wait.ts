import assert from 'node:assert/strict';
import { describe, it, mock, afterEach } from 'node:test';

import { waitForFrame } from '../wait';

describe('waitForFrame', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it('should resolve with the timestamp of the next animation frame', async () => {
    const requestAnimationFrame = mock.method(
      globalThis,
      'requestAnimationFrame',
      (callback: FrameRequestCallback) => {
        callback(1234.5);

        return 1;
      }
    );

    assert.equal(await waitForFrame(), 1234.5);
    assert.equal(requestAnimationFrame.mock.callCount(), 1);
  });

  it('should not resolve before the frame', async () => {
    let frame: FrameRequestCallback | undefined;
    let resolved = false;

    mock.method(
      globalThis,
      'requestAnimationFrame',
      (callback: FrameRequestCallback) => {
        frame = callback;

        return 1;
      }
    );

    const waiting = waitForFrame().then(() => {
      resolved = true;
    });

    await Promise.resolve();
    assert.equal(resolved, false);
    frame?.(1);
    await waiting;
    assert.equal(resolved, true);
  });
});
