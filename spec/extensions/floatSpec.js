describe("float extension", function() {
  var handler;
  
  beforeEach(function() {
    handler = Cast.as("float");
  });
  
  it("validates", function() {
    expect( handler.validate("0") ).not.toBeDefined();
    expect( handler.validate("-1") ).not.toBeDefined();
    expect( handler.validate("0.0") ).not.toBeDefined()
  });
  
  it("parses", function() {
    expect( handler.parse("0") ).toEqual(0);
    expect( handler.parse("-1.24") ).toEqual(-1.24);
    expect( handler.parse("+13.11") ).toEqual(13.11);
  });
  
  describe("format", function() {
    it("handles the basics", function() {
      expect( handler.format(0) ).toEqual("0.00");
      expect( handler.format(-1) ).toEqual("-1.00");
      expect( handler.format(+24) ).toEqual("24.00");
    });
    
    it("allows you to control precision", function() {
      expect( handler.format(25, {precision:1}) ).toEqual("25.0");
    });
  });
  
  it("sorts", function() {
    expect( handler.sort(["+2.5", "+4", "-3.1", "0.0"]) ).toEqual(["-3.1", "0.0", "+2.5", "+4"]);
  });
});