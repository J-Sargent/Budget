function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu("Dialog")
    .addItem("Open", "openDialog")
    .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile("Index");
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "Dialog title");
}

function textTest() {
  var text = "this is so akward";
  Logger.log(text);
  return text;
}
