describe('url', function() {
  var type;
  
  beforeEach(function() {
    type = Cast.as('url');
  });
  
  it("parses", function() {
    expect(type.parse("kumu.com")).toEqual("http://kumu.com");
    expect(type.parse("kumu.com", {relative: true})).toEqual("kumu.com");
  });
  
  it("formats", function() {
    expect(type.format('www.kumu.com')).toEqual('<a href="www.kumu.com">kumu.com</a>');
    expect(type.format('www.kumu.com', {shorten: false})).toEqual('<a href="www.kumu.com">www.kumu.com</a>');
    expect(type.format('kumu.com', {link: false})).toEqual('kumu.com');
  });
});