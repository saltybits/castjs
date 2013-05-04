Cast.define('number', {
  # this is a weird one. NaN != NaN in coffeescript
  validate: (string) ->
    String(Number(string)) isnt 'NaN'

  parse: (string) ->
    Number(string)
})