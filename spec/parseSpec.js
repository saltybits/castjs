describe("ValueJS.parse", function() {
  describe("with explicit type", function() {
    it("calls the parse method on the given type definition", function() {
      var definition = {parse: function(string) {} };
      ValueJS.define('number', definition);
      
      spyOn(definition, 'parse');
      ValueJS.parse('98.6', 'number');
      
      expect( definition.parse ).toHaveBeenCalledWith('98.6');
    });
    
    describe("when type not recognized", function() {
      it("throws an error", function() {
        expect( function() { ValueJS.parse('foo', 'bar'); } ).toThrow();
      });
    });
  });
  
  describe("with implicit type", function() {
    describe("when no precedence given", function() {
      
    });
    
    describe("when precedence given", function() {
      
    });
  });
});