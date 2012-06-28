describe("underscore extensions", function() {
  it("#each", function() {
    expect( Cast.as("float").each ).toBeDefined();
  });
  
  it("#map", function() {
    var result = Cast.as("float").map(["1", "2", "3"], function(value) { return value * 2; });
    expect( result ).toEqual([2, 4, 6]);
  });
  
  it("#find", function() {
    var result = Cast.as("float").find(["1", "2", "3", "4"], function(value) { return value % 2 == 0; });
    expect( result ).toEqual("2");
  });
  
  it("#filter", function() {
    var result = Cast.as("float").filter(["1", "2", "3", "4"], function(value) { return value % 2 == 0; });
    expect( result ).toEqual(["2", "4"]);
  });
  
  it("#reject", function() {
    var result = Cast.as("float").reject(["1", "2", "3", "4"], function(value) { return value > 2; });
    expect( result ).toEqual(["1", "2"]);
  });
  
  it("#all", function() {
    var type = Cast.as("float");
    
    expect( type.all(["1", "2", "3", "4"], function(value) { return value > 0; }) ).toBe(true);
    expect( type.all(["1", "2", "3", "4"], function(value) { return value < 0; }) ).toBe(false);
  });
  
  it("#any", function() {
    var type = Cast.as("float");
    
    expect( type.any(["1", "2", "3", "4"], function(value) { return value > 0; }) ).toBe(true);
    expect( type.any(["1", "2", "3", "4"], function(value) { return value < 0; }) ).toBe(false);
  });
  
  describe("#max", function() {
    it("works without iterator", function() {
      expect( Cast.as("float").max(["1", "2", "3", "4"]) ).toEqual("4");
    })
    
    it("allows iterator to be passed", function() {
      expect( Cast.as("float").max(["1", "2", "3", "4"], function(value) { return -value; }) ).toEqual("1");
    });
  });
  
  describe("#min", function() {
    it("works without iterator", function() {
      expect( Cast.as("float").min(["1", "2", "3", "4"]) ).toEqual("1");
    })
    
    it("allows iterator to be passed", function() {
      expect( Cast.as("float").min(["1", "2", "3", "4"], function(value) { return -value; }) ).toEqual("4");
    });
  });
  
  it("#sortBy", function() {
    var result = Cast.as("float").sortBy(["1", "2", "3", "4"], function(value) { return value % 2 == 0 ? -1 : 1; }); 
    expect( result ).toEqual(["2", "4", "1", "3"]);
  });
});