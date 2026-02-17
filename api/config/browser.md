[@phun-ky/frameport](../README.md) / config/browser

# config/browser

> Last updated 2026-02-17T09:37:55.985Z

## Functions

### activate()

```ts
function activate(frameport): void;
```

Defined in: [config/browser.ts:120](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L120)

A function to activate frameport based on script attributes.

#### Parameters

| Parameter   | Type                                                         | Description                        |
| ----------- | ------------------------------------------------------------ | ---------------------------------- |
| `frameport` | [`FrameportFunctionType`](../types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

#### Example

```ts
// Usage example:
// activate(myRDE);
```

---

### domReady()

```ts
function domReady(frameport): void;
```

Defined in: [config/browser.ts:17](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L17)

A function to initialize frameport when the DOM is ready.

#### Parameters

| Parameter   | Type                                                         | Description                        |
| ----------- | ------------------------------------------------------------ | ---------------------------------- |
| `frameport` | [`FrameportFunctionType`](../types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

#### Example

```ts
// Usage example:
// domReady(myRDE);
```

---

### lazy()

```ts
function lazy(): void;
```

Defined in: [config/browser.ts:37](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L37)

A function to initialize lazy frameport functionality.

#### Returns

`void`

#### Example

```ts
// Usage example:
// lazy();
```

---

### manual()

```ts
function manual(frameport): void;
```

Defined in: [config/browser.ts:105](https://github.com/phun-ky/frameport/blob/main/src/config/browser.ts#L105)

A function to manually activate frameport.

#### Parameters

| Parameter   | Type                                                         | Description                        |
| ----------- | ------------------------------------------------------------ | ---------------------------------- |
| `frameport` | [`FrameportFunctionType`](../types.md#frameportfunctiontype) | The frameport function to execute. |

#### Returns

`void`

#### Example

```ts
// Usage example:
// manual(myRDE);
```

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/frameport/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/frameport/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

![Speccer banner, with logo and slogan: A zero dependency package to annotate or highlight elements](https://github.com/phun-ky/frameport/blob/main/public/frameport-banner.png?raw=true)

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).
