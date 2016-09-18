// Based on and inspired by Scott Olmsted's excellent work
// http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/
// Modified slightly and comments updated/changed

var SHEET_NAME = "Sheet1";
var SCRIPT_PROP = PropertiesService.getScriptProperties();

// Allows us to submit data via GET
// function doGet(e) {
//   return handleResponse(e);
// }

// Allows us to submit data via POST
function doPost(e){
  return handleResponse(e);
}

function handleResponse(e) {
  // Prevents concurrent requests overwritting each other's data
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);

  try {
    // Writes to the attached spreadsheet...
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));

    // ...and the correct sheet
    // TODO: Allow sheet to be passed in the URL parameter
    var sheet = doc.getSheetByName(SHEET_NAME);

    // Get the header data from row 1
    var headRow = 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Index of the next empty row in the sheet
    var nextRow = sheet.getLastRow() + 1;
    var row = [];
    
    // For each header in the sheet:
    for (i in headers){
      if (headers[i] == "Timestamp") {
        // Automatically timestamp the request if that column is included on the sheet
        row.push(new Date());
      } else { 
        // Get the data from the request params for the header value 
        row.push(e.parameter[headers[i]]);
      }
    }
    
    // Appends the row to the spreadsheet
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    // return success
    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
          .setMimeType(ContentService.MimeType.JSON);
    
  } catch(e){
    // return error, serve the error
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    // release lock
    lock.releaseLock();
  }
}

// Setup should make the attached spreadsheet the sheet used by the app
function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}