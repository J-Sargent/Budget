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

function findErrors() {
  var budgetData = sheets.budget
    .getRange("A" + START_ROW + ":C")
    .getDisplayValues();
  var futureData = sheets.future
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

function makeUpdate(errorObj) {
  var futureError = errorObj.futureError;
  var budgetError = errorObj.budgetError;
  var budgetArray = [
    [budgetError.day, budgetError.description, budgetError.change]
  ];
  sheets.future
    .getRange(futureError.row, 3, 1, budgetArray[0].length)
    .setValues(budgetArray);
  var text = "Future row " + futureError.row + " was changed.";
  return text;
}
