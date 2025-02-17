import "./styles.css";
import todos from "./todos.js";
import projects from "./projects.js";
import dom from "./dom.js";

console.log("Hello World!");
const todoExample = {
    title: "Lava piatti",
    due_date: "2025-02-18",
    priority: "High",
    description: "Fai sti piatti che altrimenti rimangono per sempre nel lavello",
    notes: "Se non lo faccio vengo sfrattato",
    completed: false,
}

let newWorkspace = projects.workspace("Jerry");
console.log("Hi! This is the workspace: ");
console.log(newWorkspace);

let newProject = projects.project("Casa");
console.log("This is the new project: ");
console.log(newProject)

newProject.addTodoToProject(todoExample);
newWorkspace.addProject(newProject);
newWorkspace.addProject(projects.project("Lavoro"));

console.log("This is the workspace with the new project and todo: ");
console.log(newWorkspace);

// newWorkspace.deleteProject(0);
// console.log("This is the workspace after the project was deleted");
// console.log(newWorkspace);

newWorkspace.projects["0"].todos["0"].updateTitle("Lava piatti in lavatric");
console.log(newWorkspace.projects["0"].todos["0"]);

dom.displayProjectsSidebar(newWorkspace.projects);
dom.displayProjectView(newWorkspace.projects["0"]);