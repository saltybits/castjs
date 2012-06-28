describe("ValueJS.define", function() {
  it("should register the type definition under the given name", function() {
    var definition = {};
    ValueJS.define('number', definition);
    
    expect( ValueJS.get('number') ).toEqual(definition);
  });
  
  describe("provides default implementations for", function() {
    beforeEach(function() {
      ValueJS.define('number', {});
    });
    
    it("validate", function() {
      expect( ValueJS.get('number').validate ).toEqual(ValueJS.defaults.validate);
    });
    
    it("parse", function() {
      expect( ValueJS.get('number').parse ).toEqual(ValueJS.defaults.parse);
    });
    
    it("format", function() {
      expect( ValueJS.get('number').format ).toEqual(ValueJS.defaults.format);
    });
    
    it("compare", function() {
      expect( ValueJS.get('number').compare ).toEqual(ValueJS.defaults.compare);
    });
  });
  
  it("returns the newly defined handler", function() {
    expect( ValueJS.define('test', {}) ).toEqual( ValueJS.as('test') )
  });
});