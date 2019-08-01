function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile("Index");
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "Dialog title");
}
