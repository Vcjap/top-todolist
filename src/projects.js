import todos from "./todos.js";

const project = (newTitle) => {
    let idTodo = 0;
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        // {lastID: 0},
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

const rehydrateProject = (projectData) => {
    let idTodo = Math.max(...Object.keys(projectData.todos).map(Number), -1) + 1;
    return Object.assign(
        {},
        projectData,
        {
            addChild(newTodo) {
                this.todos[idTodo] = todos.create(newTodo);
                newTodo["id"] = idTodo;
                idTodo += 1;
            },
            deleteChild(todoID) {
                delete this.todos[todoID];
            }
        }
    );
}

const rehydrateWorkspace = (workspaceData) => {
    let idProject = Math.max(...Object.keys(workspaceData.projects).map(Number), -1) + 1;
    return Object.assign(
        {},
        workspaceData,
        {
            addChild(newProject) {
                this.projects[idProject] = newProject;
                newProject["id"] = idProject;
                idProject += 1;
            },
            deleteChild(projectID) {
                delete this.projects[projectID];
            }
        }
    );
}

export default {project, workspace, rehydrateProject, rehydrateWorkspace};

