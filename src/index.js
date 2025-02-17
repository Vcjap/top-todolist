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

let newWorkspace = projects.workspace("Jerry");
console.log("Hi! This is the workspace: ");
console.log(newWorkspace);
let newProject = projects.project("Casa", "1");
console.log("This is the new project: ");
console.log(newProject)
newProject.addTodoToProject(todoExample);
newWorkspace.addProject(newProject);

console.log("This is the workspace with the new project and todo: ");
console.log(newWorkspace);

newProject.deleteTodo(todoExample);
console.log("This is the project after the todo was deleted");
console.log(newProject);

newWorkspace.deleteProject(newProject);
console.log("This is the workspace after the project was deleted");
console.log(newWorkspace);