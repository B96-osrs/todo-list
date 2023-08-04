import {Project} from "./project";
import {toDo} from ".//todo";
import "./style.css";


console.log("start:");
let myProject = Project("Odin");

console.log(myProject.name);
console.log(myProject.todoArray);

myProject.todoArray[0] = toDo("Homework","Do the coding assignment from TOP", "15.07.2023","high");
myProject.todoArray[1] = toDo("Reading","Read article xzy", "15.11.2024","low");
myProject.todoArray[2] = toDo("Airport pickup","Pick up Odin from the airport", "11.08.2023","high");

myProject.todoArray.forEach(element => {
    console.log(element);
});
