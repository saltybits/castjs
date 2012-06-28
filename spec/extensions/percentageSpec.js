describe("percentage extension", function() {
  it("validates", function() {
    expect( ValueJS.validate("0%",     "percentage") ).not.toBeDefined();
    expect( ValueJS.validate("50.1%",  "percentage") ).not.toBeDefined();
    expect( ValueJS.validate("100%",   "percentage") ).not.toBeDefined();
  });
  
  it("parses", function() {
    expect( ValueJS.parse("0%",     "percentage") ).toEqual(0);
    expect( ValueJS.parse("50.1%",  "percentage") ).toEqual(0.501);
    expect( ValueJS.parse("100%",   "percentage") ).toEqual(1);
  });
  
  it("formats", function() {
    expect( ValueJS.format(0,     "percentage") ).toEqual("0%");
    expect( ValueJS.format(0.5,   "percentage") ).toEqual("50%");
    expect( ValueJS.format(1,     "percentage") ).toEqual("100%");
    expect( ValueJS.format(20,    "percentage") ).toEqual("2000%");
  });
  
  it("sorts", function() {
    expect( ValueJS.sort(["0%", "100%", "50%"], "percentage") ).toEqual(["0%", "50%", "100%"]);
  });
});