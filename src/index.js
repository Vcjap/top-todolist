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

let newProject1 = projects.project("Casa");
let newProject2 = projects.project("Lavoro");

newProject1.addChild(todoExample1);
newProject1.addChild(todoExample2);
newProject2.addChild(todoExample3);
newWorkspace.addChild(newProject1);
newWorkspace.addChild(newProject2);

dom.displayWorkspace(newWorkspace);