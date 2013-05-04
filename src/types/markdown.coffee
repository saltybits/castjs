#
# Dependencies: marked
#
Cast.define('markdown', {
  format: (text, options) -> if text then marked(text, options) else ''
})

