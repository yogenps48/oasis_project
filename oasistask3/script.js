//add task elements
let taskInput = document.getElementById("taskinput");
let taskDesc = document.getElementById("taskdesc")
let addTaskBtn = document.getElementById("taskbtn")

//pending tasks element
let pendingContainer = document.getElementsByClassName("pending-container")[0];

//completed tasks element
let completedContainer = document.getElementsByClassName("completed-container")[0];

addTaskBtn.onclick = addTaskFunc;

let pendingTasks=[];
let completedTasks=[];
//getting stored tasks lst
if (window.localStorage.getItem("pendingTasks")!=undefined) {
    pendingTasks=JSON.parse(window.localStorage.getItem("pendingTasks"));
}
if (window.localStorage.getItem("completedTasks")!=undefined) {
    completedTasks=JSON.parse(window.localStorage.getItem("completedTasks"));
}


function addTaskFunc() {
    let title = taskInput.value;
    let description = taskDesc.value;
    taskInput.value="";
    taskDesc.value="";
    let task = { title: title, description: description }
    pendingTasks.unshift(task);
    updatePendingContainer();
}
function updatePendingContainer(){
    pendingContainer.innerHTML="";
    let c=0;
    for (let task of pendingTasks) {
        let itemDiv = document.createElement("div");
        let span = document.createElement("span");
        let input = document.createElement("input");
        let editinput=document.createElement("input");
        let editButton = document.createElement("button")
        let deleteButton = document.createElement("button")
        let containerDiv = document.createElement("div")
        let editdescinput=document.createElement("textarea")

        //creating structure
        itemDiv.appendChild(span);
        itemDiv.appendChild(editinput);
        itemDiv.appendChild(input);
        itemDiv.appendChild(editButton);
        itemDiv.appendChild(deleteButton);

        //adding textContents
        span.innerHTML = task.title;
        span.value=c++;
        editinput.value=task.title;
        editButton.innerHTML = "edit";
        deleteButton.innerHTML = "delete";
        containerDiv.innerHTML = task.description;
        editdescinput.value=task.description;

        //adding style and properties
        itemDiv.className = "item-container";
        span.className = "task-title";
        editinput.className="edit-task-input"
        input.className = "checkbox";
        input.type = "checkbox"
        editButton.className = "box-btn";
        deleteButton.className = "box-btn del-btn";
        containerDiv.className = "content";
        editdescinput.className="edit-task-desc"

        //adding functions
        input.onclick=()=>{
            let task=pendingTasks.splice(span.value,1);
            completedTasks.unshift(task[0]);
            console.log(completedTasks)
            updatePendingContainer();
            updateCompletedContainer();
        }
        editButton.onclick=()=>{
            if(span.style.display=="none"){
                editButton.innerHTML="edit";
                span.style.display="block";
                containerDiv.style.display="none";
                input.style.display="block";
                deleteButton.style.display="block";
                editinput.style.display="none";
                editdescinput.style.display="none";

                itemDiv.classList.toggle("active");
                for(task of pendingTasks){
                    if(task.title!=span.innerHTML)continue;
                    task.title=editinput.value;
                    task.description=editdescinput.value;
                    span.innerHTML=task.title;
                    containerDiv.innerHTML=task.description;
                    break;   
                }
            }else{
                
                //displaying some n not
                editButton.innerHTML="save";
                span.style.display="none";
                containerDiv.style.display="none";
                input.style.display="none";
                deleteButton.style.display="none";
                editinput.style.display="block";
                editdescinput.style.display="block";
                //managing active status
                if(!itemDiv.classList.contains("active")){
                    itemDiv.classList.toggle("active")
                }
            }
        }
        deleteButton.onclick=()=>{
            pendingTasks.splice(span.value,1);
            updatePendingContainer();
        }
        span.addEventListener("click",()=>{
            itemDiv.classList.toggle("active")
            if(containerDiv.style.display==="block")
            containerDiv.style.display="none";
            else
            containerDiv.style.display="block";
        })
        //appending elements
        pendingContainer.appendChild(itemDiv);
        pendingContainer.appendChild(containerDiv);
        pendingContainer.appendChild(editdescinput)

    }
    window.localStorage.setItem("pendingTasks",JSON.stringify(pendingTasks))
}
function updateCompletedContainer(){
    completedContainer.innerHTML="";
    let c=0;
    for(task of completedTasks){
        let itemDiv = document.createElement("div");
        let span = document.createElement("span");
        let input = document.createElement("input");
        let editinput=document.createElement("input");
        let editButton = document.createElement("button")
        let deleteButton = document.createElement("button")
        let containerDiv = document.createElement("div")
        let editdescinput=document.createElement("textarea")

        //creating structure
        itemDiv.appendChild(span);
        itemDiv.appendChild(editinput);
        itemDiv.appendChild(input);
        itemDiv.appendChild(editButton);
        itemDiv.appendChild(deleteButton);

        //adding textContents
        span.innerHTML = task.title;
        span.value=c++;
        editinput.value=task.title;
        editButton.innerHTML = "edit";
        deleteButton.innerHTML = "delete";
        containerDiv.innerHTML = task.description;
        editdescinput.value=task.description;
        input.checked=true;

        //adding style and properties
        span.style.textDecoration="line-through"
        itemDiv.className = "item-container2";
        span.className = "task-title";
        editinput.className="edit-task-input"
        input.className = "checkbox";
        input.type = "checkbox"
        editButton.className = "box-btn";
        deleteButton.className = "box-btn del-btn";
        containerDiv.className = "content";
        editdescinput.className="edit-task-desc"

        //adding functions
        input.onclick=()=>{
            let task=completedTasks.splice(span.value,1);
            pendingTasks.push(task[0]);
            updatePendingContainer();
            updateCompletedContainer();
        }
        editButton.onclick=()=>{
            if(span.style.display=="none"){
                editButton.innerHTML="edit";
                span.style.display="block";
                containerDiv.style.display="none";
                input.style.display="block";
                deleteButton.style.display="block";
                editinput.style.display="none";
                editdescinput.style.display="none";

                itemDiv.classList.toggle("active");
                for(task of completedTasks){
                    if(task.title!=span.innerHTML)continue;
                    task.title=editinput.value;
                    task.description=editdescinput.value;
                    span.innerHTML=task.title;
                    containerDiv.innerHTML=task.description;
                    break;   
                }
            }else{
                
                //displaying some n not
                editButton.innerHTML="save";
                span.style.display="none";
                containerDiv.style.display="none";
                input.style.display="none";
                deleteButton.style.display="none";
                editinput.style.display="block";
                editdescinput.style.display="block";
                //managing active status
                if(!itemDiv.classList.contains("active")){
                    itemDiv.classList.toggle("active")
                }
            }
        }
        deleteButton.onclick=()=>{
            completedTasks.splice(span.value,1);
            updateCompletedContainer();
        }
        span.addEventListener("click",()=>{
            itemDiv.classList.toggle("active")
            if(containerDiv.style.display==="block")
            containerDiv.style.display="none";
            else
            containerDiv.style.display="block";
        })
        //appending elements
        completedContainer.appendChild(itemDiv);
        completedContainer.appendChild(containerDiv);
        completedContainer.appendChild(editdescinput)

    }
    window.localStorage.setItem("completedTasks",JSON.stringify(completedTasks))
}
updatePendingContainer();
updateCompletedContainer();