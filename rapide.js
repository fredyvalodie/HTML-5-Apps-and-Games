window.onload = function() {
    let users;
    let db;
    //let transaction;
    let addButton = document.querySelector(".add");
    let removeButton = document.querySelector(".remove");
    let updateButton = document.querySelector(".update");
    let otherButton = document.querySelector(".other");
    //listners/
    // add
    addButton.onclick = function(e){
        addForm.style.display = "block";
        // clearing gps coords
        document.querySelector(".lat0").value = "";
        document.querySelector(".long0").value = "";
        // clear done
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

    // working on database

    let request = window.indexedDB.open("Données", 1);

    request.onupgradeneeded = function(e) {
        console.log("Database not exist, creating...");
    };

    request.onsuccess = function(e) {
        console.log("Database successfully loaded");
        //alert("Database successfully loaded");
        let db = e.target.result;
        let trans = db.transaction(['users'], 'readwrite');
        // add new records
        addData();
        // update datas
        //updateData();
        // get gps coords
        let gpsBtn0 = document.querySelector(".getCords0");
        let gpsBtn1 = document.querySelector(".getCords1");
        gpsBtn0.onclick = getLocation0;
        gpsBtn1.onclick = getLocation1;
        // delete datas
        let delButton = document.querySelector(".del");
        delButton.onclick = deleteData;
        // delete all datas
        let delAllButton = document.querySelector(".delAll");
        delAllButton.onclick = deleteAllData;
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

// functions

function addData() {
    let fields = document.querySelectorAll(".fields");
    //let form = document.querySelector('#form');
    let saveBtn = document.querySelector('.saveBtn');
    saveBtn.addEventListener('click',function (event) {
        console.log("save button clicked");
        event.preventDefault();

        //let transaction = db.transaction(["users"], "readwrite");
        //let transaction = e.target.transaction;

        var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            let trans = db.transaction(['users'], 'readwrite');
            let usersTransaction = trans.objectStore("users");
            let request = usersTransaction.add({
                //id: 3,
                raison_sociale: fields[0].value,
                domaine_activité: fields[1].value,
                nature: fields[2].value,
                adresse: fields[3].value,
                lat: fields[4].value,
                long: fields[5].value,
                nom: fields[6].value,
                nif: fields[7].value,
                tel: fields[8].value,
                email: fields[9].value,
                type: fields[10].value,
                numero: fields[11].value,
                date: fields[12].value
            });
            request.onsuccess = function(){
                console.log("Success");
                alert("Enregistré avec succès !");
            };
            request.onerror = function(){
                console.log("Error");
                alert("Echec. Raison sociale et/ou pièce d'identité déja utilisée(s) !");
            };
            
        };

        
    });

}

function updateData() {
    let fields = document.querySelectorAll(".fields");
    //let updateBtn = document.querySelector('.update');
    //updateBtn.addEventListener('click', function (event) {
        //event.preventDefault();

        //let transaction = db.transaction(["users"], "readwrite");
        //let transaction = e.target.transaction;

        var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            
        };

        let trans = db.transaction(['users'], 'readwrite');
        let usersTransaction = trans.objectStore("users");
        let request = usersTransaction.put({
            //id: 3,
            raison_sociale: document.querySelector(".updateForm1 #rs").value,
            domaine_activité: document.querySelector(".updateForm1 #da").value,
            nature: document.querySelector(".updateForm1 #na").value,
            adresse: document.querySelector(".updateForm1 #ac").value,
            lat: document.querySelector(".updateForm1 #lat").value,
            long: document.querySelector(".updateForm1 #long").value,
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
            alert("Mis à jour avec succès !");
        };
        request.onerror = function(){
            console.log("Unupdate.");
            alert("Mise à jour échoué. Raison sociale et/ou pièce d'identité déja utilisée(s) !");
        };
        

}

function getLocation0(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition0);
        console.log("0");
    }
    else{
        alert("Vous ne disposez pas de la Géolocalisation");
    }
}

