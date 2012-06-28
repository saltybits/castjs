describe("ValueJS.typeOf", function() {
  describe("without precedence", function() {
    it("falls back to the default precedence", function() {
      ValueJS.defaults.precedence = ["float", "integer"];
      expect( ValueJS.typeOf("99") ).toEqual("float");
    });
  });
  
  describe("with precedence", function() {
    it("overrides the default precedence", function() {
      ValueJS.defaults.precedence = ["integer", "float"];
      expect( ValueJS.typeOf("99", ["float", "integer"]) ).toEqual("float");
    });
  });
});