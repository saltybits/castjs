describe("number", function() {
  var type;
  
  beforeEach(function() {
    type = Cast.as("number");
  });
  
  it("validates", function() {
    expect(type.validate("0")).toBe(true);
    expect(type.validate("foo")).toBe(false);
  });
  
  it("parses integers", function() {
    expect(type.parse("0")).toEqual(0);
    expect(type.parse("-100")).toEqual(-100);
  });

  it("parses floats", function() {
    expect(type.parse("0.5")).toEqual(0.5);
    expect(type.parse("-9.99")).toEqual(-9.99);
  });

  it("parses percentages", function() {
    expect(type.parse("50%")).toEqual(0.5);
  });
});