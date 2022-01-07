window.onload = function() {
    let dragStart = document.getElementById("dragStart");
    let dragEnd = document.getElementById("dragEnd");
    console.log("Page loaded !");
   function dragElement(event){
       event.dataTransfer.setData("fruit", event.target.textContent);
       console.log(event.dataTransfer.getData("fruit"));
   }

   function dropElement(event){
        let li = document.createElement("li");
        let list = document.querySelector(".dropContainer");
        let data = event.dataTransfer.getData("fruit");
        let data2 = event.dataTransfer.getData("text/plain");
        if(data){
            li.innerHTML = data + " copied";
        }else{
            li.innerHTML = data2 + " copied";
        }
        list.appendChild(li);
       
   }

   dragStart.ondragstart = dragElement;
   dragEnd.ondragover = function(event) {
       return false;
   }
   dragEnd.ondrop= dropElement;






}