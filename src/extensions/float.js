(function() {
  Cast.define('float', {
    defaults: {
      precision: 2
    },
    
    valdate: /^[-+]?[0-9]*\.?[0-9]+$/,
  
    parse: function(string) {
      return Number(string);
    },
    
    format: function(value, options) {
      return value.toFixed(options.precision);
    },
  
    compare: function(a, b) {
      return a - b;
    }
  });
})();