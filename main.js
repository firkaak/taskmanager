//@ts-ignore
import { updateChart } from './graphDrawer.js';
class Task {
    title;
    description;
    status;
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
    ;
}
;
const TasksArr = [];
const Base_Url = "./tasks.json";
let totalTasks = TasksArr.length;
let doneTasks = 0;
//DOM elements
let title = document.getElementById("taskTitle");
let description = document.getElementById("taskDescription");
let addTaskBtn = document.getElementById('addTaskBtn');
let taskField = document.getElementById("showTasks");
let newTaskField = document.getElementById('newTaskField');
let createTaskBtn = document.getElementById('createTask');
let dateHolder = document.getElementById("date");
//eventListeners
addTaskBtn.addEventListener("click", taskRecorder);
createTaskBtn.addEventListener('click', () => {
    if (newTaskField.style.display === "none") {
        newTaskField.style.display = "block";
    }
    else {
        newTaskField.style.display = "none";
    }
});
settingDate();
function cardCreater(task) {
    let card = document.createElement('div');
    let cardHeader = document.createElement('div');
    cardHeader.setAttribute("class", "card-header");
    cardHeader.innerHTML = task.title;
    let cardBody = document.createElement('div');
    cardBody.setAttribute("class", "card-body");
    let descriptHolder = document.createElement("p");
    descriptHolder.setAttribute("class", "card-text");
    let descriptHtext = document.createTextNode(task.description);
    let statusBtn = document.createElement("button");
    //changing task status
    statusBtn.addEventListener('click', () => {
        statusChange(task);
        updateCard(task);
    });
    //setting initial card according to status
    updateCard(task);
    function updateCard(task) {
        if (task.status == false) {
            card.setAttribute("class", "card text-bg-warning mb-3");
            statusBtn.setAttribute("class", "btn btn-info");
            statusBtn.innerHTML = "due";
        }
        else if (task.status == true) {
            card.setAttribute("class", "card text-bg-light mb-3");
            statusBtn.setAttribute("class", "btn btn-info");
            statusBtn.innerHTML = "";
            statusBtn.innerHTML = "done";
        }
        descriptHolder.append(descriptHtext);
        cardBody.append(descriptHolder);
        cardBody.append(statusBtn);
        card.append(cardHeader);
        card.append(cardBody);
        taskField.append(card);
        totalTasks = TasksArr.length;
        doneTasks = TasksArr.filter(task => task.status).length;
        updateChart(totalTasks, doneTasks);
    }
    taskField.append(card);
}
;
// status changer
function statusChange(task) {
    task.status = !task.status;
}
;
//recording new tasks
function taskRecorder() {
    if (title?.value == "" || title?.value == null || description?.value == "" || description?.value == null) {
        return;
    }
    ;
    let task = new Task(title.value, description.value, false);
    //creating
    TasksArr.unshift(task);
    console.log(TasksArr);
    console.log(TasksArr.length);
    cardCreater(task);
    newTaskField.style.display = "none";
    title.value = "";
    description.value = "";
}
;
//getting date to display:
function settingDate() {
    const date = new Date();
    const myDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    dateHolder.innerHTML = myDate;
}
;
export { totalTasks, doneTasks };
