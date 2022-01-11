window.onload = function() {
    console.log("Page loaded !");
    // creating indexDB database
    let users;
    let db;

    createOrOpenIndexDB()

}

function createOrOpenIndexDB() {
    let request = window.indexedDB.open("Base", 1);

    request.onupgradeneeded = function(e) {
        console.log("Database not exist, creating...");
        db = e.target.result;
        console.log("Creating users object store");
        users = db.createObjectStore("users", {keyPath: "id"});
        users.createIndex("raison_sociale", "raison_sociale", {unique: true});
        users.createIndex("numero", "numero", {unique: true});
        // adding value in the users store
        users.add({
            id: 1,
            raison_sociale: "Ets La joie",
            domaine_activité: "commerce",
            nature: "vente de parfums",
            adresse: "ketao, CEG",
            nom: "PALAKI",
            prenom: "esso",
            tel: "90020304",
            email: "NEANT",
            type: "cni",
            numero: "012441222545",
            date: "28/04/2018"
        });
    };

    request.onsuccess = function(e) {
        console.log("Database successfully loaded");
        db = e.target.result;
        /* adding value in the users store
        let transaction = db.transaction["users", readwrite];
        transaction.add({
            //id: 1,
            username: "Fred",
            email: "fred@example.com",
            gender: "male"
        });*/
    }

    request.onerror = function(e) {
        console.log("Error while loading databse");
    }
}