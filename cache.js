// checking is sw avalaible
if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker.register("SW2.js").then(function(registration){
            console.log(registration.scope);
        },
        function(err){
            console.log(err);
        });
    });
}