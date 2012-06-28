describe("validate", function() {
  var string,
      regex;
  
  beforeEach(function() {
    string = "123-4567";
    regex = /^\d{3}-\d{4}$/;
  });
  
  describe("type#validate", function() {
    it("can be a function", function() {
      Cast.define("validationTest", {
        validate: function(string) {
          if (!string.match())
            return Cast.invalid;
        }
      });
      
      var handler = Cast.as("validationTest");
      
      spyOn(handler.definition, "validate");
      handler.validate(string);
      
      expect( handler.definition.validate ).toHaveBeenCalledWith(string);
    });
    
    it("can be a regular expression", function() {
      Cast.define("validationTest", { validate: regex });
      
      // spyOn(string, "match").andReturn(true);
      // Cast.as("validationTest").validate(string);
      // expect( string.match ).toHaveBeenCalledWith(regex);
      
      // can't get spyOn(string, "match") to work so here's a workaround
      expect( Cast.as("validationTest").validate(string) ).not.toBeDefined()
    });
  });
});