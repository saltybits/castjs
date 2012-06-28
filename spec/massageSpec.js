describe("ValueJS.massage", function() {
  it("lets you parse and format a value in a single step", function() {
    ValueJS.define("currency", {
      defaults: {
        symbol: "$",
        decimals: 2
      },
      
      parse: function(string) {
        return Number(string);
      },
      
      format: function(value, options) {
        return options.symbol + value.toFixed(options.decimals);
      }
    });
    
    expect( ValueJS.massage("13", "currency", {symbol: "$", decimals: 2}) ).toEqual("$13.00");
  });
});