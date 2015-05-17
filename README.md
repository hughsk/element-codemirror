# element-codemirror
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/element-codemirror.svg?style=flat)
![](http://img.shields.io/npm/dm/element-codemirror.svg?style=flat)
![](http://img.shields.io/npm/l/element-codemirror.svg?style=flat)

Custom element that wraps up the [CodeMirror](https://codemirror.net)
text editor for you.

## Usage

[![NPM](https://nodei.co/npm/element-codemirror.png)](https://nodei.co/npm/element-codemirror/)

### `CodeMirrorElement = CME(CodeMirror, options)`

Where `CodeMirror` is a reference to the `CodeMirror`
singleton you'd like to use, and `options` is a set
of default options to apply to each instance of the
editor created with this element.

See [demo.js](./demo.js) for a full usage example.

``` javascript
require('webcomponents.js')
require('codemirror/mode/javascript/javascript')

var CodeMirror = require('codemirror')
var CME        = require('element-codemirror')

var CodeMirrorElement = CME(CodeMirror, {
  viewportMargin: Infinity,
  mode: 'javascript'
})

document.registerElement('code-mirror', CodeMirrorElement)
```
``` html
<code-mirror mode="javascript" theme="dracula">
function thisIsSomeJavaScript() {
  console.log('hello!')
}
</code-mirror>
```

Note that for themes to work properly their styles must be included within
`<code-mirror>`'s Shadow DOM: you can use
[custom-element-styles](http://github.com/hughsk/custom-element-styles) for
this.

## Properties

### `CodeMirrorElement.value`

Represents the content of the CodeMirror editor. Use this to read the text
contained within, or to change its value.

### `CodeMirrorElement.editor`

The CodeMirror editor instance attached to the element.
Useful for adding custom behaviours, for example watching
changes to its content:

``` javascript
var element = document.querySelector('code-mirror')

element.editor.on('change', function() {
  console.log(element.value)
})
```

## Attributes

### `mode`

Determines the mode for the editor to use,
e.g. `javascript`, `glsl`, `haskell`, etc.

Note that modes must be loaded manually onto
CodeMirror before they may be used.

### `theme`

Determines he theme for the editor to use.

### `width`

The width to use for the editor. Note that you
may use CSS units here, such as `50vh` or `75%`.

### `height`

The height to use for the editor. Note that you
may use CSS units here, such as `50vh` or `75%`.

## Methods

### `CodeMirrorElement.reset()`

Resets the editor's contents to be its `textContent` value.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/element-codemirror/blob/master/LICENSE.md) for details.
