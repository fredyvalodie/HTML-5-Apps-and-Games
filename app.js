window.onload = function() {
    console.log("Page loaded !");
    // creating indexDB database
    let users;
    let db = null;
    let addButton = document.querySelector(".add");
    let removeButton = document.querySelector(".remove");
    let updateButton = document.querySelector(".update");
    let otherButton = document.querySelector(".other");
    //listners/
    // add
    addButton.onclick = function(e){
        addForm.style.display = "block";
        removeForm.style.display = "none";
        updateForm0.style.display = "none";
        updateForm1.style.display = "none";
        otherForm.style.display = "none";
    };
    //remove
    removeButton.onclick = function(e){
        addForm.style.display = "none";
        removeForm.style.display = "block";
        updateForm0.style.display = "none";
        updateForm1.style.display = "none";
        otherForm.style.display = "none";
    };
    //update
    updateButton.onclick = function(e){
        addForm.style.display = "none";
        removeForm.style.display = "none";
        updateForm0.style.display = "block";
        updateForm1.style.display = "none";
        otherForm.style.display = "none";
    };
    //other
    otherButton.onclick = function(e){
        addForm.style.display = "none";
        removeForm.style.display = "none";
        updateForm0.style.display = "none";
        updateForm1.style.display = "none";
        otherForm.style.display = "block";
    };

    let addForm = document.querySelector(".addForm");
    let removeForm = document.querySelector(".removeForm");
    let updateForm0 = document.querySelector(".updateForm0");
    let updateForm1 = document.querySelector(".updateForm1");
    let otherForm = document.querySelector(".otherForm");

    removeForm.style.display = "none";
    updateForm0.style.display = "none";
    updateForm1.style.display = "none";
    otherForm.style.display = "none";

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
        // add new records
        addData();
        // update datas
        updateData();
        // delete datas
        let delButton = document.querySelector(".del");
        delButton.onclick = deleteData;
        // getting datas
        let getButton = document.querySelector(".get");
        getButton.onclick = getDatas;
        // updating datas
        let updateBtn = document.querySelector(".updateBtn");
        updateBtn.onclick = updateData;
        // getting total
        let totalBtn = document.querySelector(".other");
        totalBtn.onclick = totalEntries;
    };

    request.onsuccess = function(e) {
        console.log("Database successfully loaded");
        db = e.target.result;
        // add new records
        addData();
        // update datas
        //updateData();
        // delete datas
        let delButton = document.querySelector(".del");
        delButton.onclick = deleteData;
        // getting datas
        let getButton = document.querySelector(".get");
        getButton.onclick = getDatas;
        // updating datas
        let updateBtn = document.querySelector(".updateBtn");
        updateBtn.onclick = updateData;
        // getting total
        let totalBtn = document.querySelector(".other");
        totalBtn.onclick = totalEntries;
        /* adding value in the users store totalEntries()
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
            alert("Enregistré avec succès !");
        };
        request.onerror = function(){
            console.log("Error");
            alert("Echec. Raison sociale et/ou pièce d'identité déja utilisée(s) !");
        };
        
    });

}

function updateData() {
    let fields = document.querySelectorAll(".fields");
    //let updateBtn = document.querySelector('.update');
    //updateBtn.addEventListener('click', function (event) {
        //event.preventDefault();

        let transaction = db.transaction(["users"], "readwrite");
        let usersTransaction = transaction.objectStore("users");
        let request = usersTransaction.put({
            //id: 3,
            raison_sociale: document.querySelector(".updateForm1 #rs").value,
            domaine_activité: document.querySelector(".updateForm1 #da").value,
            nature: document.querySelector(".updateForm1 #na").value,
            adresse: document.querySelector(".updateForm1 #ac").value,
            nom: document.querySelector(".updateForm1 #nom").value,
            nif: document.querySelector(".updateForm1 #nif").value,
            tel: document.querySelector(".updateForm1 #tel").value,
            email: document.querySelector(".updateForm1 #email").value,
            type: document.querySelector(".updateForm1 #type").value,
            numero: document.querySelector(".updateForm1 #numero").value,
            date: document.querySelector(".updateForm1 #date").value,
        });
        
        request.onsuccess = function(){
            console.log("Updated !");
            //alert("Enregistré avec succès !");
        };
        request.onerror = function(){
            console.log("Unupdate.");
            //alert("Echec. Raison sociale et/ou pièce d'identité déja utilisée(s) !");
        };
        

}


function deleteData(){
    let transaction = db.transaction(["users"], "readwrite");
    let usersTransaction = transaction.objectStore("users");
    let delKey = document.querySelector(".delKey").value;
    let request = usersTransaction.delete(delKey);
    request.onsuccess = function(e){
        console.log("Deleted !");
    };
    request.onerror = function(e){
        console.log("Undeleted !");
    };
}

function getDatas(){
    let transaction = db.transaction(["users"], "readwrite");
    let usersTransaction = transaction.objectStore("users");
    let getKey = document.querySelector(".getKey").value;
    let request = usersTransaction.get(getKey);
    request.onsuccess = function(e){
        if(e.target.result === undefined){
            alert("Contribuable non enregistré.");
        }else{
            document.querySelector(".addForm").style.display = "none";
            document.querySelector(".removeForm").style.display = "none";
            document.querySelector(".updateForm0").style.display = "none";
            document.querySelector(".updateForm1").style.display = "block";
            document.querySelector(".otherForm").style.display = "none";
            console.log("Reord loaded !");
            //console.log(e.target.result);
            

            // auto fill datas
            document.querySelector(".updateForm1 #rs").value = e.target.result.raison_sociale;
            document.querySelector(".updateForm1 #da").value = e.target.result.domaine_activité;
            document.querySelector(".updateForm1 #na").value = e.target.result.nature;
            document.querySelector(".updateForm1 #ac").value = e.target.result.adresse;
            document.querySelector(".updateForm1 #nom").value = e.target.result.nom;
            document.querySelector(".updateForm1 #date").value = e.target.result.date;
            document.querySelector(".updateForm1 #email").value = e.target.result.email;
            document.querySelector(".updateForm1 #nif").value = e.target.result.nif;
            document.querySelector(".updateForm1 #numero").value = e.target.result.numero;
            document.querySelector(".updateForm1 #tel").value = e.target.result.tel;
            document.querySelector(".updateForm1 #type").value = e.target.result.type;
        }
    };
    request.onerror = function(e){
        console.log("Record unloaded !");
        alert("Contribuable non enregistré.");
    };
}

function totalEntries(){
    console.log("Calulating Total");
    let total = 0;
    let usersTransaction = db.transaction(["users"], "readwrite").objectStore("users");
    usersTransaction.openCursor().onsuccess = function(e){
        let cursor = e.target.result;
        if(cursor){
            total++;
            cursor.continue();
        }else{
            alert("Total entries = " + total);
        }
    };
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