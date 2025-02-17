import todos from "./todos.js";

let idProject = 0;

const getID = (element) => {
    return element.id;
}

const project = (newTitle) => {
    let idTodo = 0;
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        {
            addTodoToProject(newTodo) {
                this.todos[idTodo] = newTodo;
                idTodo += 1;
            },
            deleteTodo(todoID) {
                delete this.todos[todoID];
            }
        },
        getID,
    );
}

const workspace = (newTitle) => {
    let idProject = 0;
    return Object.assign(
        {},
        {title: newTitle},
        {projects: {}},
        {
            addProject(newProject) {
                this.projects[idProject] = newProject;
                idProject += 1;
            },
            deleteProject(projectID) {
                delete this.projects[projectID];
            }
        },
        getID,
    )
}

export default {project, workspace};

