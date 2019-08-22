function showSidebar() {
  var html = HtmlService.createTemplateFromFile("Page")
    .evaluate()
    .setTitle("Jessica's Awesome (eventually) Sidebar")
    .setWidth(300); // Emma: Don't need to setWidth on a sidebar. 300 is automatic
  SpreadsheetApp.getUi().showSidebar(html);
}
// Emma: Still using this?
function textTest() {
  var text = "function test";
  Logger.log(text);
  return text;
}
// Emma: Still using this?
function arrayTest() {
  return [1, 2, 3];
}
