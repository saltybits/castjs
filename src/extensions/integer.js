(function() {
  Cast.define('integer', {
    validate: /^[+-]?\d+$/,
  
    parse: function(string) {
      console.log("integer parsing", string, Number(string));
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
