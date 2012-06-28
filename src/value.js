(function() {
  var REGISTRY = {};
  
  function define(type, definition) {
    // provide default implementations for missing methods
    var methods = ['validate', 'parse', 'format', 'compare'];
    
    for (var ndx = 0; ndx < methods.length; ndx++) {
      var method = methods[ndx];
      definition[method] = definition[method] || ValueJS.defaults[method]
    }
    
    REGISTRY[type] = definition;
    
    // could return definition here but would rather discourage
    // direct use of the definition in favor of the API
    // return definition;
  }
  
  function get(type) {
    var def = REGISTRY[type];
    
    if (def)
      return def;
    else
      throw new Error("ValueJS: Unknown type '" + type + "'");
  }
  
  function types() {
    var array = [];
    
    for (var type in REGISTRY)
      array.push(type);
    
    return array;
  }
  
  // similar to .get but with identification fallback
  // get is exposed to the public, definition is not
  function definition(string, type) {
    type = type || identify(string);
    
    if (type) {
      return get(type);
    } else {
      throw new Error("ValueJS: Unable to identify type of '" + string + "'");
    }
  }
  
  // return the implied type of the value based on the registered type definitions and
  // the given precedence
  function identify(string, precedence) {
    return find(precedence, function(type) { return valid(string, type); });
  }
  
  function find(precedence, iterator) {
    var result;
    
    if (typeof precedence == "undefined")
      precedence = ValueJS.defaults.precedence || types();
    
    for (var ndx = 0; ndx < precedence.length; ndx++) {
      var type = precedence[ndx];
      
      if (iterator(type)) {
        result = type;
        break;
      }
    }
    
    return result;
  }
  
  function valid(string, type) {
    return typeof validate(string, type) == "undefined";
  }
  
  function validate(string, type) {
    var def = definition(string, type);

    if (def.validate) {
      if (def.validate instanceof RegExp) {
        if (!string.match(def.validate))
          return ValueJS.invalid;
      } else {
        return def.validate(string);
      }
    }
  }
  
  // parse is the only method that allows type to be inferred
  function parse(string, type) {
    return definition(string, type).parse(string);
  }
  
  function format(value, type, options) {
    var def = get(type);
    
    options = merge(def.defaults, options);
    
    return def.format(value, options);
  }
  
  function massage(string, type, options) {
    var value = parse(string, type);
    return format(value, type, options);
  }
  
  function merge(defaults, options) {
    var result = {};
    
    defaults = defaults || {};
    options = options || {};
    
    for (var attr in options) {
      result[attr] = options[attr];
    }
    
    for (var attr in defaults) {
      if (!result.hasOwnProperty(attr))
        result[attr] = defaults[attr]; 
    }
    
    return result;
  }
  
  function compare(a, b, type) {
    var def = get(type);
    return def.compare(def.parse(a), def.parse(b));
  }
  
  function sort(array, type) {
    return array.sort(function(a, b) { return compare(a, b, type) });
  }
  
  // define our public API
  var ValueJS = {
    defaults: {
      parse:    function(string) { return string; },
      validate: function(string) { return; },
      compare:  function(a, b) { return String(a) - String(b); },
      format:   function(value) { return value; },
      
      precedence: null // null or array of type names in the preferred order
    },
    
    // if you don't feel comfortable returning true when invalid, return ValueJS.invalid instead
    invalid: true,
    
    define: define,
    get: get,
    identify: identify,
    validate: validate,
    parse: parse,
    format: format,
    massage: massage,
    compare: compare,
    sort: sort
  };
  
  // export the library
  if (typeof module !== "undefined") {                                  // CommonJS module
    module.exports = ValueJS;
  }
  
  if (typeof window !== "undefined" && typeof ender === "undefined") {  // Browser (without ender)
    window.ValueJS = ValueJS;
  }
  
  if (typeof define === "function" && define.amd) {                     // AMD module
    define("valuejs", [], function () {
      return moment;
    });
  }
})();