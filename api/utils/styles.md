[@phun-ky/frameport](../README.md) / utils/styles

# utils/styles

> Last updated 2025-07-22T17:46:26.453Z

## Functions

### add()

```ts
function add(el, styles): Promise<void>;
```

Defined in: [utils/styles.ts:25](https://github.com/phun-ky/frameport/blob/main/src/utils/styles.ts#L25)

Adds CSS styles to an HTMLElement.

#### Parameters

| Parameter | Type                                                                    | Description                         |
| --------- | ----------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| `el`      | [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) | The HTMLElement to apply styles to. |
| `styles`  |                                                                         | `object`                            | { `key`: `string`; `value`: `string`; }\[] | An object or an array of objects containing CSS styles to apply. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<`void`>

- A Promise that resolves after styles are applied.

#### Example

```ts
// Apply styles as an object
const element = document.getElementById('my-element');
await add(element, { color: 'red', fontSize: '16px' });

// Apply styles as an array of objects
const styles = [
  { key: 'color', value: 'blue' },
  { key: 'backgroundColor', value: 'yellow' }
];
await add(element, styles);
```

---

### get()

```ts
function get(el): Promise<CSSStyleDeclaration>;
```

Defined in: [utils/styles.ts:67](https://github.com/phun-ky/frameport/blob/main/src/utils/styles.ts#L67)

Gets the computed CSS styles of an HTMLElement.

#### Parameters

| Parameter | Type                                                                    | Description                                  |
| --------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| `el`      | [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) | The HTMLElement to get computed styles from. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[`CSSStyleDeclaration`](https://developer.mozilla.org/docs/Web/API/CSSStyleDeclaration)>

- A Promise that resolves with the computed CSS styles.

#### Example

```ts
// Get computed styles of an element
const element = document.getElementById('my-element');
const computedStyles = await get(element);
console.log(computedStyles.color); // Logs the color property value
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
