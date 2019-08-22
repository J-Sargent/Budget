function importCSVFromGoogleDrive(fileDate) {
  Logger.log(new Date(fileDate));
  var testDate = new Date(fileDate);
  testDate.setHours(testDate.getHours() + 5);
  var fileName =
    Utilities.formatDate(new Date(testDate), "CST", "yyyyMM") + ".csv";
  var file = DriveApp.getFilesByName(fileName).hasNext()
    ? DriveApp.getFilesByName(fileName).next()
    : null;
  if (!file) {
    Logger.log("no file");
    var errorResponseString = "CSV file not found.";
    return errorResponseString;
  }
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  sheets.bank.insertRowsBefore(1, csvData.length);
  sheets.bank
    .getRange(1, 1, csvData.length, csvData[0].length)
    .setValues(csvData);
  var responseString = "";
  responseString += monthlyBudgetPatterns(csvData);
  return responseString;
}

// Currently not used, but might bring it back later
// function deleteOld(earliestMonth) {  //
//   var data = sheets.bank
//     .getRange(1, 1, sheets.bank.getLastRow(), sheets.bank.getLastColumn())
//     .getDisplayValues();
//   sheets.bank.clearContents();
//   for (var i = data.length - 1; i >= 0; i--) {
//     var iMonth = data[i][0].slice(0, 2);
//     if (iMonth == earliestMonth) {
//       data.pop();
//     } else {
//       i = -1;
//     }
//   }
//   sheets.bank.getRange(1, 1, data.length, data[0].length).setValues(data);
// }
