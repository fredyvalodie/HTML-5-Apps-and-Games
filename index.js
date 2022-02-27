let resultsButton_0 = document.querySelector(".resultats");
resultsButton_0.addEventListener("click", function(e){
    e.preventDefault();
    if(navigator.onLine){
        console.log("online.");
    }else{
        alert("Erreur internet. Veuillez vous connectez et réesayer.");
    }
});