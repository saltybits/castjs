describe("date extension", function() {
  var handler;
  
  beforeEach(function() {
    handler = Cast.as("date");
  });
  
  it("validates", function() {
    expect( handler.validate("2012") ).not.toBeDefined();
  });
  
  it("parses", function() {
    // .toEqual(jasmine.any(moment)) -- not working
    expect( handler.parse("2011-01-13")._d ).toEqual(jasmine.any(Date));
  });
  
  describe("format", function() {
    var date;
    
    beforeEach(function() {
      date = new Date("01/13/11");
    });
    
    it("displays date according to default format", function() {
      handler.definition.defaults.format = "MMM DD, YYYY";
      expect( handler.format(date) ).toEqual("Jan 13, 2011");
    });
    
    it("can display date according to format", function() {
      expect( handler.format(date, {format: "YYYY-MM"}) ).toEqual("2011-01");
    });
    
    it("can display date in relative terms", function() {
      expect( handler.format(date, {relative: true}) ).toMatch("ago");
    });
    
    it("can display date relative to specific date", function() {
      expect( handler.format(date, {relative: true, date: new Date("01/13/01")}) ).toEqual("in 10 years");
    });
  });
  
  it("sorts", function() {
    expect( handler.sort(["2011-01-13", "1983-03-25", "1984-01-24"]) ).toEqual(["1983-03-25", "1984-01-24", "2011-01-13"]);
  });
});