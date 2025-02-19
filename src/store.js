import todos from "./todos";

const updateStorage = (element) => {
    localStorage.setItem("workspace", JSON.stringify(element));
};

const retrieveStorage = (key) => {
    let element = JSON.parse(localStorage.getItem(key))
    return element;
}

// rehydration adds methods back to objects extracted from storage
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

    const rehydrateProjects = (workspaceData) => {
        for (const projectKey in workspaceData.projects) {
            workspaceData.projects[projectKey] = rehydrateProject(workspaceData.projects[projectKey]);
        };
        return workspaceData;
    };

    return Object.assign(
        {},
        rehydrateProjects(workspaceData),
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

export default {updateStorage, retrieveStorage, rehydrateWorkspace};