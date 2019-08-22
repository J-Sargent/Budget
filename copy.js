function copyBudget(copyDate) {
  var budgetData = budgetSheet.getRange("A3:C").getDisplayValues();
  var yearlyData = yearlySheet.getRange("A1:D").getDisplayValues();
  var testDate = new Date(copyDate);
  testDate.setHours(testDate.getHours() + 5);
  var copyMonth = Utilities.formatDate(new Date(testDate), "CST", "MMM");

  var budgetDataWMonth = budgetData.map(function(row) {
    //row.unshift(copyMonth);
    var stringToPutIntoDate = copyMonth + " " + row[0] + ", " + "2019";
    Logger.log(stringToPutIntoDate);
    var date = Utilities.formatDate(
      new Date(stringToPutIntoDate),
      "CST",
      "M/d"
    );
    row.splice(0, 0, date, copyMonth);
    return row;
  });
  yearlyData.forEach(function(row) {
    if (row[0] == copyMonth) {
      budgetDataWMonth.push(row);
    }
  });
  budgetDataWMonth.sort(function(a, b) {
    if (parseInt(a[2], 10) === parseInt(b[2], 10)) {
      return 0;
    }
    return parseInt(a[2], 10) > parseInt(b[2], 10) ? 1 : -1;
  });
  Logger.log(budgetDataWMonth);

  var lastRow = futureSheet.getLastRow();
  futureSheet
    .getRange(
      lastRow + 1,
      1,
      budgetDataWMonth.length,
      budgetDataWMonth[0].length
    )
    .setValues(budgetDataWMonth);
  return copyMonth;
}
