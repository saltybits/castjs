describe("date extension", function() {
  var handler;
  
  beforeEach(function() {
    handler = Cast.as("date");
  });
  
  it("validates", function() {
    expect( handler.validate("2012") ).toBe(true);
  });
  
  it("parses", function() {
    expect( handler.parse("2011-01-13") ).toEqual(jasmine.any(Date));
  });
  
  describe("format", function() {
    var date;
    
    beforeEach(function() {
      date = handler.parse("01/13/11");
    });
    
    it("displays date according to default format", function() {
      handler.definition.defaults.format = "MMM DD, YYYY";
      expect( handler.format(date) ).toEqual("Jan 13, 2011");
    });
    
    it("can display date according to format", function() {
      expect( handler.format(date, {format: "YYYY-MM"}) ).toEqual("2011-01");
    });
  });
  
  it("compares", function() {
    expect(handler.compare("2000", "2000")).toBe(0);
    expect(handler.compare("2000", "2200") < 0).toBe(true);
    expect(handler.compare("2200", "2000") > 0).toBe(true);
  });
});