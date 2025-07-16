//PRACTICE

//PRACTICE


//ADD A TASK
let plusButton = document.querySelector('.fa-solid.fa-plus');
let input = document.getElementById('type-task');
let tasks = document.querySelector('.list-of-tasks');
let emptyMsgSpace = document.querySelector('.empty-message');
let popUp = document.getElementById("edit-pop-up");
let popUpInput = document.getElementById("edit-tasktext");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
let taskTextElement = document.createElement("p");
let taskTextSpace;
let tasksArray = [];
let taskIdCounter = 0;
let idSelectedTask;
let idSelectedConvTask;


function saveTasksToLocalStorage(){
    const stringOfTasks = JSON.stringify(tasksArray);
    localStorage.setItem('taskList', stringOfTasks);
}

function loadTasksFromLocalStorage(){
    const retrievedData = localStorage.getItem('taskList');

    if(retrievedData===null){
            tasksArray=[];
            taskIdCounter=0;
            return;
    } else{
        tasksArray = JSON.parse(retrievedData);
        tasks.innerHTML = ''; //clears existing tasks displayd on page to prevent duplicates
        tasksArray.forEach(function(taskObject){
            const retrievedTask = objectToTask(taskObject);
            tasks.appendChild(retrievedTask);
        })
            
        if(tasksArray.length > 0){
            const arrayOfIds = tasksArray.map((tasksObject)=>{
            return Number(tasksObject.id);
            })
                    
            const highestIdNum = Math.max(...arrayOfIds);
            taskIdCounter = highestIdNum+1;
        }
            

        }
}
loadTasksFromLocalStorage();

function contentChecker(){
    let taskList = tasks.querySelectorAll('li:not(.empty-message)');
    if(taskList.length === 0){
        emptyMsgSpace.textContent = "Empty. Add a new task!";
        emptyMsgSpace.style.display = "block";
    } else {
        emptyMsgSpace.style.display = "none";
    }
    console.log('Tasks count:', taskList.length);
}
contentChecker();

function createTaskElement(taskText){

    let newTask = document.createElement("li");
    newTask.classList.add("task-li");
    newTask.setAttribute("id", tasksObject.id);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskTextElement = document.createElement("p");
    taskTextElement.textContent = taskText;
    taskTextElement.style.display = "inline";

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent="Edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent="Delete";

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.setAttribute("id", taskIdCounter);

        newTask.appendChild(taskDiv);

    let checknTextDiv = document.createElement("div");
    checknTextDiv.classList.add("checkntext-div");
    checknTextDiv.appendChild(checkbox);
    checknTextDiv.appendChild(taskTextElement);

        taskDiv.appendChild(checknTextDiv);

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

        taskDiv.appendChild(buttonDiv);

    const tasksObject = {
    text: taskText,
    completed: false, 
    id: taskIdCounter
    };
    tasksArray.push(tasksObject);
    console.log(tasksArray);

    taskIdCounter++;

    return newTask;
}

function objectToTask (taskObject){

    let convTaskDiv = document.createElement("div");
    convTaskDiv.classList.add("task-div");

    let convTask = document.createElement("li");
    convTask.classList.add("task-li");
    convTaskDiv.setAttribute("id", taskObject.id);
        convTask.appendChild(convTaskDiv);
    if (taskObject.completed===true){ 
        convTask.classList.add("completed-task"); 
    }

    let convCheckbox = document.createElement("input");
    convCheckbox.type = "checkbox";
    convCheckbox.checked = taskObject.completed;

    let convTaskText = document.createElement("p");
    convTaskText.classList.add("task-text");
    convTaskText.textContent = taskObject.text; 

    let convEditBtn = document.createElement("button");
    convEditBtn.classList.add('edit-btn');
    convEditBtn.textContent = "Edit";

    let convDeleteBtn = document.createElement("button");
    convDeleteBtn.classList.add('delete-btn');
    convDeleteBtn.textContent = "Delete";

    let convChecknText = document.createElement("div");
    convChecknText.classList.add("checkntext-div");
    convChecknText.appendChild(convCheckbox);
    convChecknText.appendChild(convTaskText);

        convTaskDiv.appendChild(convChecknText);

    let convButtonDiv = document.createElement("div");
    convButtonDiv.classList.add("button-div");
    convButtonDiv.appendChild(convEditBtn);
    convButtonDiv.appendChild(convDeleteBtn);

        convTaskDiv.appendChild(convButtonDiv);
    
    return convTask;
    }


//EVENT DELEGATION
    tasks.addEventListener("click",(event)=>{

        //Edit Button Code
        if(event.target.tagName==="BUTTON" && event.target.textContent==="Edit"){
        let taskToEdit = event.target.parentElement;
        let textElement = taskToEdit.querySelector("p");
        let textToEdit = textElement.textContent;
        
        popUpInput.value=textToEdit;
        popUp.style.display="flex";

        taskTextSpace = textElement;

        idSelectedTask = taskToEdit.getAttribute("id");
        
        //Delete Button Code below...

        } else if(event.target.tagName==="BUTTON" && event.target.textContent==="Delete"){
            let taskToDelete = event.target.closest('.task-div');
            taskToDelete.remove();
            
            const idSelectedTaskNumber = parseInt(taskToDelete.id);
            tasksArray = tasksArray.filter(taskObject => taskObject.id !== idSelectedTaskNumber);
            contentChecker();
            saveTasksToLocalStorage();

        //Checkbox Code Below...

        } else if(event.target.type==="checkbox"){
            let checkedTask = event.target.parentElement;
            checkedTask.classList.toggle("completed-task");
            const idSelectedTaskNumber = parseInt(checkedTask.id);
            let corrTaskObject = tasksArray.find(taskObject=>taskObject.id=== idSelectedTaskNumber); // finding corresponding taskObject to checked task
            corrTaskObject.completed = event.target.checked;
            saveTasksToLocalStorage();
        } 
    })
    
//CREATE A TASK BY PLUS BUTTON

    plusButton.addEventListener("click", ()=>{
        //New Task
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";
        contentChecker();
});

// CREATE A TASK BY ENTER KEY

input.addEventListener("keydown",(event)=>{
    if(event.key==='Enter'){
        //New Task
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";

        contentChecker();
        
    }
})

//SAVE BUTTON
    saveBtn.addEventListener("click",()=>{
    taskTextSpace.textContent = popUpInput.value;
    popUp.style.display="none";

    let idSelectedTaskNumber = parseInt(idSelectedTask);
    const taskToUpdate = tasksArray.find((currentObject)=>currentObject.id===idSelectedTaskNumber);
    taskToUpdate.text = popUpInput.value;
    taskTextSpace.textContent = popUpInput.value;
    popUp.style.display="none";
    
    saveTasksToLocalStorage();
    })

//CANCEL BUTTON
    cancelBtn.addEventListener("click",()=>{
    popUp.style.display="none";
    })
    



