function loadData() {
    return new Promise((resolve, reject) => {
      var openrequest = indexedDB.open("Données", 1);
      openrequest.onupgradeneeded = function(e){
          console.log("onupgrqdeneeded from exportJS");
      };
      openrequest.onerror = event => reject(event.target.error);
      openrequest.onsuccess = event => {
        var db = event.target.result;
        var txn = db.transaction(['users'], 'readwrite');
        var store = txn.objectStore("users");
        var loadrequest = store.getAll();
        loadrequest.onerror = event => reject(event.target.error);
        loadrequest.onsuccess = event => {
          var data = event.target.result;
          resolve(data);
        };
      };
    });
}

  // This is not perfect, just an example of getting you closer
function toCSV(data) {
    var output = [];
    for(var object of data) {
      var row = [];
      for(var prop in object) {
        row.push(to_csv_value(object[prop]));
        row.push(',');
      }
      row.push('\n');
      output.push(row.join(''));
    }
  
    return output.join('');
}
  
function to_csv_value(value) {
    var output = '"';
    output += value.replace('"', '\\"');
    return output + '"';
}

// Because File implements blob interface, we are effectively creating a file
// by creating a blob
function createCSVFileFromString(string) {
    var csv_mime_type = 'text/csv';
    return new Blob([string], {type: csv_mime_type});
}

function downloadBlob(blob, filename) {
    var anchor = document.createElement('a');
    anchor.setAttribute('download', filename);
    var url = URL.createObjectURL(blob);
    anchor.setAttribute('href', url);
    anchor.click();
    URL.revokeObjectURL(url);
}
  
// And finally, to compose it all together
async function loadAndStartDownloadingData() {
    console.log("start getting datas");
    var data = await loadData();
    console.log("data got");
    console.log("creating csv");
    var csvstring = toCSV(data);
    console.log("csv created");
    console.log("creating file");
    var blob = createCSVFileFromString(csvstring);
    console.log("file created");
    console.log("start downloading");
    downloadBlob(blob, 'mydata.csv');
    console.log("downloaded");
}

// download button click
let resultsButton = document.querySelector(".resultats");
resultsButton.addEventListener("click", function(e){
    e.preventDefault();
    if(navigator.onLine){
        loadAndStartDownloadingData().catch(console.warn);
    }
});