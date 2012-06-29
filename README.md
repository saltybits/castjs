cast.js
========

A tiny javascript library for slicing and dicing formatted values.

## Basic Usage

### Using the built in data types

Cast.js was designed to help you slice and dice formatted values (eg sorting and filtering strings as dates, working with complex formats like currencies, fractions, etc.).

Cast.js has the ability to implicitly discover the type of the value (through validation):

```
Cast.typeOf("$11.13")        // => "currency"

// can pass a precedence array to speed up the process if you have a rough idea of the type
Cast.typeOf("$11.13", ["currency", "float", "integer"])
```

But it's much faster to specify the type if you know it ahead of time:

```
currency = Cast.as("currency")
currency.parse("$1,2419.84")                // => 12419.84
currency.format(325.83)                     // => "$325.83"
currency.sort(["$2", "$1", "$0.50", "$4"])  // => ["$0.50", "$1", "$2", "$4"]
```

### Leveraging underscore.js

Cast.js has a number of utility functions for working with lists of values, courtesy of [underscore](http://underscorejs.org/).
Simply include `underscore.js` before including `cast.js` to enable them.

```
// the "date" type is built on top of `moment.js`
var now = moment();
var dates = ["Jan 13, 2011", "01/24/1984", "1983-03-25"]; // note how we don't have to worry about the format of the date

Cast.as("date").filter(dates, function(moment) { return now.diff(moment, 'years') < 10; }); // => ["Jan 13, 2011"]
```

The following underscore methods are supported:
`each` `map` `find` `filter` `reject` `all` `any` `max` `min` `sortBy` 

### Adding your own data types
```
Cast.define("type", {
  validate: regex OR function(string) { ... },  // return nothing on success, anything on error
  parse:    function(string) { ... },           // return the parsed value
  format:   function(value, options) { },       // return the formatted value
  compare:  function(a, b) { ... }              // return -1, 0, or 1 (can be any negative or positive number)
})


## Contributing

Fork it, make sure tests are passing (simply load SpecRunner.html in your browser), then branch and hack away.  Make sure to add tests for any changes you make.

Contributions are welcome!