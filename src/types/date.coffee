#
# Dependencies: moment.js
#
# Although this format uses momentjs under the surface,
# it always deals in Dates with outsiders
#
Cast.define('date', {
  defaults:
    format: 'YYYY-MM-DD'

  validate: (string) -> moment(string).isValid()
  parse: (string) -> moment(string).toDate()
  format: (date, options) -> moment(date).format(options.format)
})