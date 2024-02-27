import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { waitForFrame } from '../wait';

describe('waitForFrame', () => {
  it('should wait for the next animation frame', async () => {
    const startTime = performance.now(); // High-resolution timestamp

    await waitForFrame();

    const endTime = performance.now(); // High-resolution timestamp
    const elapsedTime = endTime - startTime;

    // Check that the timestamp received is an approximate match to the expected next frame timestamp
    assert.ok(elapsedTime < 40); // Assuming 30 frames per second (approximately 8ms per frame)
    // assert.ok(elapsedTime < 20); // Assuming 60 frames per second (approximately 16ms per frame)
  });
});
