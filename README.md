value.js
========

A tiny javascript library for validating, parsing, sorting, and displaying formatted values.

## Basic Usage

### Using the built in data types

ValueJS comes lightweight by default, including only three core data types: `integer`, `float`, `string`.
Since there's little formatting involved in any of those three types, the ValueJS's use is limited. The real
power of the library is evident when you start working with complex values like currencies, dates, percentages,
fractions, etc.

The library has the ability to implicitly discover the type of the value, but it's much faster to specify
the type if you know it ahead of time.

```
ValueJS.parse("13")             // => returns 13
ValueJS.typeOf("13")            // => returns "integer"
ValueJS.parse("13", "integer")  // => returns 13
```

### Working with values

**validate**

**parse**

**format**

**compare**

**sort**
```
ValueJS.sort(["0.1", "19.83", "13.24"], "float")

### Adding your own data types
```
ValueJS.define("dataType", {
  validate: regex OR function(string) { ... },
  parse:    function(string) { ... },
  format:   function(value, options) { },
  compare:  function(a, b) { ... }
})