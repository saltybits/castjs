describe("Handler", function() {
  var handler,
      definition;
  
  beforeEach(function() {
    ValueJS.define("foobar", {
      defaults: {},
      
      parse: function(string) {
        return string == "foo" ? "bar" : string;
      },
      
      format: function(string, options) {
        return string == "bar" ? "foo" : string;
      },
      
      compare: function(a, b) {
        return a == b ? 0 : (a < b ? -1 : 1);
      }
    });
    
    handler = ValueJS.as("foobar");
    definition = handler.definition;
  });
  
  describe("#validate", function() {
    it("delegates to definition", function() {
      spyOn(definition, "validate");
      handler.validate("foo");
      
      expect( definition.validate ).toHaveBeenCalledWith("foo");
    });
  });
  
  describe("#parse", function() {
    it("delegates to definition", function() {
      spyOn(definition, "parse");
      handler.parse("foo");
      
      expect( definition.parse ).toHaveBeenCalledWith("foo");
    });
  });
  
  describe("#format", function() {
    it("delegates to definition", function() {
      spyOn(definition, "format");
      handler.format("bar");
      
      expect( definition.format ).toHaveBeenCalledWith("bar", definition.defaults);
    });
  });
  
  describe("#massage", function() {
    it("parses", function() {
      spyOn(definition, "parse");
      handler.massage("foo");
      
      expect( definition.parse ).toHaveBeenCalledWith("foo");
    });
    
    it("then formats", function() {
      spyOn(definition, "format");
      handler.massage("foo");
      
      expect( definition.format ).toHaveBeenCalledWith("bar", definition.defaults);
    });
  });
  
  describe("#compare", function() {
    it("delegates to definition", function() {
      spyOn(definition, "compare");
      handler.compare();
      
      expect( definition.compare ).toHaveBeenCalled();
    });
    
    it("parses the values before passing them to definition#compare", function() {
      spyOn(definition, "compare");
      handler.compare("foo", "red")
      
      expect( definition.compare ).toHaveBeenCalledWith("bar", "red");
    });
  });
});