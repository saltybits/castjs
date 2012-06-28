(function() {
  Cast.define('integer', {
    validate: /^[+-]?\d+$/,
  
    parse: function(string) {
      return Number(string);
    },
    
    format: function(value) {
      return String(value);
    },
  
    compare: function(a, b) {
      return a - b;
    }
  });
})();
