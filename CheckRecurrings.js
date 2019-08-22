function createMonthlyObject(date, description, amount) {
  var formatedDate = Utilities.formatDate(new Date(date), "CST", "M/d");
  var row = {
    date: formatedDate,
    description: description,
    amount: amount,
  };
  return row;
}

// Emma: This function is kind of hard to read with all of the array locations
function monthlyBudgetPatterns(csvData) {
  //csvData comes in as [[Date, Type(Debit Card), Description, Check Number, Amount, Balance]]
  //budgetData is [[Description, last month, 2 months ago, 3 months ago]]
  var budgetData = sheets.budget
    .getRange(1, 5, sheets.budget.getLastRow(), sheets.budget.getLastColumn())
    .getDisplayValues();
  deleteMonthColumns();
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
  var month = Utilities.formatDate(new Date(csvData[0][0]), "CST", "MMM");
  var lastMonthArray = [[month]]; // need to put month name in eventually
  monthlyBudgetArray.forEach(function(monthlyObject) {
    var comment = "";
    csvArray.forEach(function(csvObject) {
      if (monthlyObject.description == csvObject.description) {
        comment += "  " + csvObject.date + "  ||  " + csvObject.amount;
      }
    });
    lastMonthArray.push([comment]);
    comment = "";
  });
  sheets.budget
    .getRange(1, 6, sheets.budget.getLastRow(), 1)
    .setValues(lastMonthArray);
  return "Monthly budget patterns were updated. Please go verify current Budget dates and amounts are correct.";
}

// Emma: Is this still used anywhere?
function deleteMonthColumns() {
  sheets.budget.deleteColumn(11);
  sheets.budget.insertColumnAfter(5);
}
