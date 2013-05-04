describe("percentage extension", function() {
  var handler;
  
  beforeEach(function() {
    handler = Cast.as("percentage");
  });
  
  it("validates", function() {
    expect( handler.validate("0%") ).toBe(true);
    expect( handler.validate("50.1%") ).toBe(true);
    expect( handler.validate("100%") ).toBe(true);
  });
  
  it("parses", function() {
    expect( handler.parse("0%") ).toEqual(0);
    expect( handler.parse("50.1%") ).toEqual(0.501);
    expect( handler.parse("100%") ).toEqual(1);
  });
  
  it("formats", function() {
    expect( handler.format(0) ).toEqual("0%");
    expect( handler.format(0.5) ).toEqual("50%");
    expect( handler.format(1) ).toEqual("100%");
    expect( handler.format(20) ).toEqual("2000%");
  });
  
  it("sorts", function() {
    expect( handler.sort(["0%", "100%", "50%"]) ).toEqual(["0%", "50%", "100%"]);
  });
});