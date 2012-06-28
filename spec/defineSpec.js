describe("Cast.define", function() {
  it("should register the type definition under the given name", function() {
    var definition = {};
    Cast.define('number', definition);
    
    expect( Cast.get('number') ).toEqual(definition);
  });
  
  describe("provides default implementations for", function() {
    beforeEach(function() {
      Cast.define('number', {});
    });
    
    it("validate", function() {
      expect( Cast.get('number').validate ).toEqual(Cast.defaults.validate);
    });
    
    it("parse", function() {
      expect( Cast.get('number').parse ).toEqual(Cast.defaults.parse);
    });
    
    it("format", function() {
      expect( Cast.get('number').format ).toEqual(Cast.defaults.format);
    });
    
    it("compare", function() {
      expect( Cast.get('number').compare ).toEqual(Cast.defaults.compare);
    });
  });
  
  it("returns the newly defined handler", function() {
    expect( Cast.define('test', {}) ).toEqual( Cast.as('test') )
  });
});