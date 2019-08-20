var futureSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  "Future"
);
var budgetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  "Budget"
);
var nIncomeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  "NateIncomeRecord2019"
);
var yearlySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  "Yearly"
);

var paidSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Paid");

function flatten(arrayOfArrays) {
  //need this because appsscript doesn't have array.flat
  return [].concat.apply([], arrayOfArrays);
}

function runningTotal(arr) {
  var runningArray = arr.shift();
  arr.forEach(function(row) {
    if (row[0].length == 0) {
      return;
    }
    var lastRunningArrayIndex = runningArray.length - 1;
    var lastNumber = parseInt(runningArray[lastRunningArrayIndex]);
    var newValue = row[0] + lastNumber;
    runningArray.push(newValue);
    return runningArray;
  });
  return runningArray;
}
