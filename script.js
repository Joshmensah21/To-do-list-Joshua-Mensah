
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
let currentTaskElement;

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

    //EDIT TASK
    
    function editTask(){
        editBtn.addEventListener("click",()=>{
        currentTaskElement = taskTextElement;
        popUpInput.value=currentTaskElement.textContent;
        popUp.style.display="flex";
        
        })
    }
    editTask();
    

    //DELETE TASK
    function deleteTask(){
    let taskList = tasks.querySelectorAll('li:not(.empty-message)');
    deleteBtn.addEventListener("click",()=>{
        newTask.remove();
        contentChecker();
        if(taskList.length === 0){
        emptyMsgSpace.textContent="Empty. Add a new task!";
        emptyMsgSpace.style.display="block";
        }
        
    })
    }   
    
    deleteTask();

    return newTask;
}
        saveBtn.addEventListener("click",()=>{
        currentTaskElement.textContent = popUpInput.value;
        popUp.style.display="none";
        })

        cancelBtn.addEventListener("click",()=>{
        popUp.style.display="none";
        })
    

//ADD A TASK BY PLUS BUTTON
    plusButton.addEventListener("click", ()=>{
        console.log('Add task triggered')
        //New Task
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";
        contentChecker();
});


// ADD A TASK BY ENTER KEY

input.addEventListener("keydown",(event)=>{
    console.log('Add task triggered')
    if(event.key==='Enter'){
        //New Task
        let newTask = createTaskElement(input.value);
        tasks.appendChild(newTask);
        input.value="";
        contentChecker();
        
    }
})

