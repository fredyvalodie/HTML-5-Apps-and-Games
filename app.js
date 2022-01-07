window.onload = function() {
    let dragStart = document.getElementById("dragStart");
    let dragEnd = document.getElementById("dragEnd");
    let dragContainer = document.querySelector(".dropContainer");
    console.log("Page loaded !");
   function dragElement(event){
       event.dataTransfer.setData("fruit", event.target.textContent);
       console.log(event.dataTransfer.getData("fruit"));
   }

   function dropElement(event){
       event.stopPropagation();
       event.preventDefault();
        let li = document.createElement("li");
        let list = document.querySelector(".dropContainer");
        let data = event.dataTransfer.getData("text/plain");
        let data2 = event.dataTransfer.files;
        if(data){
            li.innerHTML = data + " copied";
            list.appendChild(li);
        }else{
            for(let i = 0; i < data2.length; i++){
                let li_tmp = document.createElement("li");
                li_tmp.innerHTML = data2[i].name + " copied";
                list.appendChild(li_tmp);
            }
        }

        dragContainer.classList.remove("dragOver");
       
   }

   //dragStart.ondragstart = dragElement;
   dragEnd.ondragover = function(event) {
    event.stopPropagation();
    event.preventDefault();
    dragContainer.classList.add("dragOver");
       return false;
   }
   dragEnd.ondragenter = function(event) {
    event.stopPropagation();
    event.preventDefault();
    //dragContainer.classList.add("dragOver");
       return false;
   }
   dragEnd.ondragleave = function(event) {
    event.stopPropagation();
    event.preventDefault();
    dragContainer.classList.remove("dragOver");
    return false;
}
   dragEnd.ondrop = dropElement;






}