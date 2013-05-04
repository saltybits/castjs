Cast.define('url', {
  defaults:
    relative: false   # allow relative urls
    link: true        # format returns <a>
    shorten: true     # if link=true, whether to shorten the label

  validate: (string) -> true # TODO

  parse: (url, options) ->
    if options.relative || /^http/.test(url)
      url
    else
      url = 'http://' + url

  format: (url, options) ->
    if options.link
      if options.shorten
        # regex was ugly for this one
        label = url.replace(/^http:\/\//, '')
                   .replace(/^https:\/\//, '')
                   .replace(/^www\./, '')
      else
        label = url

      """<a href="#{url}">#{label}</a>"""
    else
      url
})