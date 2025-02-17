import todos from "./todos.js";

const project = (newTitle, projectId) => {
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        {id: projectId},
        {
            getTodoID(todo) {
                return todo.id;
            },
            addTodoToProject(newTodo) {
                this.todos[this.getTodoID(newTodo)] = newTodo;
            }
        },
    );
}

const workspace = (newTitle) => {
    return Object.assign(
        {},
        {title: newTitle},
        {projects: {}},
        {
            getProjectID(project) {
                return project.id; 
            },
            addProject(newProject) {
                this.projects[this.getProjectID(newProject)] = newProject;
            },
        },
    )
}

export default {project, workspace};

