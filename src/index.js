import "./styles.css";
import todos from "./todos.js";
import projects from "./projects.js";

console.log("Hello World!");
const todoExample = {
    title: "Lava piatti",
    due_date: "2025-02-18",
    priority: "High",
    description: "Fai sti piatti che altrimenti rimangono per sempre nel lavello",
    notes: "Se non lo faccio vengo sfrattato",
    id: "2"
}

let newProject = projects.create("Casa");
console.log(newProject);
newProject.addTodoToProject(todoExample);
console.log(newProject);