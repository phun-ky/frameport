[@phun-ky/frameport](../README.md) / types

# Module: types

## Interfaces

- [FrameportOptions](../interfaces/types.FrameportOptions.md)

## Type Aliases

### FrameportFunctionType

Ƭ **FrameportFunctionType**: () => `void`

Example usage:
```ts
const options: FrameportOptions = {
  html: '<div>Hello, World!</div>',
  height: '300',
  width: 400,
  className: 'my-embed',
  style: 'color: blue;',
  css: '.my-embed { background-color: yellow; }',
  code: 'console.log("Embedded content");',
  javascript: '/dummy.js',
  headers: ['Authorization: Bearer Token']
};
```

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[types/index.ts:148](https://github.com/phun-ky/frameport/blob/main/src/types/index.ts#L148)
