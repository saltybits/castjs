value.js
========

A tiny javascript library for slicing and dicing formatted values.

## Basic Usage

### Using the built in data types

Cast.js was designed to help you slice and dice formatted values (eg sorting and filtering strings as dates, working with complex formats like currencies, fractions, etc.).

Cast.js has the ability to implicitly discover the type of the value (through validation), but it's much faster to specify
the type if you know it ahead of time.

```
Cast.typeOf("$11.13")        // => "currency"

currency = Cast.as("currency")
currency.parse("$1,2419.84")                // => 12419.84
currency.format(325.83)                     // => "$325.83"
currency.sort(["$2", "$1", "$0.50", "$4"])  // => ["$0.50", "$1", "$2", "$4"]

// what other underscore functions could be useful here? looks like pretty much all the collection and array functions
// all the methods below are working with parsed values
currency.(each|map)
currency.filter(...)
```

### Working with values

**validate**

**parse**

**format**

**compare**

**sort**
```
Cast.sort(["0.1", "19.83", "13.24"], "float")

### Adding your own data types
```
Cast.define("dataType", {
  validate: regex OR function(string) { ... },
  parse:    function(string) { ... },
  format:   function(value, options) { },
  compare:  function(a, b) { ... }
})


## Contributing

Fork it, make sure tests are passing (simply load SpecRunner.html in your browser), then branch and hack away.  Make sure to add tests for any changes you make.

Contributions are welcome!