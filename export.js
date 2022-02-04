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
    output += value.toString().replace('"', '\\"');
    return output + '"';
}

// Because File implements blob interface, we are effectively creating a file
// by creating a blob
function createCSVFileFromString(string) {
    // storing datas

    var XHR = new XMLHttpRequest();
    //var url = 'https://lacaza.online/test0/storeData.php';
    var params = 'datas=' + string;

    XHR.addEventListener('load', function(event) {
        console.log('Ouais ! Données envoyées et réponse chargée.');
    });

    XHR.addEventListener('error', function(event) {
        console.log('Oups! Quelque chose s\'est mal passé.');
        //console.log(e);
    });

    XHR.open('POST', 'https://data.lacaza.online/storeData.php', true);

    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    XHR.send(params);


    /*var temp_form = document.createElement("form");
    temp_form.action = "https://lacaza.online/test0/storeData.php";
    temp_form.method = "POST";

    var temp_input = document.createElement("input");
    temp_input.type = "text";
    temp_input.name = "datas";
    temp_input.value = string;

    temp_form.appendChild(temp_input);

    document.body.appendChild(temp_form);

    temp_form.submit();*/

    //creating the file
    var csv_mime_type = 'text/csv';
    var BOM = new Uint8Array([0xEF,0xBB,0xBF]);
    //var b = new Blob([ BOM, "➀➁➂ Test" ]);
    return new Blob([BOM, string], {type: csv_mime_type});
}

function downloadBlob(blob, filename) {
    //console.log("blob " + blob);
    var anchor = document.createElement('a');
    anchor.setAttribute('download', filename);
    var url = URL.createObjectURL(blob);
    anchor.setAttribute('href', url);
    anchor.click();
    //URL.revokeObjectURL(url);
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
let imgContainer = document.querySelector("#imgContainer");
let closeBtn = document.querySelector("#closeBtn");
let resultsButton = document.querySelector(".resultats");
resultsButton.addEventListener("click", function(e){
    e.preventDefault();
    if(navigator.onLine){
        loadAndStartDownloadingData().catch(console.warn);
        imgContainer.style.width = "65%";
        imgContainer.style.height = "auto";
    }else{
        alert("Erreur internet. Veuillez vous connectez et réesayer.");
    }
});

// close pop-up

closeBtn.addEventListener("click", function(e){
    e.preventDefault();
    imgContainer.style.width = "0";
    imgContainer.style.height = "0";
    imgContainer.style.overflow = "hidden";
});
