function importCSVFromGoogleDrive(fileDate) {
  var fileName = fileDate.slice(0, 4) + fileDate.slice(5, 7) + ".csv";
  responseString += "The file " + fileName + " was added. ";
  var lastRow = paidSheet.getLastRow();
  var earliestDate = paidSheet.getRange(lastRow, 1).getDisplayValues();
  var earliestMonth = earliestDate[0][0].slice(0, 2);
  if (fileDate.slice(5, 7) - earliestMonth >= 6) {
    deleteOld(earliestMonth);
    responseString += " " + earliestMonth + " was deleted from Paid sheet. ";
  }
  var file = DriveApp.getFilesByName(fileName).next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  Logger.log("importCSVFromGoogleDrive");
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
  Logger.log("Data length before" + data.length);
  for (var i = data.length - 1; i >= 0; i--) {
    var iMonth = data[i][0].slice(0, 2);
    if (iMonth == earliestMonth) {
      data.pop();
    } else {
      i = -1;
    }
  }
  Logger.log("Data length after" + data.length);
  paidSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
