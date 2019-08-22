var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = {
  accountSummary: ss.getSheetByName("AccountsSummary"),
  future: ss.getSheetByName("Future"),
  budget: ss.getSheetByName("Budget"),
  paid: ss.getSheetByName("Paid"),
  bank: ss.getSheetByName("Bank"),
  nIncomeRecord2019: ss.getSheetByName("NateIncomeRecord2019"),
  yearly: ss.getSheetByName("Yearly"),
  debts: ss.getSheetByName("Debts"),
  trips: ss.getSheetByName("Trips"),
  garden: ss.getSheetByName("Garden"),
  nIncomeRecord2018: ss.getSheetByName("Nate Income Record 2018"),
  upworkCalculator: ss.getSheetByName("Upwork Calculator"),
  christmas: ss.getSheetByName("Christmas")
};

function flatten(arrayOfArrays) {
  //need this because appsscript doesn't have array.flat
  return [].concat.apply([], arrayOfArrays);
}

// not using, but keep as a base if decide to turn it back to an in-cell function
// function runningTotal(arr) {
//   var runningArray = arr.shift();
//   arr.forEach(function(row) {
//     var lastRunningArrayIndex = runningArray.length - 1;
//     var lastNumber = parseInt(runningArray[lastRunningArrayIndex]);
//     if (row[0].length == 0) {
//       runningArray.push(lastNumber);
//     } else {
//       var newValue = row[0] + lastNumber;
//       runningArray.push(newValue);
//     }
//     return runningArray;
//   });
//   return runningArray;
// }

function runningTotalButton() {
  futureData = sheets.future.getRange("E2:F").getValues();
  var initialValue = [futureData[0][1]];
  var runningTotalArray = [initialValue];
  for (var i = 1; i < futureData.length; i++) {
    Logger.log("in for");
    var previousNumber = runningTotalArray[i - 1][0];
    Logger.log("previousNumber follows");
    Logger.log(previousNumber);
    var currentNumber = futureData[i][0];
    Logger.log("currentNumber follows");
    Logger.log(currentNumber);
    if (!currentNumber) {
      currentNumber = 0;
    }
    var newTotal = previousNumber + currentNumber;
    runningTotalArray.push([newTotal]);
  }
  Logger.log(runningTotalArray);
  sheets.future
    .getRange(2, 6, runningTotalArray.length, runningTotalArray[0].length)
    .setValues(runningTotalArray);
}
