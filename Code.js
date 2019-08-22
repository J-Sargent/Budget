// Emma: You can name these anything you want you know. "showSidebar" is the only part that's specifically a function name.
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Custom Menu")
    .addItem("Show sidebar", "showSidebar")
    .addToUi();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function customChart() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "Upwork Calculator"
  );
  var chart = sheet
    .newChart()
    .addRange(sheet.getRange("B1:D"))
    .setChartType(Charts.ChartType.LINE)
    .setPosition(1, 1, 0, 0)
    .setOption("title", "Upwork Fee %")
    .setOption("series", {
      0: {
        targetAxisIndex: 0,
      },
      1: {
        targetAxisIndex: 1,
      },
    })
    .setOption("hAxis", {
      gridlines: {
        count: 15,
      },
      minorGridlines: {
        count: 3,
      },
    })
    .build();

  sheet.insertChart(chart);
}
