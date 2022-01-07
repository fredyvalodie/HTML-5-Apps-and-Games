window.onload = function() {
    let dragStart = document.getElementById("dragStart");
    let dragEnd = document.getElementById("dragEnd");
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
        
       
   }

   //dragStart.ondragstart = dragElement;
   dragEnd.ondragover = function(event) {
       dragEnd.classList.add("dragOver");
       return false;
   }
   dragEnd.ondragleave = function(event) {
    dragEnd.classList.remove("dragOver");
    return false;
}
   dragEnd.ondrop= dropElement;






}