function showPosition0(position){
    console.log("0 done");
    document.querySelector(".lat0").value = position.coords.latitude;
    document.querySelector(".long0").value = position.coords.longitude;    
    //console.log("Latitude: " + position.coords.latitude);
    //console.log("Longitude: " + position.coords.longitude); 
    console.log(position.coords);
}

function getLocation1(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition1);
        console.log("1");
    }
    else{
        alert("Vous ne disposez pas de la Géolocalisation");
    }
}

function showPosition1(position){
    document.querySelector(".lat1").value = position.coords.latitude;
    document.querySelector(".long1").value = position.coords.longitude;    
    //console.log("Latitude: " + position.coords.latitude);
    //console.log("Longitude: " + position.coords.longitude); 
    console.log(position.coords);
}

function deleteData(){
    //let transaction = db.transaction(["users"], "readwrite");
    //let transaction = e.target.transaction;

    var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            let trans = db.transaction(['users'], 'readwrite');
            let usersTransaction = trans.objectStore("users");
            let delKey = document.querySelector(".delKey").value;
            let request = usersTransaction.delete(delKey);
            request.onsuccess = function(e){
                console.log("Deleted !");
                alert("Supprimé !");
            };
            request.onerror = function(e){
                console.log("Undeleted !");
                alert("Echec de suppression !");
            };
            
        };

    
}

function deleteAllData(){
    //let transaction = db.transaction(["users"], "readwrite");
    //let transaction = e.target.transaction;

    var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            let trans = db.transaction(['users'], 'readwrite');
            let usersTransaction = trans.objectStore("users");
            //let delKey = document.querySelector(".delKey").value;
            let request = usersTransaction.clear();
            request.onsuccess = function(e){
                console.log("Store empty !");
                alert("Toutes les données ont été effacé !");
            };
            request.onerror = function(e){
                console.log("Not empty !");
                alert("Echec de suppression");
            };
            
        };

    
}

function getDatas(){
    //let transaction = db.transaction(["users"], "readwrite");
    //let transaction = e.target.transaction;

    var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            let trans = db.transaction(['users'], 'readwrite');
            let usersTransaction = trans.objectStore("users");
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
                    // clearing gps coords
                    document.querySelector(".lat1").value = "";
                    document.querySelector(".long1").value = "";
                    // clear done
                    document.querySelector(".otherForm").style.display = "none";
                    console.log("Reord loaded !");
                    alert("Chargement des données du contribuable !");
                    //console.log(e.target.result);
                    
        
                    // auto fill datas
                    document.querySelector(".updateForm1 #rs").value = e.target.result.raison_sociale;
                    document.querySelector(".updateForm1 #da").value = e.target.result.domaine_activité;
                    document.querySelector(".updateForm1 #na").value = e.target.result.nature;
                    document.querySelector(".updateForm1 #ac").value = e.target.result.adresse;
                    document.querySelector(".updateForm1 #lat").value = e.target.result.lat;
                    document.querySelector(".updateForm1 #long").value = e.target.result.long;
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
            
        };

}

function totalEntries(){
    console.log("Calulating Total");
    //alert("Calulating Total");
    let total = 0;
    //let usersTransaction = db.transaction(["users"], "readwrite").objectStore("users");

    var openrequest = indexedDB.open("Données", 1);
        openrequest.onupgradeneeded = function(e){
            console.log("");
        };
        openrequest.onerror = event => reject(event.target.error);
        openrequest.onsuccess = event => {
            var db = event.target.result;

            let trans = db.transaction(['users'], 'readwrite');
            let usersTransaction = trans.objectStore("users");
            usersTransaction.openCursor().onsuccess = function(e){
                let cursor = e.target.result;
                if(cursor){
                    total++;
                    cursor.continue();
                }else{
                    alert("Total collectés = " + total);
                }
            };
            
        };

    
}