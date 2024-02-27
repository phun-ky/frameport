[@phun-ky/frameport](../README.md) / utils/wait

# Module: utils/wait

## Functions

### waitForFrame

▸ **waitForFrame**(): `Promise`\<`number`\>

Waits for the next animation frame using requestAnimationFrame.

#### Returns

`Promise`\<`number`\>

- A Promise that resolves with the timestamp of the next animation frame.

**`Example`**

```ts
// Wait for the next animation frame and get the rect
await waitForFrame();
const rect = el.getBoundingClientRect();
// Wait for the next animation frame and get the timestamp
const timestamp = await waitForFrame();
```

#### Defined in

[utils/wait.ts:15](https://github.com/phun-ky/frameport/blob/main/src/utils/wait.ts#L15)
