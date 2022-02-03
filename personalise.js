
let ajouterBtn = document.querySelector(".ajouterBtn");
let GPSBtn = document.querySelector(".GPSBtn");
let CommencerBtn = document.querySelector(".CommencerBtn");
let previewList = document.querySelector(".previewList");
let output = document.querySelector(".output");
let prep = document.querySelector(".prep");
let users;
let db;
output.style.display = "none";

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
    //otherForm.style.display = "none";
};
//remove
removeButton.onclick = function(e){
    addForm.style.display = "none";
    removeForm.style.display = "block";
    updateForm0.style.display = "none";
    updateForm1.style.display = "none";
    //otherForm.style.display = "none";
};
//update
updateButton.onclick = function(e){
    addForm.style.display = "none";
    removeForm.style.display = "none";
    updateForm0.style.display = "block";
    updateForm1.style.display = "none";
    //otherForm.style.display = "none";
};
//other
/*otherButton.onclick = function(e){
    addForm.style.display = "none";
    removeForm.style.display = "none";
    updateForm0.style.display = "none";
    updateForm1.style.display = "none";
    //otherForm.style.display = "block";
};*/

let addForm = document.querySelector(".addForm");
let removeForm = document.querySelector(".removeForm");
let updateForm0 = document.querySelector(".updateForm0");
let updateForm1 = document.querySelector(".updateForm1");
//let otherForm = document.querySelector(".otherForm");

removeForm.style.display = "none";
updateForm0.style.display = "none";
updateForm1.style.display = "none";
//otherForm.style.display = "none";


let deleteLiBtns;
let count = 0;
let toAddList = [];
let toAddList_2 = [];
let libellé;

ajouterBtn.onclick = function(e){
    libellé = document.querySelector("#rs").value;//updateForm1
    if(libellé){
        if(toAddList.includes(libellé.toLowerCase())){
            alert("Oops ! " + libellé + " a déjà été ajouté.");
        }else{
            count = count + 1;
            toAddList.push(libellé.toLowerCase());
            toAddList_2.push(libellé.toLowerCase());
            let li = document.createElement("li");
            li.setAttribute("class", "previewLi");
            li.classList.add("a" + count);
            let span1 = document.createElement("span");
            span1.textContent = "- " +libellé;
            li.appendChild(span1);
            let span2 = document.createElement("span");
            span2.setAttribute("class", "deleteLi " + count);
            span2.setAttribute("id", count);
            span2.textContent = "x";
            li.appendChild(span2);
            previewList.appendChild(li);
            document.querySelector("#rs").value = "";
            document.querySelector("#unik").textContent = toAddList_2[0];
            document.querySelector("#unik").style.textTransform = "capitalize";
            document.querySelector("#unik2").textContent = toAddList_2[0];
            document.querySelector("#unik2").style.textTransform = "capitalize";
            createInputFields();
            deleteLis() 
        }    
    }
};

GPSBtn.onclick = function(e){
    libellé = "GPS Coords";
    if(toAddList.includes(libellé.toLowerCase())){
        alert("Oops ! " + libellé + " a déjà été ajouté.");
    }else{
        count = count + 1;
        toAddList.push(libellé.toLowerCase());
        toAddList_2.push("lat");
        toAddList_2.push("long");
        let li = document.createElement("li");
        li.setAttribute("class", "previewLi");
        li.classList.add("a" + count);
        let span1 = document.createElement("span");
        span1.textContent = "- " +libellé;
        li.appendChild(span1);
        let span2 = document.createElement("span");
        span2.setAttribute("class", "deleteLi " + count);
        span2.setAttribute("id", count);
        span2.textContent = "x";
        li.appendChild(span2);
        previewList.appendChild(li);
        document.querySelector("#rs").value = "";
        addGPSField();
        deleteLis()    
    }
};

