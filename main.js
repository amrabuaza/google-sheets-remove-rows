/**
 * Created by PhpStorm.
 * User: amrabuaza
 */

/** @type {string} sheet name */
const SHEET_NAME            = "Sheet1";
/** @type {string} search prefix */
const SEARCH_PREFIX         = ".pre";
/** @type {boolean} enabled print deleted info */
const ENABLED_PRINT_INFO    = true;

/**
 * This function will get all rows form sheet and
 * search inside row values if contain search prefix that's need to delete
 */
function run() {
    let spreadsheetApp  = SpreadsheetApp.getActive();
    let sheet           = spreadsheetApp.getSheetByName(SHEET_NAME);
    let dataRange       = sheet.getDataRange();
    let numRows         = dataRange.getNumRows();
    let values          = dataRange.getValues();

    // removing the rows (start with i=2, so don't delete header row.)
    let rowsDeleted = 0;
    for (let i = 2; i <= numRows; i++) {
        // your sheet has various data types, script can be improved here to allow deleting dates, ect.
        let rowValues = values[i - 1].toString();
        if (rowValues.indexOf(SEARCH_PREFIX) > -1) {
            //keeps loop and sheet in sync
            sheet.deleteRow(i - rowsDeleted);
            rowsDeleted++;

            if(ENABLED_PRINT_INFO){
                console.log("Delete : ", rowValues);
                console.log("-----------------------------------------------------------");
            }
        }

    }

    // open confirmation UI
    postUIConfirm(rowsDeleted);
}

function postUIConfirm(rowsDeleted) {
    var ui = SpreadsheetApp.getUi();
    ui.alert("Operation complete. There were " + rowsDeleted + " rows deleted.")
}

