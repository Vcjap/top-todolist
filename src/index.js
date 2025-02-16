import "./styles.css";
import todos from "./todos.js";

console.log("Hello World!");
const todoExample = {
    title: "Lava piatti",
    due_date: "2025-02-18",
    priority: "High",
    description: "Fai sti piatti che altrimenti rimangono per sempre nel lavello",
    notes: "Se non lo faccio vengo sfrattato"
}


let newTodo = todos.create(todoExample);
const latestTodo = todos.edit(newTodo, "title", "Sporca piatti");
console.log(latestTodo);