const body = document.querySelector(".main");

// Display project list in sidebar
const displayProjectsSidebar = (projects) => {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const title = document.createElement("h3");
    title.textContent = "Projects";

    const projectList = addProjectsToSidebar(projects);    

    const newProjectBtn = createNewProjectBtn(sidebar);

    sidebar.append(title, projectList, newProjectBtn);
    body.append(sidebar);
};

const extractElementTitle = (element) => {
    return element.title;
}

const extractElementID = (element) => {
    return element.id;
}

const addProjectsToSidebar = (projects) => {
    const projectList = document.createElement("div"); //Also create the  container

    for (let key in projects) {
        const btn = document.createElement("button");
        btn.classList.add("project");

        btn.textContent = extractElementTitle(projects[key]);
        btn.project_id = extractElementID(projects[key]);

        projectList.append(btn);
    }

    return projectList;
};

const createNewProjectBtn = () => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Project";
    return newBtn
}

// Display project (and todos within)
const displayProjectView = (project) => {
     const projectView = document.createElement("div");
     projectView.classList.add("project_view");

     const projectHeader = displayProjectHeader(project.title);
     const projectTodos = displayProjectTodos(project);

     projectView.append(projectHeader, projectTodos);
     body.append(projectView);
}

const displayProjectHeader = (projectTitle) => {
    const container = document.createElement("div");
    container.classList.add("project_header");

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = projectTitle;

    container.append(projectTitle);
    return container
}

const displayProjectTodos = (project) => {
    container = document.createElement("div");
    container.classList.add("project_todos");
    
    for (let todo in project) {
        const newTodo = displayTodoSummary(todo);
        newTodo.classList.add("project_todo");
        newTodo.todo_id = extractElementID(todo);

        container.appendChild(newTodo);
    }
    return container
}

const displayTodoSummary = (todo) => {

}

export default {displayProjectsSidebar, displayProjectView};