CommencerBtn.onclick = function(e){
    if(toAddList.length > 0){
        let resp = confirm("Cette action va reinitialiser votre base de donnée actuelle afin de la reconfigurer avec les entités que vous avez renseigné.Cela est irreversible. Voulez-vous continuer ?");
        if(resp){
            alert("Succes ! Vous pouvez commencer à collecter vos données.");
            let addForm = document.querySelector(".addForm");
            let updateForm1 = document.querySelector(".updateForm1");
            addSendBtn(addForm, "Enregistrer", "saveBtn");
            addSendBtn(updateForm1, "Metre à jour", "updateBtn");
            output.style.display = "block";
            prep.style.display = "none";

             // working on database
            window.indexedDB.deleteDatabase("Données");
            let request = window.indexedDB.open("Données", 1);

            request.onupgradeneeded = function(e) {
                console.log("Database not exist, creating...");
                //alert("Database not exist, creating...");
                db = e.target.result;
                let trans = e.target.transaction;
                console.log("Creating users object store");
                //alert("Creating users object store");
                let keyPathValue = toAddList_2[0].replace(/\s/g, '');
                users = db.createObjectStore("users", {keyPath: keyPathValue});
                //users.createIndex("raison_sociale", "raison_sociale", {unique: true});
                users.createIndex(keyPathValue, keyPathValue, {unique: true});
                // adding value in the users store
                let obj0 = {};
                for(let i = 0; i < toAddList_2.length; i++ ){
                    let temp_val = toAddList_2[i].replace(/\s/g, '');
                    console.log(temp_val);
                    obj0[temp_val] = toAddList_2[i];
                }
                console.log(obj0);
                users.add(obj0);

                //trans = db.transaction(['users'], 'readwrite');
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

            };

            request.onsuccess = function(e) {
                console.log("Database successfully loaded");
                //alert("Database successfully loaded");
                /*let db = e.target.result;
                //db.deleteObjectStore("users");
                let keyPathValue = toAddList[0].replace(/\s/g, '');
                users = db.createObjectStore("users", {keyPath: keyPathValue});
                //users.createIndex("raison_sociale", "raison_sociale", {unique: true});
                users.createIndex(keyPathValue, keyPathValue, {unique: true});
                // adding value in the users store
                let obj0 = {};
                for(let i = 0; i < toAddList.length; i++ ){
                    let temp_val = toAddList[i].replace(/\s/g, '');
                    obj0[temp_val] = toAddList[i];
                }
                users.add(obj0);


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
                 adding value in the users store totalEntries()
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
    }else{
        alert("Veuillez paramétrer votre en-tête d'abord.");
    }
};

// back to home
let backToHome = document.querySelector(".home");
backToHome.addEventListener("click", function(e){
    e.preventDefault();
    let resp_0 = confirm("Cette action va stopper la session de collecte en cours et vous renvoyer sur la page d'acceuil. Voulez-vous continuer ?");
    if(resp_0){
        location.href = "index.html";
    }
});

function deleteLis(){
    deleteLiBtns = document.querySelectorAll(".deleteLi");
    deleteLiBtns.forEach(element => {
        element.onclick = function(e){
            let key = element.getAttribute("id");
            //console.log(key);
            //let param = ".previewLi.a" + key;
            //console.log(param);
            let del_str = document.querySelector(".previewLi.a" + key).firstChild.textContent.slice(2).toLowerCase();
            //console.log(del_str);
            const index = toAddList.indexOf(del_str);
            if (index > -1) {
                toAddList.splice(index, 1); // 2nd parameter means remove one item only
                if(del_str == "gps coords"){
                    const index_2 = toAddList_2.indexOf("lat");
                    toAddList_2.splice(index_2, 1);
                    const index_3 = toAddList_2.indexOf("long");
                    toAddList_2.splice(index_3, 1);
                }else{
                    const index_4 = toAddList_2.indexOf(del_str);
                    toAddList_2.splice(index_4, 1);
                }
            }
            
            document.querySelector(".previewLi.a" + key).remove();
            document.querySelector(".addForm .a" + key).remove();
            document.querySelector(".updateForm1 .a" + key).remove();
            document.querySelector("#unik").textContent = toAddList_2[0];
            document.querySelector("#unik").style.textTransform = "capitalize";
            document.querySelector("#unik2").textContent = toAddList_2[0];
            document.querySelector("#unik2").style.textTransform = "capitalize";
        };
});
}

function createInputFields(){
    // creating input fields

    let addForm = document.querySelector(".addForm");
    let updateForm1 = document.querySelector(".updateForm1");
    // span - container
    let temp_span = document.createElement('span');
    temp_span.setAttribute("class", "elt");
    temp_span.classList.add("a" + count);
    // label
    let temp_label = document.createElement('label');
    temp_label.setAttribute("for", "a" + count);
    temp_label.textContent = libellé;
    temp_span.appendChild(temp_label);
    // input
    let temp_input = document.createElement("input");
    temp_input.setAttribute('id', "a" + count);
    temp_input.classList.add("fields");
    temp_input.type = "text";
    temp_input.name = "a" + count;
    temp_span.appendChild(temp_input);
    let clone_span = temp_span.cloneNode(true);
    addForm.appendChild(temp_span);
    updateForm1.appendChild(clone_span);
}

function addGPSField(){
    let addForm = document.querySelector(".addForm");
    let updateForm1 = document.querySelector(".updateForm1");
    // span - container
    let temp_span = document.createElement('span');
    let temp_span_2 = document.createElement('span');
    temp_span.setAttribute("class", "elt latLong");
    temp_span_2.setAttribute("class", "elt latLong");
    temp_span.classList.add("a" + count);
    temp_span_2.classList.add("a" + count);
    // gps innerHTML
    temp_span.innerHTML = '<span class="lat"><label for="lat">Latitude</label><input class="fields lat0" id="lat" name="lat" type="text" ></span><span class="long"><label for="long">Longitude</label><input class="fields long0" id="long" name="long" type="text" ></span><span class="getCords"><input id="getCords" class="getCords0" name="getCords"type="submit" value="Obtenir"></span>';
    temp_span_2.innerHTML = '<span class="lat"><label for="lat">Latitude</label><input class="fields lat1" id="lat" name="lat" type="text" ></span><span class="long"><label for="long">Longitude</label><input class="fields long1" id="long" name="long" type="text" ></span><span class="getCords"><input id="getCords" class="getCords1" name="getCords"type="submit" value="Obtenir"></span>';
    addForm.appendChild(temp_span);
    updateForm1.appendChild(temp_span_2);
}

function addSendBtn(value1, value2, value3){
    //let addForm = document.querySelector(".addForm");
    // span - container
    let temp_span = document.createElement('span');
    temp_span.setAttribute("class", "send");
    //temp_span.classList.add("a" + count);
    // gps innerHTML
    temp_span.innerHTML = '<input id="send" class="' + value3 + '" name="submit" type="submit" value="' + value2 + '">';
    value1.appendChild(temp_span);
}

// functions

function addData() {
    let fields = document.querySelectorAll(".addForm .fields");
    console.log(fields[0]);
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
            let obj1 = {};
            for(let i = 0; i < toAddList_2.length; i++ ){
                let temp_val = toAddList_2[i].replace(/\s/g, '');
                obj1[temp_val] = fields[i].value;
            }
            let request = usersTransaction.add(obj1);
            request.onsuccess = function(){
                console.log("Success");
                alert("Enregistré avec succès !");
                for(let i = 0; i < fields.length; i++ ){
                    fields[i].value = "";
                }
            };
            request.onerror = function(){
                console.log("Error");
                alert("Echec. Les mêmes informations ont déjà été utilisée(s) !");
            };
            
        };

        
    });

}

function updateData() {
    let fields = document.querySelectorAll(".updateForm1 .fields");
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
        let obj2 = {};
        for(let i = 0; i < toAddList_2.length; i++ ){
            let temp_val = toAddList_2[i].replace(/\s/g, '');
            obj2[temp_val] = fields[i].value;
        }
        let request = usersTransaction.put(obj2);
        
        request.onsuccess = function(){
            console.log("Updated !");
            alert("Mis à jour avec succès !");
            for(let i = 0; i < fields.length; i++ ){
                fields[i].value = "";
            }
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
                document.querySelector(".delKey").value = "";
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
                // re-create headers
                let temp_obj0 = {};
                for(let i = 0; i < toAddList_2.length; i++ ){
                    let temp_val = toAddList_2[i].replace(/\s/g, '');
                    temp_obj0[temp_val] = toAddList_2[i];
                }
                usersTransaction.add(temp_obj0);

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
                    alert("Données inexistant.");
                }else{
                    document.querySelector(".addForm").style.display = "none";
                    document.querySelector(".removeForm").style.display = "none";
                    document.querySelector(".updateForm0").style.display = "none";
                    document.querySelector(".updateForm1").style.display = "block";
                    // clearing gps coords
                    document.querySelector(".lat1").value = "";
                    document.querySelector(".long1").value = "";
                    // clear done
                    //document.querySelector(".otherForm").style.display = "none";
                    console.log("Reord loaded !");
                    alert("Chargement des données !");
                    //console.log(e.target.result);
                    
        
                    // auto fill datas

                    let fields_2 = document.querySelectorAll(".updateForm1 .fields");
                    let obj3 = {};
                    for(let i = 0; i < toAddList_2.length; i++ ){
                        let temp_val = toAddList_2[i].replace(/\s/g, '');
                        fields_2[i].value = e.target.result[temp_val];
                    }
                }
            };
            request.onerror = function(e){
                console.log("Record unloaded !");
                alert("Données innexistant.");
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
                    total = total - 1;
                    alert("Total collectés = " + total);
                }
            };
            
        };

    
}

