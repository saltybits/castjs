describe("validate", function() {
  describe("type#validate", function() {
    it("can be a function", function() {
      var handler = Cast.define("test", {
        validate: function(string) {
          return string == "test";
        }
      });
      
      expect(handler.validate("test")).toBe(true);
    });
    
    it("can be a regular expression", function() {
      var handler = Cast.define("test", { validate: /abc/ });
      
      expect(handler.validate("abc")).toBe(true);
    });
  });
});