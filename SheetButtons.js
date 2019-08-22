function hideSheets(buttonArray) {
  buttonArray.forEach(function(sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    sheet.hideSheet();
  });
}

function showSheet(sheetName) {
  Logger.log(sheetName);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  SpreadsheetApp.setActiveSheet(sheet);
}
