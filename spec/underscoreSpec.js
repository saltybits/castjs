describe("underscore extensions", function() {
  describe("#each", function() {
    it("works", function() {
      expect( Cast.as("float").each ).toBeDefined();
    });
  });
  
  describe("#filter", function() {
    it("works", function() {
      var result = Cast.as("float").filter(["1", "2", "3", "4"], function(value) { return value % 2 == 0; });
      
      expect( result ).toEqual(["2", "4"]);
    });
  });
});