import todos from "./todos.js";

let idProject = 0;

const project = (newTitle) => {
    let idTodo = 0;
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        {
            // Use the method todos.create defined in todos.js
            addChild(newTodo) {
                this.todos[idTodo] = todos.create(newTodo);
                newTodo["id"] = idTodo;
                idTodo += 1;
            },
            deleteChild(todoID) {
                delete this.todos[todoID];
            }
        },
    );
}

const workspace = (newTitle) => {
    let idProject = 0;
    return Object.assign(
        {},
        {title: newTitle},
        {projects: {}},
        {
            addChild(newProject) {
                this.projects[idProject] = newProject;
                newProject["id"] = idProject;
                idProject += 1;
            },
            deleteChild(projectID) {
                delete this.projects[projectID];
            }
        },
    )
}

export default {project, workspace};

