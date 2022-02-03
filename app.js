window.onload = function() {
    /*if(navigator.onLine){
        document.querySelector("span.buttons button.add").style.backgroundColor = "blue";
    }else{
        document.querySelector("span.buttons button.add").style.backgroundColor = "red";
    }*/
    console.log("Page loaded !");
    //alert("Page laoded !");
    // creating indexDB database
    let users;
    let db;
    //let transaction;

    createOrOpenIndexDB();
    
}

function createOrOpenIndexDB() {
    if(!window.indexedDB) {
        alert("IndexedDB indisponible sur votre appareil");
    }
    let request = window.indexedDB.open("Données", 1);

    request.onupgradeneeded = function(e) {
        console.log("Database not exist, creating...");
        //alert("Database not exist, creating...");
        /*db = e.target.result;
        let trans = e.target.transaction;
        console.log("Creating users object store");
        //alert("Creating users object store");
        users = db.createObjectStore("users", {keyPath: "numero"});
        users.createIndex("raison_sociale", "raison_sociale", {unique: true});
        users.createIndex("numero", "numero", {unique: true});
        // adding value in the users store
        users.add({
            //id: 1,
            raison_sociale: "Raison sociale",
            domaine_activité: "Domaine d'activité",
            nature: "Nature de l'activité",
            adresse: "Adresse",
            lat: "Latitude",
            long: "Longitude",
            nom: "Nom Prénoms",
            nif: "NIF",
            tel: "Tel",
            email: "Email",
            type: "Pièce d'identité",
            numero: "N° de la pièce",
            date: "Date de debut"
        });*/
    };

    request.onsuccess = function(e) {
        console.log("Database successfully loaded");
        db = e.target.result;
        let trans = e.target.transaction;
    }

    request.onerror = function(e) {
        console.log("Error while loading databse");
        //alert("Error while loading database");
    }
}



/*function saveData(form) {
    form.preventDefault();

    let email = document.querySelectorAll("#email");
    email.addEventListener("invalid", function(e) {
        e.target.value = "NEANT";
    });
    let invalidFields = document.querySelectorAll(".fields:invalid");
    if(invalidFields){
        return false;
    }else{
        let usersTransaction = db.transaction["users", readwrite].objectStore("users");
        let request = usersTransaction.add({
            //id: 1,
            raison_sociale: fields[0].value,
            domaine_activité: fields[1].value,
            nature: fields[2].value,
            adresse: fields[3].value,
            nom: fields[4].value,
            prenom: fields[5].value,
            tel: fields[6].value,
            email: fields[7].value,
            type: fields[8].value,
            numero: fields[9].value,
            date: fields[10].value
        });
        request.onsuccess = function(){
            console.log("Success");
        };
        request.onerror = function(){
            console.log("Error");
        };
    }
    
}*/

// Home page settings
// rapide
let rapideBtn = document.querySelector(".rapide");
rapideBtn.addEventListener("click", function(e){
    e.preventDefault();
    let resp_0 = confirm("Cette action va reinitialiser votre base de donnée actuelle afin de la reconfigurer avec les entités par défaut.Cela est irreversible. Voulez-vous continuer ?");
    if(resp_0){
        location.href = "rapide.html";
    }
});

// personalise
let personaliseBtn = document.querySelector(".personalise");
personaliseBtn.addEventListener("click", function(e){
    e.preventDefault();
    location.href = "personalise.html";
    //alert("Désolé.. Cette fonctionnalité est toujours en cours de développement.");
});

/* download results
let resultsBtn = document.querySelector(".resultats");
resultsBtn.addEventListener("click", function(e){
    e.preventDefault();
    if(!navigator.onLine){
        alert("Erreur internet. Veuillez vous connectez et réesayer.");
    }
});*/