function showSidebar() {
  var html = HtmlService.createTemplateFromFile("Page")
    .evaluate()
    .setTitle("Jessica's Awesome (eventually) Sidebar")
    .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

function textTest() {
  var text = "function test";
  Logger.log(text);
  return text;
}

function arrayTest() {
  return [1, 2, 3];
}
