regex = /^(\d*(\.\d+)?)%$/

Cast.define('percentage', {
  defaults:
    precision: 0

  validate: regex

  parse: (string) ->
    Number(string.match(regex)[1]) / 100.0

  format: (percentage, options) ->
    "#{(percentage * 100).toFixed(options.precision)}%"
})