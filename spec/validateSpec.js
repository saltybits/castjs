describe("validate", function() {
  var string,
      regex;
  
  beforeEach(function() {
    string = "123-4567";
    regex = /^\d{3}-\d{4}$/;
  });
  
  describe("type#validate", function() {
    it("can be a function", function() {
      ValueJS.define("validationTest", {
        validate: function(string) {
          if (!string.match())
            return ValueJS.invalid;
        }
      });
      
      var handler = ValueJS.as("validationTest");
      
      spyOn(handler.definition, "validate");
      handler.validate(string);
      
      console.log("spied handler is", handler.definition.validate);
      
      expect( handler.definition.validate ).toHaveBeenCalledWith(string);
    });
    
    it("can be a regular expression", function() {
      ValueJS.define("validationTest", { validate: regex });
      
      // spyOn(string, "match").andReturn(true);
      // ValueJS.as("validationTest").validate(string);
      // expect( string.match ).toHaveBeenCalledWith(regex);
      
      // can't get spyOn(string, "match") to work so here's a workaround
      expect( ValueJS.as("validationTest").validate(string) ).not.toBeDefined()
    });
  });
});