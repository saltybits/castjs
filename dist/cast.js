/*
CastJS v0.0.1
http://github.com/saltybits/castjs

Copyright 2013 Salty Bits
Released under the MIT license

Date: 2013-05-03
*/


(function() {
  var Cast, Handler, REGISTRY, as, defaults, defer, define, definition, find, get, identify, method, types, wrappedIterator, _i, _len, _ref,
    __slice = [].slice;

  REGISTRY = {};

  define = function(type, definition) {
    var field, _i, _len, _ref, _ref1;

    _ref = ['defaults', 'validate', 'parse', 'format', 'compare'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      if ((_ref1 = definition[field]) == null) {
        definition[field] = Cast.defaults[field];
      }
    }
    REGISTRY[type] = definition;
    return as(type);
  };

  as = function(type) {
    return new Handler(type, get(type));
  };

  get = function(type) {
    return REGISTRY[type] || (function() {
      throw new Error("CastJS Error: Unknown type '" + type + "'");
    })();
  };

  types = function() {
    var result, type;

    result = [];
    for (type in REGISTRY) {
      result.push(type);
    }
    return result;
  };

  definition = function(string, type) {
    return get(type != null ? type : identify(string));
  };

  identify = function(string, precedence) {
    return find(precedence, function(type) {
      return type.validate(string);
    });
  };

  find = function(precedence, iterator) {
    var type, _i, _len;

    if (precedence == null) {
      precedence = Cast.defaults.precedence || types();
    }
    for (_i = 0, _len = precedence.length; _i < _len; _i++) {
      type = precedence[_i];
      if (iterator(as(type))) {
        return type;
      }
    }
  };

  Handler = (function() {
    function Handler(type, definition) {
      this.type = type;
      this.definition = definition;
    }

    Handler.prototype.validate = function(string) {
      if (this.definition.validate instanceof RegExp) {
        return this.definition.validate.test(string);
      } else {
        return this.definition.validate(string);
      }
    };

    Handler.prototype.parse = function(string, options) {
      return this.definition.parse(string, defaults(options, this.definition.defaults));
    };

    Handler.prototype.format = function(value, options) {
      return this.definition.format(value, defaults(options, this.definition.defaults));
    };

    Handler.prototype.massage = function(string, options) {
      return this.format(this.parse(string, options), options);
    };

    Handler.prototype.compare = function(a, b) {
      return this.definition.compare(this.parse(a), this.parse(b));
    };

    Handler.prototype.sort = function(array) {
      var self;

      self = this;
      return array.sort(function(a, b) {
        return self.compare(a, b);
      });
    };

    return Handler;

  })();

  if (typeof _ !== "undefined" && _ !== null) {
    wrappedIterator = function(handler, iterator, context) {
      return function(string, key, list) {
        var value;

        value = handler.parse(string);
        if (iterator) {
          return iterator.call(context, value, key, list);
        } else {
          return value;
        }
      };
    };
    defer = function(method) {
      return Handler.prototype[method] = function(list, iterator, context) {
        return _[method](list, wrappedIterator(this, iterator, context), context);
      };
    };
    _ref = ['each', 'map', 'find', 'filter', 'reject', 'all', 'any', 'max', 'min', 'sortBy'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      defer(method);
    }
  }

  defaults = function() {
    var object, prop, source, sources, value, _j, _len1, _ref1;

    object = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (object == null) {
      object = {};
    }
    for (_j = 0, _len1 = sources.length; _j < _len1; _j++) {
      source = sources[_j];
      if (source != null) {
        for (prop in source) {
          value = source[prop];
          if ((_ref1 = object[prop]) == null) {
            object[prop] = value;
          }
        }
      }
    }
    return object;
  };

  Cast = {
    defaults: {
      defaults: {},
      parse: function(string) {
        return string;
      },
      validate: function(string) {
        return true;
      },
      format: function(value) {
        return String(value);
      },
      compare: function(a, b) {
        return a - b;
      },
      precedence: null
    },
    define: define,
    get: get,
    as: as,
    typeOf: identify
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Cast;
  }

  if ((typeof window !== "undefined" && window !== null) && (typeof ender === "undefined" || ender === null)) {
    window.Cast = Cast;
  }

  if ((define != null ? define.amd : void 0) != null) {
    define('cast', [], function() {
      return Cast;
    });
  }

}).call(this);

(function() {
  Cast.define('accounting', {});

}).call(this);

(function() {
  Cast.define('date', {
    defaults: {
      format: 'YYYY-MM-DD'
    },
    validate: function(string) {
      return moment(string).isValid();
    },
    parse: function(string) {
      return moment(string).toDate();
    },
    format: function(date, options) {
      return moment(date).format(options.format);
    }
  });

}).call(this);

(function() {
  var regex;

  regex = /^([-+]?[0-9]*\.?[0-9]+)$/;

  Cast.define('float', {
    defaults: {
      precision: 2
    },
    validate: regex,
    parse: function(string) {
      return Number(string.match(regex)[1]);
    },
    format: function(value, options) {
      if (options.precision != null) {
        return value.toFixed(options.precision);
      } else {
        return String(value);
      }
    }
  });

}).call(this);

(function() {
  var regex;

  regex = /^([+-]?\d+)$/;

  Cast.define('integer', {
    validate: regex,
    parse: function(string) {
      return Number(string.match(regex)[1]);
    }
  });

}).call(this);

(function() {
  Cast.define('markdown', {
    format: function(text, options) {
      if (text) {
        return marked(text, options);
      } else {
        return '';
      }
    }
  });

}).call(this);

(function() {
  Cast.define('number', {
    validate: function(string) {
      return String(Number(string)) !== 'NaN';
    },
    parse: function(string) {
      return Number(string);
    }
  });

}).call(this);

(function() {
  var regex;

  regex = /^(\d*(\.\d+)?)%$/;

  Cast.define('percentage', {
    defaults: {
      precision: 0
    },
    validate: regex,
    parse: function(string) {
      return Number(string.match(regex)[1]) / 100.0;
    },
    format: function(percentage, options) {
      return "" + ((percentage * 100).toFixed(options.precision)) + "%";
    }
  });

}).call(this);

(function() {
  Cast.define('url', {
    defaults: {
      relative: false,
      link: true,
      shorten: true
    },
    validate: function(string) {
      return true;
    },
    parse: function(url, options) {
      if (options.relative || /^http/.test(url)) {
        return url;
      } else {
        return url = 'http://' + url;
      }
    },
    format: function(url, options) {
      var label;

      if (options.link) {
        if (options.shorten) {
          label = url.replace(/^http:\/\//, '').replace(/^https:\/\//, '').replace(/^www\./, '');
        } else {
          label = url;
        }
        return "<a href=\"" + url + "\">" + label + "</a>";
      } else {
        return url;
      }
    }
  });

}).call(this);
