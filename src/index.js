import {Project} from "./project";
import {toDo} from ".//todo";
import {displayController} from "./displayController";
import "./style.css";
const contentBox = document.querySelector(".content");
const projectListBox = document.querySelector(".project-list");
const mainContainer = document.querySelector(".main-container");
const createProjectButton = document.getElementById("project-button");
let projectArray = [];
let currentProject = 0;

if(localStorage.length < 1) {
    loadExampleProjects();
    updateLocalStorage();
}
loadProjectsFromLocalStorage();

if(projectArray.length > 0) {
    console.log(projectArray.length);
    displayController.displayProjectList(projectListBox, projectArray);
    displayController.updateMainContainer(mainContainer,projectArray[0]);
    displayController.highlightCurrentProject(currentProject);  
}





window.addEventListener("click",function(e) {
    if(e.target.matches(".project")) {
        let num = parseInt(e.target.dataset.key);
        displayController.updateMainContainer(mainContainer,projectArray[num]);
        console.log("xyz: " + projectArray[currentProject]);
        currentProject = num;
        console.log("current project index: " + currentProject);
        displayController.highlightCurrentProject(currentProject);
    }
});

createProjectButton.addEventListener("click", function(e) { //eventlistener for new project button
    displayController.showProjectModal(contentBox);
    displayController.blurBackground(mainContainer,"blur");

    const submitProjectButton = document.getElementById("submit-button");
    submitProjectButton.addEventListener("click", function(e) {
        let projectNameInput = document.getElementById("project-input");
        if(projectNameInput.value === "") {
            showErrorMessage("project");
        }
        else {
        projectArray.push(Project(projectNameInput.value));
        updateLocalStorage();
        console.log(projectArray);
        currentProject = projectArray.length - 1;
        displayController.displayProjectList(projectListBox, projectArray);
        displayController.updateMainContainer(mainContainer, projectArray[currentProject]);
        displayController.hidePopup();
        displayController.highlightCurrentProject(currentProject);
        displayController.blurBackground(mainContainer,"noblur");
        }
    });
});

mainContainer.addEventListener("click",function(e) { //delete a project
    if(e.target.matches(".delete-button")) {
        if(currentProject > 0) {
            projectArray.splice(currentProject,1);
            console.log(projectArray);
            currentProject = 0;
            displayController.displayProjectList(projectListBox,projectArray);
            displayController.updateMainContainer(mainContainer,projectArray[currentProject]);
            displayController.highlightCurrentProject(currentProject);
            updateLocalStorage();
        }
    }
});

mainContainer.addEventListener("click",function(e) { // add todo-item
    if(e.target.matches("#add-todo-button")) {
        displayController.showTodoItemModal(contentBox);
        displayController.blurBackground(mainContainer,"blur");
        const submitProjectButton = document.getElementById("submit-button");

        submitProjectButton.addEventListener("click", function(e) {
                addTodoItem();
                displayController.hidePopup();
                displayController.updateMainContainer(mainContainer, projectArray[currentProject]);
                updateLocalStorage();
                displayController.blurBackground(mainContainer,"noblur");           
        });
    }
});

mainContainer.addEventListener("click", function(e) { 
    if(e.target.matches("#todo-delete")) { // delete a todo item
        let index = parseInt(e.target.dataset.key);
        projectArray[currentProject].todoArray.splice(index,1);
        displayController.updateMainContainer(mainContainer,projectArray[currentProject]);
        updateLocalStorage();
    }
    else if(e.target.matches("#todo-check")) {
        let index = parseInt(e.target.dataset.key);
        if((projectArray[currentProject].todoArray[index].checkBox).toString() === "false") {
            projectArray[currentProject].todoArray[index].checkBox = "true";
        }
        else {
            projectArray[currentProject].todoArray[index].checkBox = "false";
        }
        displayController.updateMainContainer(mainContainer,projectArray[currentProject]);
        updateLocalStorage();
    }


});



function addTodoItem() {
    let inputTitle = document.getElementById("todo-title").value;
    if(inputTitle.toString() < 1) {
        inputTitle = `Title ${projectArray[currentProject].todoArray.length + 1}`;
    }
    let inputDescription = document.getElementById("todo-description-input").value;
    if(inputDescription.toString() < 1) {
        inputDescription = `Description ${projectArray[currentProject].todoArray.length + 1}`;
    }
    let inputDueDate = document.getElementById("todo-date").value;
    let inputPriority = document.getElementById("todo-priority").value;

    let newTodoItem = toDo(inputTitle,inputDescription,inputDueDate,inputPriority);
    projectArray[currentProject].todoArray.push(newTodoItem);
}

function showErrorMessage(element) { //error message for creating project/todo
    let modal = document.querySelector(".project-form");
    let errorMessage = document.createElement("div");
    errorMessage.setAttribute("style", "font-size: 0.8em; color:#ff0000;");
    if(element === "project") {
        errorMessage.textContent = "Please enter Project Name";
    }

    else if(element === "todo") {
        errorMessage.textContent = "Please fill out all fields";
    }
    else {
        errorMessage.textContent = "Error";
    }
    modal.appendChild(errorMessage);
}

function loadProjectsFromLocalStorage() {
        let itemToConvert = localStorage.getItem(localStorage.key("projectArray"));
        projectArray = JSON.parse(itemToConvert);
}

function updateLocalStorage() {
    localStorage.clear();
    if(projectArray.length > 0) {
            localStorage.setItem("projectArray", JSON.stringify(projectArray));
    }  
}

function loadExampleProjects() {
    projectArray[0] = Project("General");
    projectArray[1] = Project("Project-1");
    projectArray[2] = Project("Project-2");
    
    //example projects and todo items, only loaded if localstorage is empty
    
    projectArray[0].todoArray[0] = toDo("Homework","Finish the To-do Project from the JS Path using vanilla JS, HTML and CSS", "23-04-05","high");
    projectArray[0].todoArray[1] = toDo("Project","Read some articles on when to use Flexbox over Grid", "23-06-05","low");
    projectArray[0].todoArray[2] = toDo("Assignment","Do all the exercises for the Lesson about OOP", "23-04-11","low");
    projectArray[1].todoArray[0] = toDo("Reading","Read article xzy and then write a blog about asdf", "23-04-12","low");
    projectArray[2].todoArray[0] = toDo("Airport pickup","Pick up Odin from the airport at 16:15 local time", "23-04-08","high");
}
