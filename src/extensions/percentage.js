(function() {
  var regex = /(\d*(\.\d+)?)%/;
  
  ValueJS.define('percentage', {
    defaults: {
      precision: 2
    },
  
    validate: regex,
  
    parse: function(string) {
      return Number( string.match(regex)[1] ) / 100;
    },
  
    format: function(value, options) {
      return value * 100 + "%";
    },
  
    compare: function(a, b) {
      return a - b;
    }
  });
})();
