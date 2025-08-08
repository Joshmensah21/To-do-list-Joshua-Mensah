//PRACTICE
const nums = [14, 3, 9, 7, 2, 5];;

function bubbleSort(){
    for(let i=0; i<nums.length; i++){
        for(let j=0; j<nums.length-i-1;j++){
            if(nums[j]<nums[j+1]){
                let temp = nums[j]; 
                nums[j] = nums[j+1];
                nums[j+1] = temp;
            }
        }
    }
    return nums;
}

    
console.log(bubbleSort(nums));


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

function renderTasks(tasksToRender){

tasks.innerHTML = ''; 
    tasksToRender.forEach(function(taskObject){
        const retrievedTask = objectToTask(taskObject);
        tasks.appendChild(retrievedTask);
    });

}

function loadTasksFromLocalStorage(){
     const retrievedData = localStorage.getItem('taskList');

    if(retrievedData === null){
        tasksArray = [];
        taskIdCounter = 0;
    } else {
        tasksArray = JSON.parse(retrievedData);
        if(tasksArray.length > 0){
            const arrayOfIds = tasksArray.map(taskObject => taskObject.id);
            const highestIdNum = Math.max(...arrayOfIds);
            taskIdCounter = highestIdNum + 1;
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

    const tasksObject = {
    text: taskText,
    completed: false, 
    id: taskIdCounter
    };
    tasksArray.push(tasksObject);
    console.log(tasksArray);
    console.log(tasksObject.id);

    let newTask = document.createElement("li");
    newTask.classList.add("task-li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    let taskTextElement = document.createElement("p");
    taskTextElement.classList.add("task-text");
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
    console.log(taskDiv.getAttribute("id"));
        newTask.appendChild(taskDiv);

    let checknTextDiv = document.createElement("div");
    checknTextDiv.classList.add("checkntext-div");

    let checknTextDivJr = document.createElement("div");
    checknTextDivJr.classList.add("checkntext-div-jr");
    checknTextDivJr.appendChild(checkbox);
    checknTextDivJr.appendChild(taskTextElement);
    checknTextDiv.appendChild(checknTextDivJr);

        taskDiv.appendChild(checknTextDiv);

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

        taskDiv.appendChild(buttonDiv);

    taskIdCounter++;

    return newTask;
}

function objectToTask (taskObject){

    let convChecknTextDiv = document.createElement("div");
    convChecknTextDiv.classList.add("checkntext-div");

    let convTaskDiv = document.createElement("div");
    convTaskDiv.classList.add("task-div");
    convTaskDiv.appendChild(convChecknTextDiv);

    let convCheckbox = document.createElement("input");
    convCheckbox.type = "checkbox";
    convCheckbox.checked = taskObject.completed;
    convChecknTextDiv.appendChild(convCheckbox);

    let convTaskText = document.createElement("p");
    convTaskText.classList.add("task-text");
    convTaskText.textContent = taskObject.text;
    convChecknTextDiv.appendChild(convTaskText);

    let convChecknTextDivJr = document.createElement("div");
    convChecknTextDivJr.classList.add("checkntext-div-jr");
    convChecknTextDivJr.appendChild(convCheckbox);
    convChecknTextDivJr.appendChild(convTaskText);
    convChecknTextDiv.appendChild(convChecknTextDivJr);

    let convEditBtn = document.createElement("button");
    convEditBtn.classList.add('edit-btn');
    convEditBtn.textContent = "Edit";

    let convDeleteBtn = document.createElement("button");
    convDeleteBtn.classList.add('delete-btn');
    convDeleteBtn.textContent = "Delete";

    let convButtonDiv = document.createElement("div");
    convButtonDiv.classList.add("button-div");
    convButtonDiv.appendChild(convEditBtn);
    convButtonDiv.appendChild(convDeleteBtn);

        convTaskDiv.appendChild(convButtonDiv);

    let convTask = document.createElement("li");
    convTask.classList.add("task-li");
    convTaskDiv.setAttribute("id", taskObject.id);
        convTask.appendChild(convTaskDiv);
console.log("Task ID:", taskObject.id, "Completed status on load:", taskObject.completed); 

    if (taskObject.completed===true){ 
        convChecknTextDiv.classList.toggle("completed-task"); 
        convButtonDiv.classList.toggle("faded-button");
    }
    
    return convTask;
    }


//EVENT DELEGATION
    tasks.addEventListener("click",(event)=>{

        //Edit Button Code
        if(event.target.tagName==="BUTTON" && event.target.textContent==="Edit"){
        let taskToEdit = event.target.closest('.task-div');
        let textElement = taskToEdit.querySelector("p");
        let textToEdit = textElement.textContent;
        
        popUpInput.value=textToEdit;
        
        const editPopUpBox = document.getElementById("edit-pop-up");
        const taskDivBoxInfo = taskToEdit.getBoundingClientRect();
            const offsetX = -5;
            const offsetY = 88;
            
            editPopUpBox.style.top = (taskDivBoxInfo.top + offsetY) + "px";
            editPopUpBox.style.left = (taskDivBoxInfo.left + offsetX) + "px";

        popUp.style.display="flex";

        taskTextSpace = textElement;

        idSelectedTask = taskToEdit.getAttribute("id");
        
            //Delete Button Code below...
        } else if(event.target.tagName==="BUTTON" && event.target.textContent==="Delete"){
        let taskToDelete = event.target.closest('.task-li'); 

        let taskContainId = event.target.closest('.task-div'); 

        taskToDelete.remove(); 

        const idSelectedTaskNumber = parseInt(taskContainId.id);    

        tasksArray = tasksArray.filter(taskObject => {     

        return taskObject.id !== idSelectedTaskNumber    

        });
        
            contentChecker();
            
            saveTasksToLocalStorage();
            

        //Checkbox Code Below...

        } else if(event.target.type==="checkbox"){
    let checknTextDiv = event.target.closest(".checkntext-div");
    let taskDiv = checknTextDiv.parentElement;
    let buttonDiv = taskDiv.querySelector(".button-div");

    checknTextDiv.classList.toggle("completed-task");
    buttonDiv.classList.toggle("faded-button");
    
    const idSelectedTaskNumber = parseInt(taskDiv.id);
    let corrTaskObject = tasksArray.find(taskObject => taskObject.id === idSelectedTaskNumber);

    corrTaskObject.completed = event.target.checked;
    console.log(tasksArray);
    saveTasksToLocalStorage();
}
    })
    
    
//CREATE A TASK BY PLUS BUTTON

    plusButton.addEventListener("click", ()=>{
        if(input.value===""){
            alert("Please type a value");
    } else if(input.value!==""){
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";
        contentChecker();
        saveTasksToLocalStorage();
    }
});

// CREATE A TASK BY ENTER KEY

input.addEventListener("keydown",(event)=>{
    if(input.value==="" && event.key==='Enter'){
        alert("Please type a value");
    } else if(event.key==='Enter'){
        
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";

        contentChecker();
        saveTasksToLocalStorage();
        
    }
})

// SAVE EDITS TO A TASK BY ENTER KEY
popUpInput.addEventListener("keydown",(event)=>{
    if(event.key==='Enter'){
            taskTextSpace.textContent = popUpInput.value;
            popUp.style.display="none";

            let idSelectedTaskNumber = parseInt(idSelectedTask);
            const taskToUpdate = tasksArray.find((currentObject)=>currentObject.id===idSelectedTaskNumber);
            taskToUpdate.text = popUpInput.value;
            taskTextSpace.textContent = popUpInput.value;
            popUp.style.display="none";

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
    
//FILTER FUNCTIONING
    const filterAllTasks = document.getElementById("filter-all");
    const filterCompleted = document.getElementById("filter-completed");
    const filterInProgress = document.getElementById("filter-in-progress");
    const filterIncomplete = document.getElementById("filter-incomplete");
    const filterRecentDel = document.getElementById("filter-recently-deleted");

    filterAllTasks.addEventListener("click",()=>{
       loadTasksFromLocalStorage();
       renderTasks(tasksArray);
    }
    )

    //Completed filter needs all the completed tasks 
    filterCompleted.addEventListener("click",()=>{

         loadTasksFromLocalStorage(); 
         const completedTasks = tasksArray.filter(taskObject => taskObject.completed === true);
         renderTasks(completedTasks); 
        });

    //
    
loadTasksFromLocalStorage();
renderTasks(tasksArray);

