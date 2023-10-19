[@phun-ky/frameport](../README.md) / config/browser

# Module: config/browser

## Functions

### activate

▸ **activate**(`frameport`): `void`

A function to activate frameport based on script attributes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frameport` | [`FrameportFunctionType`](types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

**`Example`**

```ts
// Usage example:
// activate(myRDE);
```

#### Defined in

[config/browser.ts:125](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L125)

___

### domReady

▸ **domReady**(`frameport`): `void`

A function to initialize frameport when the DOM is ready.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frameport` | [`FrameportFunctionType`](types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

**`Example`**

```ts
// Usage example:
// domReady(myRDE);
```

#### Defined in

[config/browser.ts:19](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L19)

___

### lazy

▸ **lazy**(): `void`

A function to initialize lazy frameport functionality.

#### Returns

`void`

**`Example`**

```ts
// Usage example:
// lazy();
```

#### Defined in

[config/browser.ts:41](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L41)

___

### manual

▸ **manual**(`frameport`): `void`

A function to manually activate frameport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frameport` | [`FrameportFunctionType`](types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

**`Example`**

```ts
// Usage example:
// manual(myRDE);
```

#### Defined in

[config/browser.ts:108](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L108)
