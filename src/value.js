(function() {
  var REGISTRY = {};
  
  function define(type, definition) {
    // provide default implementations for missing fields/methods
    var fields = ['defaults', 'validate', 'parse', 'format', 'compare'];
    
    for (var ndx = 0; ndx < fields.length; ndx++) {
      var field = fields[ndx];
      definition[field] = definition[field] || ValueJS.defaults[field];
    }
    
    REGISTRY[type] = definition;
    
    return as(type);
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
  //
  // public exposed as #typeOf
  function identify(string, precedence) {
    return find(precedence, function(type) { return type.valid(string); });
  }
  
  function find(precedence, iterator) {
    var result;
    
    if (typeof precedence == "undefined")
      precedence = ValueJS.defaults.precedence || types();
    
    for (var ndx = 0; ndx < precedence.length; ndx++) {
      var type = precedence[ndx];
      var handler = as(type);
      
      if (iterator(handler)) {
        result = type;
        break;
      }
    }
    
    return result;
  }
  
  function Handler(type, definition) {
    this.type = type;
    this.definition = definition;
  }
  
  Handler.prototype.validate = function(string) {
    var errors,
        validate = this.definition.validate;
    
    if (validate instanceof RegExp) {
      if (!string.match(validate))
        errors = ValueJS.invalid;
    } else {
      errors = validate(string);
    }
    
    return errors;
  }
  
  // #validate can return error specifics while #valid only returns true or false
  Handler.prototype.valid = function(string) {
    return typeof this.validate(string) == "undefined";
  }
  
  Handler.prototype.parse = function(string) {
    return this.definition.parse(string);
  }
  
  Handler.prototype.format = function(value, options) {
    return this.definition.format(value, merge(this.definition.defaults, options));
  }
  
  Handler.prototype.massage = function(string, options) {
    return this.format(this.parse(string), options);
  }
  
  Handler.prototype.compare = function(a, b) {
    return this.definition.compare(this.parse(a), this.parse(b));
  }
  
  Handler.prototype.sort = function(array, type) {
    var self = this;
    return array.sort(function(a, b) { return self.compare(a, b); });
  }
  
  function as(type) {
    return new Handler(type, get(type));
  }
  
  
  // utility methods
  function merge(defaults, options) {
    var result = {};
    
    defaults = defaults || {};
    options = options || {};
    
    for (var attr in options) {
      result[attr] = options[attr];
    }
    
    for (var attr in defaults) {
      if (result[attr] == null)
        result[attr] = defaults[attr]; 
    }
    
    return result;
  }
  
  
  // define our public API
  var ValueJS = {
    defaults: {
      defaults: {},
      parse:    function(string) { return string; },
      validate: function(string) { return; },
      compare:  function(a, b) { return String(a) - String(b); },
      format:   function(value) { return value; },
      
      precedence: null // null or array of type names in the preferred order
    },
    
    // if you don't feel comfortable returning true when invalid, return ValueJS.invalid instead
    invalid: true,
    
    define: define,
    get: get, // not sure this needs to be exposed anymore
    as: as,
    typeOf: identify,
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