import {Project} from "./project";
import {toDo} from ".//todo";
import {displayController} from "./displayController";
import "./style.css";

const projectListBox = document.querySelector(".project-list");
const mainContainer = document.querySelector(".main-container");
let projectArray = [];


console.log("start:");
projectArray[0] = Project("Odin");
projectArray[1] = Project("Loki");
projectArray[2] = Project("Freya");



projectArray[0].todoArray[0] = toDo("Homework","Do the coding assignment from TOP", "15.07.2023","high");
projectArray[0].todoArray[1] = toDo("Reading","Read article xzy", "15.11.2024","low");
projectArray[0].todoArray[2] = toDo("Airport pickup","Pick up Odin from the airport", "11.08.2023","high");

displayController.displayProjectList(projectListBox, projectArray);
displayController.displayTodoItems(mainContainer,projectArray[0].todoArray);

projectArray[0].todoArray.forEach(element => {
    console.log(element);
});
