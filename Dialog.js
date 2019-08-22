// Emma: Still using this?
function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile("Index");
  SpreadsheetApp.getUi().showModalDialog(html, "Dialog title");
}
