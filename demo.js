require('webcomponents.js')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')

var styles         = require('custom-element-styles')
var CodeMirror     = require('codemirror')
var fs             = require('fs')
var CodeMirrorBase = require('./')

var CodeMirrorElement = CodeMirrorBase(CodeMirror, {
  viewportMargin: Infinity,
  lineNumbers: true,
  matchBrackets: true,
  indentWithTabs: false,
  indentUnit: 2,
  tabSize: 2,
  theme: 'mdn-like'
})

styles(CodeMirrorElement, fs.readFileSync(
  require.resolve('codemirror/theme/mdn-like.css')
, 'utf8'))

document.registerElement('code-mirror', CodeMirrorElement)

var element = document.querySelector('code-mirror')

element.editor.on('change', function() {
  console.clear && console.clear()
  console.log(element.value)
})
