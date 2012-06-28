// Dependencies: moment.js
(function() {
  Cast.define('date', {
    defaults: {
      format: 'YYYY-MM-DD'
    },
  
    validate: function(string) {
      if (Date.parse(string) == NaN)
        return Cast.invalid;
    },
  
    parse: function(string) {
      return moment(string);
    },
    
    // value can be a string, javascript Date object or integer representing unix epoch in ms
    format: function(value, options) {
      var m = moment(value);
      
      if (options.relative)
        return m.from(options.date || moment());
      else
        return m.format(options.format);
    },
  
    compare: function(a, b) {
      return a.diff(b);
    }
  });
})();
