import todos from "./todos.js";

const getID = (element) => {
    return element.id;
}

const project = (newTitle, projectId) => {
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        {id: projectId},
        {
            addTodoToProject(newTodo) {
                this.todos[getID(newTodo)] = newTodo;
            },
            deleteTodo(todoToDelete) {
                delete this.todos[getID(todoToDelete)];
            }
        },
        getID,
    );
}

const workspace = (newTitle) => {
    return Object.assign(
        {},
        {title: newTitle},
        {projects: {}},
        {
            addProject(newProject) {
                this.projects[getID(newProject)] = newProject;
            },
            deleteProject(projectToDelete) {
                delete this.projects[getID(projectToDelete)];
            }
        },
        getID,
    )
}

export default {project, workspace};

