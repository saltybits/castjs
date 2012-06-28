describe("date extension", function() {
  it("validates", function() {
    expect( ValueJS.validate("2012",     "date") ).not.toBeDefined();
  });
  
  it("parses", function() {
    // .toEqual(jasmine.any(moment)) -- not working
    expect( ValueJS.parse("2011-01-13", "date")._d ).toEqual(jasmine.any(Date));
  });
  
  describe("format", function() {
    var date;
    
    beforeEach(function() {
      date = new Date("01/13/11");
    });
    
    it("displays date according to default format", function() {
      ValueJS.get("date").defaults.format = "MMM DD, YYYY";
      expect( ValueJS.format(date, "date") ).toEqual("Jan 13, 2011");
    });
    
    it("can display date according to format", function() {
      expect( ValueJS.format(date, "date", {format: "YYYY-MM"}) ).toEqual("2011-01");
    });
    
    it("can display date in relative terms", function() {
      expect( ValueJS.format(date, "date", {relative: true}) ).toMatch("ago");
    });
    
    it("can display date relative to specific date", function() {
      expect( ValueJS.format(date, "date", {relative: true, date: new Date("01/13/01")}) ).toEqual("in 10 years");
    });
  });
  
  it("sorts", function() {
    expect( ValueJS.sort(["2011-01-13", "1983-03-25", "1984-01-24"], "date") ).toEqual(["1983-03-25", "1984-01-24", "2011-01-13"]);
  });
});