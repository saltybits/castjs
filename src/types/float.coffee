regex = /^([-+]?[0-9]*\.?[0-9]+)$/

Cast.define('float', {
  defaults:
    precision: 2

  validate: regex

  parse: (string) ->
    Number(string.match(regex)[1])

  format: (value, options) ->
    if options.precision?
      value.toFixed(options.precision)
    else
      String(value)
})