describe("Cast.define", function() {
  it("should register the type definition under the given name", function() {
    var definition = {};
    Cast.define('foo', definition);
    
    expect( Cast.get('foo') ).toEqual(definition);
  });
  
  describe("provides default implementations for", function() {
    beforeEach(function() {
      Cast.define('foo', {});
    });
    
    it("validate", function() {
      expect( Cast.get('foo').validate ).toBeDefined();
    });
    
    it("parse", function() {
      expect( Cast.get('foo').parse ).toBeDefined();
    });
    
    it("format", function() {
      expect( Cast.get('foo').format ).toBeDefined();
    });
    
    it("compare", function() {
      expect( Cast.get('foo').compare ).toBeDefined();
    });
  });
  
  it("returns the newly defined handler", function() {
    expect( Cast.define('foo', {}) ).toEqual( Cast.as('foo') )
  });
});