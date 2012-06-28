describe("ValueJS.identify", function() {
  beforeEach(function() {
    ValueJS.define("integer", { validate: /^\-?\d+$/ });
    ValueJS.define("float",   { validate: /^[-+]?[0-9]*\.?[0-9]+$/ });
  })
  
  describe("without precedence", function() {
    it("falls back to the default precedence", function() {
      ValueJS.defaults.precedence = ["float", "integer"];
      expect( ValueJS.identify("99") ).toEqual("float");
    });
  });
  
  describe("with precedence", function() {
    it("overrides the default precedence", function() {
      ValueJS.defaults.precedence = ["integer", "float"];
      expect( ValueJS.identify("99", ["float", "integer"]) ).toEqual("float");
    });
  });
});