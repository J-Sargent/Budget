function createMonthlyObject(date, description, amount) {
  //var rowNum = index + START_ROW;
  //var isBudget = array.length == 3;
  var formatedDate = Utilities.formatDate(new Date(date), "CST", "M/d");
  var row = {
    date: formatedDate,
    description: description,
    amount: amount
  };
  return row;
}

function monthlyBudgetPatterns(csvData) {
  //csvData comes in as [[Date, Type(Debit Card), Description, Check Number, Amount, Balance]]
  //budgetData is [[Description, last month, 2 months ago, 3 months ago]]
  var budgetData = budgetSheet
    .getRange(1, 5, budgetSheet.getLastRow(), budgetSheet.getLastColumn())
    .getDisplayValues();
  // var budgetRangeA1 = budgetSheet
  //   .getRange(2, 5, budgetSheet.getLastRow(), budgetSheet.getLastColumn())
  //   .getA1Notation();
  // Logger.log(budgetRangeA1);
  var csvArray = [];
  var monthlyBudgetArray = [];
  budgetData.shift();
  csvData.shift();
  csvData.forEach(function(row) {
    var newObject = createMonthlyObject(row[0], row[2], row[4]);
    csvArray.push(newObject);
  });
  budgetData.forEach(function(row) {
    var newObject = createMonthlyObject("", row[0], "");
    monthlyBudgetArray.push(newObject);
  });
  //Logger.log(monthlyBudgetArray);
  var lastMonthArray = [["july"]]; // need to put month name in eventually
  monthlyBudgetArray.forEach(function(monthlyObject) {
    var comment = ".";
    csvArray.forEach(function(csvObject) {
      if (monthlyObject.description == csvObject.description) {
        comment = csvObject.date + "  " + csvObject.amount;
      }
    });
    lastMonthArray.push([comment]);
  });
  //Logger.log("lastMonthArray length is " + lastMonthArray.length);
  //  Logger.log(budgetSheet.getLastRow());
  thingy = budgetSheet
    .getRange(1, 6, budgetSheet.getLastRow(), 1)
    .getDisplayValues();
  //Logger.log("thingy length is " + thingy.length);
  //Logger.log(lastMonthArray);

  budgetSheet
    .getRange(1, 6, budgetSheet.getLastRow(), 1)
    .setValues(lastMonthArray);
  return "Monthly budget patterns were updated. Please go verify current Budget dates and amounts are correct.";
}
