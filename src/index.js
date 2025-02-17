import "./styles.css";
import todos from "./todos.js";
import projects from "./projects.js";
import dom from "./dom.js";

console.log("Hello World!");
const todoExample1 = {
    title: "Lava piatti",
    due_date: "2025-02-18",
    priority: "High",
    description: "Fai sti piatti che altrimenti rimangono per sempre nel lavello",
    notes: "Se non lo faccio vengo sfrattato",
    completed: false,
}
const todoExample2 = {
    title: "Pulisci salotto",
    due_date: "2025-02-10",
    priority: "Low",
    description: "Tutto il salotto deve essere pulito, pure le superfici",
    notes: "N/A",
    completed: false,
}
const todoExample3 = {
    title: "Termina pratica Sorgotti",
    due_date: "2025-04-10",
    priority: "Medium",
    description: "Terminare la pratica sub a e sub b",
    notes: "N/A",
    completed: false,
}

let newWorkspace = projects.workspace("Jerry");
// console.log("Hi! This is the workspace: ");
// console.log(newWorkspace);

let newProject1 = projects.project("Casa");
let newProject2 = projects.project("Lavoro");
// console.log("This is the new project: ");
// console.log(newProject)

newProject1.addTodoToProject(todoExample1);
newProject1.addTodoToProject(todoExample2);
newProject2.addTodoToProject(todoExample3);
newWorkspace.addProject(newProject1);
newWorkspace.addProject(newProject2);

// console.log("This is the workspace with the new project and todo: ");
// console.log(newWorkspace);

// newWorkspace.deleteProject(0);
// console.log("This is the workspace after the project was deleted");
// console.log(newWorkspace);

// newWorkspace.projects["0"].todos["0"].updateTitle("Lava piatti in lavatric");
// console.log(newWorkspace.projects["0"].todos["0"]);

// dom.displayProjectsSidebar(newWorkspace.projects);
// dom.displayProjectView(newWorkspace.projects["0"]);
dom.displayWorkspace(newWorkspace);
