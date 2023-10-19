# Frameport

> Frameport enables you to fake and display your responsive components in real life media queries!

Frameprot was created so I could display responsive examples of components in a style guide. It creates iframes with your component (html, css and javascript) that acts as natural viewports, thus making use of your media queries!

```shell-session
$ npm i -S @phun-ky/frameport
// installs
```

## Use programatically

With this approach, you can use it in your own JS code as a module.

First argument is the target where you want the iframe to be generated. Second is options.

```javascript
import frameport from '@phun-ky/frameport';

frameport(document.getElementById('target'), {
  width: 667,
  html: '<h1>FOO</h1>',
});
```

### Options

| option    | required | description                                                                                                                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| width     | ✓        | The height of the viewport, either as a string (e.g., '400') or a number (e.g., 400)                                                                                           |
| height    |          | The width of the viewport, either as a string (e.g., '600') or a number (e.g., 600)                                                                                            |
| html      | ✓        | The html you want to use in the viewport example. **Required**                                                                                                                 |
| css       |          | A CSS file to be appended to the `<head>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourcss.css`      |
| style     |          | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html                                                                             |
| code      |          | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                          |
| js        |          | A JavaScript file to be inserted in the `<body>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourjs.js` |
| className |          | Class names to be given the generated iframe                                                                                                                                   |
| headers   |          | An array of HTTP headers to include when fetching the HTML content                                                                                                             |

## Usage as init (plug and play)

Place the `script` tag at the bottom of your page, right before the `</body>`-tag:

```html
<script src="../path/to/@phun-ky/frameport/frameport-init.js"></script>
```

And then follow the steps below to display the responsive examples you want :)

### Use templates as a target

With this approach, the script will locate given template and produce responsive examples based on that template and insert them right after the template. The original template will be hidden:

```html
<div
  data-frameport
  data-frameport-viewports="375x667,360x740,768x1024"
  data-frameport-style="h1{color: #FF9900;}"
>
  <button type="button">Primary</button>
</div>
```

The content of the `[data-frameport]`-container is the html you want to display in the responsive example.

#### Allowed tags

| tag                      | description                                                                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-frameport           | To identify this as the template to use for generating the responsive examples. **Required**                                                                                                    |
| data-frameport-viewports | The viewports to generate for examples. This is a string `wxh` for example: `375x667`. If you want more viewports, you can separate them with a comma: `375x667,360x740,768x1024`. **Required** |
| data-frameport-css       | A CSS file to be appended to the `<head>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourcss.css` html                  |
| data-frameport-style     | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html                                                                                              |
| data-frameport-code      | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                                           |
| data-frameport-js        | A JavaScript file to be inserted in the `<body>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourjs.js`                  |
| data-frameport-class     | Class names to be given the generated iframe                                                                                                                                                    |
| data-frameport-headers   | An array of HTTP headers to include when fetching the HTML content                                                                                                                              |

### Use targets

With this approach, you decide where the responsive examples are added. The script will locate given target and produce responsive examples based on the given template and insert them in that target. The original template will be hidden:

```html
<div
  data-frameport-target
  data-frameport-template="#template"
  data-frameport-width="667"
  data-frameport-style="h1{color: blue;}"
></div>

<div id="template"><button type="button">Primary</button></div>
```

The content of the `#template`-container is the html you want to display in the responsive example.

This approach is useful if you want to use a device decorator to mimic appearance of a device.

#### Allowed tags

| tag                     | description                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data-frameport-target   | To identify this as a target to use to generate the responsive examples                                                                                                        |
| data-frameport-template | Selector to the template                                                                                                                                                       |
| data-frameport-width    | The viewport width. <strong>Required\*\*                                                                                                                                       |
| data-frameport-height   | The viewport height.                                                                                                                                                           |
| data-frameport-css      | A CSS file to be appended to the `<head>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourcss.css`      |
| data-frameport-style    | Inline styles (CSS) to be inserted into a `<style>` -tag in the `<head>`-tag of the generated html                                                                             |
| data-frameport-code     | Custom JavaScript code to be inserted into a `<script>`-tag in the `<body>`-tag in the generated html                                                                          |
| data-frameport-js       | A JavaScript file to be inserted in the `<body>`-tag of the generated html. **NOTE! This needs to be on the same domain and relative to root!** For example: `/dist/yourjs.js` |
| data-frameport-class    | Class names to be given the generated iframe                                                                                                                                   |
| data-frameport-headers  | An array of HTTP headers to include when fetching the HTML content                                                                                                             |
