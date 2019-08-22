var START_ROW = 3;

function createObject(array, index) {
  var rowNum = index + START_ROW;
  var isBudget = array.length == 3;
  var line = {
    day: isBudget ? array[0] : array[1],
    description: isBudget ? array[1] : array[2],
    change: isBudget ? array[2] : array[3],
    row: rowNum
  };
  if (!isBudget) {
    line.month = array[0];
  }
  return line;
}

// function rangeTest(){
// 	var futureRange = futureSheet.getRange("A3:D")
// 	var futureValues = futureRange.getDisplayValues();
// 	futureValues.map(function(line){line.pushline.getRow()}
//
// }

function findErrors() {
  var budgetData = budgetSheet
    .getRange("A" + START_ROW + ":C")
    .getDisplayValues();
  var futureData = futureSheet
    .getRange("B" + START_ROW + ":E")
    .getDisplayValues();
  var futureObjectArray = [];
  var budgetObjectArray = [];
  var errorObjectPairs = [];
  futureData.forEach(function(futureLine, index) {
    var futureObject = createObject(futureLine, index);
    futureObjectArray.push(futureObject);
  });
  budgetData.forEach(function(budgetLine, index) {
    var budgetObject = createObject(budgetLine, index);
    budgetObjectArray.push(budgetObject);
  });
  futureObjectArray.forEach(function(futureObject) {
    budgetObjectArray.forEach(function(budgetObject) {
      if (
        futureObject.description == budgetObject.description &&
        (futureObject.day != budgetObject.day ||
          futureObject.change != budgetObject.change)
      ) {
        var errorArray = {
          futureError: futureObject,
          budgetError: budgetObject
        };
        errorObjectPairs.push(errorArray);
      }
    });
  });
  Logger.log(errorObjectPairs);
  return errorObjectPairs;
}

function getErrorDivLength() {
  Logger.log(errorObjectPairs);
  //return errorObjectPairs.length;
}

function makeUpdate(errorObj) {
  var futureError = errorObj.futureError;
  var budgetError = errorObj.budgetError;
  var budgetArray = [
    [budgetError.day, budgetError.description, budgetError.change]
  ];
  futureSheet
    .getRange("C" + futureError.row + ":" + futureError.row + "")
    .setValues(budgetArray);
  var text = "Future row " + futureError.row + " was changed.";
  return text;
}
//Tests

// var testRunningArray = [[850], [-50], [-40], [-75]];
//
// function testRunningTotal() {
//   runningTotal(testRunningArray);
// }

// var testBudgetData = [
// 	//["No date yet", "Medication", "-100"],
// 	["1", "Fun Money", "-200"],
// 	["3", "Atmos", "-50"],
// 	["15", "Nate Income", "2,800"]
// ];
//
// var testFutureData = [
// 	["June", "1", "Fun Money", "-200"],
// 	["June", "3", "Atmos", "-45"],
// 	["July", "5", "Firstmark", "-50"]
// 	//["June", "14", "Nate Income", "2,800"]
// ];
