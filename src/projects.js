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
            deleteTodo(todoToDelete) {
                delete this.todos[getID(todoToDelete)];
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
            deleteProject(projectToDelete) {
                delete this.projects[getID(projectToDelete)];
            }
        },
        getID,
    )
}

export default {project, workspace};

