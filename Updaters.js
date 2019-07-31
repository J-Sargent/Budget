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
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu("Dialog")
    .addItem("Open", "openDialog")
    .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile("Index");
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "Dialog title");
}

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

function updateFuture() {
  testBudgetData; //Will be A3:C
  testFutureData; //Will be A3:D
  var resultToAlert = testFutureData.filter(function(futureLine) {
    var differentLineItem = testBudgetData.filter(function(budgetLine) {
      Logger.log("fut " + futureLine[2]);
      Logger.log("bud " + budgetLine[1]);
      return futureLine[2] == budgetLine[1];
    });
    Logger.log("x" + differentLineItem);
    differentLineItem = flatten(differentLineItem);
    return differentLineItem.length > 1;
  });
  Logger.log(resultToAlert);
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
