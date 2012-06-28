describe("ValueJS.validate", function() {
  describe("type#validate", function() {
    it("can be a function", function() {
      ValueJS.define("phoneNumber", {
        validate: function(string) {
          if (!string.match(/^\d{3}-\d{4}$/))
            return ValueJS.invalid;
        }
      });
      
      expect( ValueJS.validate("ABC", "phoneNumber") ).toBeDefined()
      expect( ValueJS.validate("555-1234", "phoneNumber") ).not.toBeDefined();
    });
    
    it("can be a regular expression", function() {
      ValueJS.define("phoneNumber", {
        validate: /^\d{3}-\d{4}$/
      });

      expect( ValueJS.validate("ABC", "phoneNumber") ).toBeDefined()
      expect( ValueJS.validate("555-1234", "phoneNumber") ).not.toBeDefined();
    });
  });
});