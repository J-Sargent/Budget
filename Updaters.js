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

function myFunction() {}

function getTest() {
  var testBudgetData = budgetSheet.getRange("A3:D").getDisplayValues();
  Logger.log(testBudgetData);
}

var testBudgetData = [
  //["No date yet", "Medication", "-100"],
  ["1", "Fun Money", "-200"],
  ["3", "Atmos", "-50"],
  ["15", "Nate Income", "2,800"]
];

var testFutureData = [
  ["June", "1", "Fun Money", "-200"],
  ["June", "3", "Atmos", "-45"],
  ["July", "5", "Firstmark", "-50"]
  //["June", "14", "Nate Income", "2,800"]
];

function flatten(arrayOfArrays) {
  //need this because appsscript doesn't have array.flat
  return [].concat.apply([], arrayOfArrays);
}

function createObject(array) {
  var isBudget = array.length == 3;
  var line = {
    day: isBudget ? array[0] : array[1],
    description: isBudget ? array[1] : array[2],
    change: isBudget ? array[2] : array[3]
  };
  if (!isBudget) {
    line.month = array[0];
  }
  return line;
}

function findErrors() {
  // testBudgetData; //Will be A3:C
  // testFutureData; //Will be A3:D
  var budgetData = budgetSheet.getRange("A3:C").getDisplayValues();
  var futureData = futureSheet.getRange("A3:D").getDisplayValues();
  var resultToAlert = [];
  var futureObjectArray = [];
  var budgetObjectArray = [];
  futureData.forEach(function(futureLine) {
    var futureObject = createObject(futureLine);
    futureObjectArray.push(futureObject);
  });
  budgetData.forEach(function(budgetLine) {
    var budgetObject = createObject(budgetLine);
    budgetObjectArray.push(budgetObject);
  });
  //Logger.log(futureObjectArray);

  futureObjectArray.forEach(function(futureObject) {
    budgetObjectArray.forEach(function(budgetObject) {
      if (
        futureObject.description == budgetObject.description &&
        (futureObject.day != budgetObject.day ||
          futureObject.change != budgetObject.change)
      ) {
        Logger.log("if called");
        //logic for comparing errors
        //  var futureError = createObject(futureLine);
        //  var budgetError = createObject(budgetLine);
        var errorArray = {
          futureError: futureObject,
          budgetError: budgetObject
        };
        Logger.log(errorArray);
        resultToAlert.push(errorArray);
      }
    });
  });

  //   var resultToAlert = testFutureData.filter(function(futureLine) {
  //     var differentLineItem = testBudgetData.forEach(function(budgetLine) {
  // if (futureLine[2] == budgetLine[1]) {
  // 	var futureError = createObject(futureLine);
  // 	var budgetError = createObject(budgetLine);
  // 	var errorArray =[futureError,budgetError];
  // 	return errorArray;
  // }
  // return false;
  //return futureLine[2] == budgetLine[1];
  //   });
  //   differentLineItem = flatten(differentLineItem);
  //   return differentLineItem.length > 1;
  // });

  Logger.log(resultToAlert);
  return resultToAlert;
  //uncomment .end
  //need to finish once Ive figured out alerts
}

function runningTotal(arr) {
  Logger.log(arr);
  var runningArray = arr.shift();
  arr.forEach(function(row) {
    if (row[0].length == 0) {
      return;
    }
    var lastRunningArrayIndex = runningArray.length - 1;
    var lastNumber = parseInt(runningArray[lastRunningArrayIndex]);
    Logger.log(row[0]);
    Logger.log(lastNumber);
    var newValue = row[0] + lastNumber;
    Logger.log(newValue);
    runningArray.push(newValue);
    return runningArray;
  });
  Logger.log(runningArray);
  return runningArray;
}

var testRunningArray = [[850], [-50], [-40], [-75]];

function testRunningTotal() {
  runningTotal(testRunningArray);
}

//test 123
