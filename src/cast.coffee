###
CastJS v@VERSION
http://github.com/saltybits/castjs

Copyright 2013 Salty Bits
Released under the MIT license

Date: @DATE
###

REGISTRY = {}

define = (type, definition) ->
  # provide default implementations for missing fields/methods
  for field in ['defaults', 'validate', 'parse', 'format', 'compare']
    definition[field] ?= Cast.defaults[field]
  
  REGISTRY[type] = definition
  
  as(type)

as = (type) -> new Handler(type, get(type))

get = (type) ->
  REGISTRY[type] || throw new Error("CastJS Error: Unknown type '#{type}'")

types = ->
  result = []
  result.push(type) for type of REGISTRY
  result

# similar to .get but with identification fallback
# get is exposed to the public, definition is not
definition = (string, type) ->
  get(type ? identify(string))

# return the implied type of the value based on the registered type definitions and
# the given precedence
#
# public exposed as #typeOf
identify = (string, precedence) ->
  find(precedence, (type) -> type.validate(string))

find = (precedence, iterator) ->
  precedence ?= Cast.defaults.precedence || types()
  
  for type in precedence
    return type if iterator(as(type))


# definitions are the basis for handlers.
# A definition only has to define the methods it needs, while
# handlers will always provide the full expected API
class Handler
  constructor: (@type, @definition) ->
    #

  validate: (string) ->
    if @definition.validate instanceof RegExp
      return @definition.validate.test(string)
    else
      return @definition.validate(string)

  parse: (string, options) ->
    @definition.parse(string, defaults(options, @definition.defaults))

  format: (value, options) ->
    @definition.format(value, defaults(options, @definition.defaults))

  massage: (string, options) ->
    @format(@parse(string, options), options)

  compare: (a, b) ->
    @definition.compare(@parse(a), @parse(b))

  sort: (array) ->
    self = @
    array.sort((a, b) -> self.compare(a, b))


# If underscore is defined we add in a number of helpers
if _?
  wrappedIterator = (handler, iterator, context) ->
    return (string, key, list) ->
      value = handler.parse(string) # any way to allow options here?
      
      if iterator
        iterator.call(context, value, key, list)
      else
        value
  
  defer = (method) ->
    Handler::[method] = (list, iterator, context) ->
      _[method](list, wrappedIterator(@, iterator, context), context)

  defer(method) for method in ['each', 'map', 'find', 'filter', 'reject', 'all', 'any', 'max', 'min', 'sortBy']    


# utility methods
defaults = (object, sources...) -> 
  object ?= {}

  for source in sources when source?
    for prop, value of source
      object[prop] ?= value
  
  object


# define our public API
Cast =
  defaults:
    defaults: {}
    parse:    (string) -> string
    validate: (string) -> true
    format:   (value) -> String(value)
    compare:  (a, b) -> a - b
    
    precedence: null # null or array of type names in the preferred order
  
  define: define
  get: get # not sure this needs to be exposed anymore
  as: as
  typeOf: identify


# export the library
module?.exports = Cast                        # CommonJS module
window.Cast = Cast if window? && !ender?      # Browser (without ender)
define('cast', [], -> Cast) if define?.amd?   # AMD module
