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
projectArray[0] = Project("Odin");
projectArray[1] = Project("Loki");
projectArray[2] = Project("Freya");



projectArray[0].todoArray[0] = toDo("Homework","Do the coding assignment from TOP", "15.07.2023","high");
projectArray[0].todoArray[1] = toDo("Project","Implement xy features", "20.11.2023","high");
projectArray[1].todoArray[0] = toDo("Reading","Read article xzy", "15.11.2024","low");
projectArray[2].todoArray[0] = toDo("Airport pickup","Pick up Odin from the airport", "11.08.2023","high");


displayController.displayProjectList(projectListBox, projectArray);
displayController.displayProjectHeader(mainContainer,projectArray[0]);
displayController.displayTodoItems(mainContainer,projectArray[0]);





window.addEventListener("click",function(e) {
    if(e.target.matches(".project")) {
        let num = parseInt(e.target.dataset.key);
        displayController.clearCurrentProject(mainContainer);
        displayController.displayProjectHeader(mainContainer,projectArray[num]);
        displayController.displayTodoItems(mainContainer,projectArray[num]);
        currentProject = num;
        console.log("current project index: " + currentProject);
    }
});

createProjectButton.addEventListener("click", function(e) {
    console.log("new project clicked");
    displayController.showProjectModal(contentBox);

    const submitProjectButton = document.getElementById("submit-button");
    submitProjectButton.addEventListener("click", function(e) {
        let projectNameInput = document.getElementById("project-input");
        if(projectNameInput.value === "") {
            console.log("empty field");
        }
        else {
        projectArray.push(Project(projectNameInput.value));
        console.log(projectArray);
        currentProject = projectArray.length - 1;
        displayController.clearCurrentProject(mainContainer);
        displayController.displayProjectList(projectListBox, projectArray);
        displayController.displayProjectHeader(mainContainer, projectArray[currentProject]);
        displayController.displayTodoItems(mainContainer,projectArray[currentProject]);
        displayController.hideProjectModal();
        console.log("current project index: " + currentProject);
        
        }
    });
});

mainContainer.addEventListener("click",function(e) {
    if(e.target.matches(".delete-button")) {
        projectArray.splice(currentProject,1);
        console.log(projectArray);
        currentProject = 0;
        displayController.clearCurrentProject(mainContainer);
        displayController.displayProjectList(projectListBox,projectArray);
        displayController.displayProjectHeader(mainContainer, projectArray[currentProject]);
        displayController.displayTodoItems(mainContainer,projectArray[currentProject]);
    }
});

