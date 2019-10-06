# Responsive Documentation Examples

> Create responsive documentation examples on the fly!

Responsive Documentation Examples (rde) was created so I could display responsive examples of components in a style guide.

```bash
$ npm i @phun-ky/responsive-documentation-examples
```

See demo here: https://codepen.io/phun-ky/pen/MWWWvLm

## Usage

Place the `script` tag at the bottom of your page, right before the `</body>`-tag:

```html
<script src="../path/to/responsive-documentation-example.js"></script>
```

And then follow the steps below to display the responsive examples you want :)

### Use templates as a target

With this approach, the script will locate given template and produce responsive examples based on that template and insert them right after the template. The original template will be hidden:

```html
<div data-rde data-rde-viewports="375x667,360x740,768x1024" data-rde-style="h1{color: #FF9900;}">
  <button type="button">Primary</button>
</div>
```

The content of the `[data-rde]`-container is the html you want to display in the responsive example.

#### Allowed tags:

| tag                | description                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data-rde           | To identify this as the template to use for generating the responsive examples. <strong>Required</strong>                                                                                                    |
| data-rde-viewports | The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`. <strong>Required</strong> |
| data-rde-css       | A CSS file to be appended to the head section of the generated html. <strong>NOTE! This needs to be on the same domain and relative to root!</strong> For example: `/dist/yourcss.css`                       |
| data-rde-style     | Raw CSS code to be inserted into a `<link>` -tag in the produced html                                                                                                                                        |
| data-rde-code      | Raw JavaScript code to be inserted into `<script>`-tags in the produced html                                                                                                                                 |
| data-rde-js        | A JavaScript file to be appended to the head section of the generated html. <strong>NOTE! This needs to be on the same domain and relative to root!</strong> For example: `/dist/yourjs.js`                  |
| data-rde-class     | Class names to be given the produced iframe                                                                                                                                                                  |
| data-rde-headers   | Additional headers to append to the generated html                                                                                                                                                           |
| data-rde-no-height | Don't respect the given height                                                                                                                                                                               |

### Use targets

With this approach, you decide where the responsive examples are added. The script will locate given target and produce responsive examples based on the given template and insert them in that target. The original template will be hidden:

```html
<div data-rde-target data-rde-template="#template" data-rde-vw="667" data-rde-style="h1{color: blue;}"></div>

<div id="template"><button type="button">Primary</button></div>
```

The content of the `#template`-container is the html you want to display in the responsive example.

This approach is useful if you want to use a device decorator to mimic appearance of a device.

#### Allowed tags:

| tag               | description                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-rde-target   | To identify this as a target to use to generate the responsive examples                                                                                                                     |
| data-rde-template | Selector to the template                                                                                                                                                                    |
| data-rde-vw       | The viewport width. <strong>Required</strong>                                                                                                                                               |
| data-rde-vh       | The viewport height.                                                                                                                                                                        |
| data-rde-css      | A CSS file to be appended to the head section of the generated html. <strong>NOTE! This needs to be on the same domain and relative to root!</strong> For example: `/dist/yourcss.css`      |
| data-rde-style    | Raw CSS code to be inserted into a `<link>` -tag in the produced html                                                                                                                       |
| data-rde-code     | Raw JavaScript code to be inserted into `<script>`-tags in the produced html                                                                                                                |
| data-rde-js       | A JavaScript file to be appended to the head section of the generated html. <strong>NOTE! This needs to be on the same domain and relative to root!</strong> For example: `/dist/yourjs.js` |
| data-rde-class    | Class names to be given the produced iframe                                                                                                                                                 |
| data-rde-headers  | Additional headers to append to the generated html                                                                                                                                          |

## TO DO

- Make it usable as a module
