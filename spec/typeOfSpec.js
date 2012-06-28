describe("Cast.typeOf", function() {
  describe("without precedence", function() {
    it("falls back to the default precedence", function() {
      Cast.defaults.precedence = ["float", "integer"];
      expect( Cast.typeOf("99") ).toEqual("float");
    });
  });
  
  describe("with precedence", function() {
    it("overrides the default precedence", function() {
      Cast.defaults.precedence = ["integer", "float"];
      expect( Cast.typeOf("99", ["float", "integer"]) ).toEqual("float");
    });
  });
});