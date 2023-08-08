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


console.log("start:");
projectArray[0] = Project("General");
projectArray[1] = Project("Loki");
projectArray[2] = Project("Freya");



projectArray[0].todoArray[0] = toDo("Homework","Finish the To-do Project from the JS Path using vanilla JS, HTML and CSS", "15.07.2023","high");
projectArray[0].todoArray[1] = toDo("Project","Implement xy features", "20.11.2023","low");
projectArray[1].todoArray[0] = toDo("Reading","Read article xzy", "15.11.2024","low");
projectArray[2].todoArray[0] = toDo("Airport pickup","Pick up Odin from the airport", "11.08.2023","high");


displayController.displayProjectList(projectListBox, projectArray);
displayController.updateMainContainer(mainContainer,projectArray[0]);
displayController.highlightCurrentProject(currentProject);




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

createProjectButton.addEventListener("click", function(e) {
    console.log("new project clicked");
    displayController.showProjectModal(contentBox);

    const submitProjectButton = document.getElementById("submit-button");
    submitProjectButton.addEventListener("click", function(e) {
        let projectNameInput = document.getElementById("project-input");
        if(projectNameInput.value === "") {
            showErrorMessage("project");
        }
        else {
        projectArray.push(Project(projectNameInput.value));
        console.log(projectArray);
        currentProject = projectArray.length - 1;
        displayController.displayProjectList(projectListBox, projectArray);
        displayController.updateMainContainer(mainContainer, projectArray[currentProject]);
        displayController.hidePopup();
        console.log("current project index: " + currentProject);
        displayController.highlightCurrentProject(currentProject);
        
        }
    });
});

mainContainer.addEventListener("click",function(e) {
    if(e.target.matches(".delete-button")) {
        if(currentProject > 0) {
            projectArray.splice(currentProject,1);
            console.log(projectArray);
            currentProject = 0;
            displayController.displayProjectList(projectListBox,projectArray);
            displayController.updateMainContainer(mainContainer,projectArray[currentProject]);
            displayController.highlightCurrentProject(currentProject);
        }
    }
});

mainContainer.addEventListener("click",function(e) {
    if(e.target.matches("#add-todo-button")) {
        displayController.showTodoItemModal(contentBox);
        const submitProjectButton = document.getElementById("submit-button");

        submitProjectButton.addEventListener("click", function(e) {
            addTodoItem();
            displayController.hidePopup();
            displayController.updateMainContainer(mainContainer, projectArray[currentProject]);
        });
    }

});

mainContainer.addEventListener("click", function(e) {
    if(e.target.matches("#todo-delete")) {
        let index = parseInt(e.target.dataset.key);
        projectArray[currentProject].todoArray.splice(index,1);
        displayController.updateMainContainer(mainContainer,projectArray[currentProject]);
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
    }


});



function addTodoItem() {
    let inputTitle = document.getElementById("todo-title").value;
    let inputDescription = document.getElementById("todo-description").value;
    let inputDueDate = document.getElementById("todo-date").value;
    let inputPriority = document.getElementById("todo-priority").value;

    let newTodoItem = toDo(inputTitle,inputDescription,inputDueDate,inputPriority);
    projectArray[currentProject].todoArray.push(newTodoItem);
}

function showErrorMessage(element) {
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



