function importCSVFromGoogleDrive(fileDate) {
  Logger.log(new Date(fileDate));
  var testDate = new Date(fileDate);
  testDate.setHours(testDate.getHours() + 5);
  var fileName =
    Utilities.formatDate(new Date(testDate), "CST", "yyyyMM") + ".csv";
  // //responseString += "The file " + fileName + " was added. ";
  // var lastRow = paidSheet.getLastRow();
  // var earliestDate = paidSheet.getRange(lastRow, 1).getDisplayValues();
  // //var earliestMonth = earliestDate[0][0].slice(0, 2);
  // var earliestMonth = Utilities.formatDate(new Date(earliestDate),"CST","yyyyMM");
  // // if (fileDate.slice(5, 7) - earliestMonth >= 6) {
  // //   deleteOld(earliestMonth);
  // //   responseString += " " + earliestMonth + " was deleted from Paid sheet. ";
  // // }
  // if (fileName > earliestMonth)
  var file = DriveApp.getFilesByName(fileName).next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  paidSheet.insertRowsBefore(1, csvData.length);
  paidSheet
    .getRange(1, 1, csvData.length, csvData[0].length)
    .setValues(csvData);
  var responseString = "";
  responseString += monthlyBudgetPatterns(csvData);
  return responseString;
}

function deleteOld(earliestMonth) {
  var data = paidSheet
    .getRange(1, 1, paidSheet.getLastRow(), paidSheet.getLastColumn())
    .getDisplayValues();
  paidSheet.clearContents();
  for (var i = data.length - 1; i >= 0; i--) {
    var iMonth = data[i][0].slice(0, 2);
    if (iMonth == earliestMonth) {
      data.pop();
    } else {
      i = -1;
    }
  }
  paidSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
