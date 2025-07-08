
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
    newTask.setAttribute("id",taskIdCounter);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    newTask.appendChild(checkbox);

    let taskTextElement = document.createElement("p");
    taskTextElement.textContent = taskText;
    taskTextElement.style.display = "inline";
    newTask.appendChild(taskTextElement);

    let editBtn = document.createElement("button");
    editBtn.textContent="Edit";
    newTask.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete";
    newTask.appendChild(deleteBtn);

    const tasksObject = {
    text: taskText,
    completed: false, 
    id: taskIdCounter
    };
    tasksArray.push(tasksObject);
    console.log(tasksArray);

    taskIdCounter++;

    //EDIT TASK
    
    function editTask(){
        editBtn.addEventListener("click",()=>{
        taskTextSpace = taskTextElement;
        popUpInput.value=taskTextSpace.textContent;
        popUp.style.display="flex";
        
        const selectedTask = editBtn.parentElement;
        idSelectedTask = selectedTask.getAttribute("id");
        
        })
    }
    editTask();
    
    //CHECK OFF TASK
    checkbox.addEventListener("click", ()=>{
        const currentTask = checkbox.parentElement;
        const idSelectedTask = currentTask.getAttribute("id");
        const idSelectedTaskNumber = parseInt(idSelectedTask);
        const taskTicked = tasksArray.find((currentObject)=>currentObject.id===idSelectedTaskNumber);
        if(checkbox.checked===true){
            taskTicked.completed=true;
    //UNCHECKED TASK
        } else if(checkbox.checked===false){
            taskTicked.completed=false;
        }
        console.log(taskTicked);
    })

    //DELETE TASK

    function deleteTask(){
    let taskList = tasks.querySelectorAll('li:not(.empty-message)');
    deleteBtn.addEventListener("click",()=>{
        newTask.remove();
        contentChecker();

        if(taskList.length === 0){
        emptyMsgSpace.textContent="Empty. Add a new task!";
        emptyMsgSpace.style.display="block";
        tasksArray.splice(0,1);
        }
        
    })
    }   
    
    deleteTask();

    return newTask;

}

function objectToTask (taskObject){
    let convTask = document.createElement("li");

    let convCheckbox = document.createElement("input");
    convCheckbox.type = "checkbox";
    convCheckbox.checked = taskObject.completed;
    convTask.appendChild(convCheckbox);

    let convTaskText = document.createElement("p");
    convTaskText.textContent = taskObject.text; 
    convTask.appendChild(convTaskText);

    let convEditBtn = document.createElement("button");
    convEditBtn.textContent = "Edit";
    convTask.appendChild(convEditBtn);

    let convDeleteBtn = document.createElement("button");
    convDeleteBtn.textContent = "Delete";
    convTask.appendChild(convDeleteBtn);

    //CHECKBOX LISTENER
    convCheckbox.addEventListener("click", ()=>{
        const currentTask = convCheckbox.parentElement;
        const idSelectedTask = currentTask.getAttribute("id");
        const idSelectedTaskNumber = parseInt(idSelectedTask);
        const taskTicked = tasksArray.find((taskObject)=>taskObject.id===idSelectedTaskNumber);
        taskTicked.completed = convCheckbox.checked;
        console.log(taskTicked);
    })
    
    //EDIT LISTENER
        convEditBtn.addEventListener("click",()=>{
        popUpInput.value = convTaskText.textContent;
        popUp.style.display="flex";
        
        const selectedConvTask = convEditBtn.parentElement;
        idSelectedConvTask = selectedConvTask.getAttribute("id");
        
        })
    }

    //DELETE LISTENER

    deleteBtn.addEventListener("click",()=>{
        const currentTask = convDeleteBtn.parentElement;
        const idSelectedTask = currentTask.getAttribute("id");
        const idSelectedTaskNumber = parseInt(idSelectedTask);
        const arrayAfterDel = tasksArray.filter((taskObject)=> taskObject.id!==idSelectedTaskNumber);
        tasksArray = arrayAfterDel;
        const arrayAfterDelString = JSON.stringify(arrayAfterDel);
        localStorage.setItem("updatedArray",arrayAfterDelString);

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

    //const matchedId = tasksArray.find(tasksObject.id===idSelectedTask);
    
    })

//CANCEL BUTTON
    cancelBtn.addEventListener("click",()=>{
    popUp.style.display="none";
    })
    



