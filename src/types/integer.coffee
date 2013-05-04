regex = /^([+-]?\d+)$/

Cast.define('integer', {
  validate: regex

  parse: (string) ->
    Number(string.match(regex)[1])
})