describe("integer extension", function() {
  var handler;
  
  beforeEach(function() {
    handler = Cast.as("integer");
  });
  
  it("validates", function() {
    expect( handler.validate("0") ).toBe(true);
    expect( handler.validate("-1") ).toBe(true);
    expect( handler.validate("0.0") ).toBe(false);
  });
  
  it("parses", function() {
    expect( handler.parse("0") ).toEqual(0);
    expect( handler.parse("-1") ).toEqual(-1);
    expect( handler.parse("+13") ).toEqual(13);
  });
  
  it("formats", function() {
    expect( handler.format(0) ).toEqual("0");
    expect( handler.format(-1) ).toEqual("-1");
    expect( handler.format(+24) ).toEqual("24");
  });
  
  it("sorts", function() {
    expect( handler.sort(["+2", "+4", "-3", "0"]) ).toEqual(["-3", "0", "+2", "+4"]);
  });
});