var CustomElement = require('custom-element')
var xtend         = require('xtend')
var path          = require('path')
var fs            = require('fs')

module.exports = createElementBase

function createElementBase(CodeMirror, opts) {
  var Element = CustomElement()

  opts = opts || {}

  Element.once('created', function() {
    var wrapper  = document.createElement('div')

    this.createShadowRoot()
    this.editor = new CodeMirror(wrapper, xtend(opts, {
      value: ''
    }))

    this.editor.display.wrapper.style.height = 'auto'
    this.shadowRoot.appendChild(wrapper)

    ;['mode'
    , 'width'
    , 'height'
    , 'theme'
    ].forEach(function(name) {
      if (this.hasAttribute(name)) {
        this.attributeChangedCallback(name, null, this.getAttribute(name))
      }
    }, this)
  })

  Element.once('attached', function() {
    var style = document.createElement('style')
    var self  = this

    style.innerHTML = (
      fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8') +
      fs.readFileSync(require.resolve('codemirror/lib/codemirror.css'), 'utf8')
    )

    this.shadowRoot.appendChild(style)
    this.reset()
  })

  Element.on('attribute', function(name, oldValue, newValue) {
    if (name === 'mode') return this.editor.setOption('mode', newValue)
    if (name === 'width') return this.editor.setSize(newValue, null)
    if (name === 'height') return this.editor.setSize(null, newValue)
    if (name === 'theme') return this.editor.setOption('theme', newValue)
  })

  Element.prototype.reset = function() {
    this.value = this.textContent
    this.editor.refresh()
  }

  Object.defineProperty(Element.prototype, 'value', {
    get: function() { return this.editor.getValue() },
    set: function(value) {
      this.editor.setValue(value)
    }
  })

  return Element
}
