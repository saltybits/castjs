(function() {
  var REGISTRY = {};
  
  function define(type, definition) {
    // provide default implementations for missing fields/methods
    var fields = ['defaults', 'validate', 'parse', 'format', 'compare'];
    
    for (var ndx = 0; ndx < fields.length; ndx++) {
      var field = fields[ndx];
      definition[field] = definition[field] || Cast.defaults[field];
    }
    
    REGISTRY[type] = definition;
    
    return as(type);
  }
  
  function get(type) {
    var def = REGISTRY[type];
    
    if (def)
      return def;
    else
      throw new Error("Cast.: Unknown type '" + type + "'");
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
      throw new Error("Cast.: Unable to identify type of '" + string + "'");
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
      precedence = Cast.defaults.precedence || types();
    
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
        errors = Cast.invalid;
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
  
  Handler.prototype.sort = function(array) {
    var self = this;
    return array.sort(function(a, b) { return self.compare(a, b); });
  }
  
  if (typeof _ != "undefined") {
    function _iterator(handler, iterator, context) {
      return function(value, key, list) {
        var parsedValue = handler.parse(value);
        
        if (iterator) {
          return iterator.call(context, parsedValue, key, list);
        } else {
          return parsedValue;
        }
      };
    }
    
    // lots of duplication here
    // could get fancy and define these dynamically but this is much easier to maintain
    Handler.prototype.each = function(list, iterator, context) {
      return _.each(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.map = function(list, iterator, context) {
      return _.map(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.find = function(list, iterator, context) {
      return _.find(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.filter = function(list, iterator, context) {
      return _.filter(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.reject = function(list, iterator, context) {
      return _.reject(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.all = function(list, iterator, context) {
      return _.all(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.any = function(list, iterator, context) {
      return _.any(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.max = function(list, iterator, context) {
      return _.max(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.min = function(list, iterator, context) {
      return _.min(list, _iterator(this, iterator, context), context);
    }
    
    Handler.prototype.sortBy = function(list, iterator, context) {
      return _.sortBy(list, _iterator(this, iterator, context), context);
    }
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
  var Cast = {
    defaults: {
      defaults: {},
      parse:    function(string) { return string; },
      validate: function(string) { return; },
      compare:  function(a, b) { return String(a) - String(b); },
      format:   function(value) { return value; },
      
      precedence: null // null or array of type names in the preferred order
    },
    
    // if you don't feel comfortable returning true when invalid, return Cast.invalid instead
    invalid: true,
    
    define: define,
    get: get, // not sure this needs to be exposed anymore
    as: as,
    typeOf: identify,
  };
  
  // export the library
  if (typeof module !== "undefined") {                                  // CommonJS module
    module.exports = Cast;
  }
  
  if (typeof window !== "undefined" && typeof ender === "undefined") {  // Browser (without ender)
    window.Cast = Cast;
  }
  
  if (typeof define === "function" && define.amd) {                     // AMD module
    define("valuejs", [], function () {
      return moment;
    });
  }
})();