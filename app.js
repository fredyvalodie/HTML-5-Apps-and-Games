window.onload = function() {
    console.log("Page loaded !");
    // creating indexDB database
    let users;
    let db;
    
    createOrOpenIndexDB();

    let fields = document.querySelectorAll(".fields");
    for(let i = 0; i < fields.length; i++) {
        //console.log(i.value);
        fields[i].addEventListener("invalid", function(e) {
            e.target.setCustomValidity("Champ mal renseigné.");
            //event.preventDefault();
        });
        fields[i].addEventListener("change", function(e) {
            e.target.setCustomValidity("");
            //event.preventDefault();
        });
    };
    
}

function createOrOpenIndexDB() {
    let request = window.indexedDB.open("Données", 1);

    request.onupgradeneeded = function(e) {
        console.log("Database not exist, creating...");
        db = e.target.result;
        console.log("Creating users object store");
        users = db.createObjectStore("users", {keyPath: "numero"});
        users.createIndex("raison_sociale", "raison_sociale", {unique: true});
        users.createIndex("numero", "numero", {unique: true});
        // adding value in the users store
        users.add({
            //id: 1,
            raison_sociale: "Ets La joie",
            domaine_activité: "commerce",
            nature: "vente de parfums",
            adresse: "ketao, CEG",
            nom: "PALAKI",
            nif: 1000231503,
            tel: "90020304",
            email: "NEANT",
            type: "cni",
            numero: "012441222545",
            date: "28/04/2018"
        });
        addData();
    };

    request.onsuccess = function(e) {
        console.log("Database successfully loaded");
        db = e.target.result;
        addData();
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

function addData() {
    let fields = document.querySelectorAll(".fields");
    let form = document.querySelector('#form');
    form.addEventListener('submit',function (event) {
        event.preventDefault();

        let transaction = db.transaction(["users"], "readwrite");
        let usersTransaction = transaction.objectStore("users");
        let request = usersTransaction.add({
            //id: 3,
            raison_sociale: fields[0].value,
            domaine_activité: fields[1].value,
            nature: fields[2].value,
            adresse: fields[3].value,
            nom: fields[4].value,
            nif: fields[5].value,
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


        /*let error = 0;
        let fields = document.querySelectorAll(".fields");
        for(let i=0; i<fields.length; i++) {
            if(fields[i].checkValidity() == false) {

            }
            console.log(fields[i].value);
        };

    
        let invalidFields = document.querySelectorAll(".fields:invalid");
        if(invalidFields){
            return false;
        }else{
        }*/
        
    });

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