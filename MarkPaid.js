function markPaid() {
  var futureData = sheets.future.getRange("A:G").getDisplayValues();
  futureData.shift();
  var markedArray = [];
  var rowsToDelete = [];
  futureData.forEach(function(row, index) {
    var rowNumber = index + 2;
    if (row[6]) {
      markedArray.push(row);
      rowsToDelete.push(rowNumber);
    }
  });
  var markedArrayWithDate = markedArray.map(function(row) {
    var date = Utilities.formatDate(new Date(), "CST", "MM/dd/yy hh:mm:ss");
    row.pop();
    row.push(date);
    return row;
  });
  Logger.log(markedArrayWithDate);
  sheets.paid
    .getRange(
      sheets.paid.getLastRow(),
      1,
      markedArray.length,
      markedArray[0].length
    )
    .setValues(markedArrayWithDate);
  for (var i = 0; i < rowsToDelete.length; i++) {
    //var rowshift = i>0:i?0
    var rowToDelete = rowsToDelete[i] - i;
    sheets.future.deleteRow(rowToDelete);
  }
  runningTotalButton();
}
