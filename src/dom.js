// Display project list in sidebar
const displayProjectsSidebar = (projects) => {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const title = document.createElement("h3");
    title.textContent = "Projects";

    const projectList = addProjectsToSidebar(projects);    
    projectList.classList.add("projects_list")

    const newProjectBtn = createNewProjectBtn(sidebar);

    sidebar.append(title, projectList, newProjectBtn);

    return sidebar
};

const extractElementTitle = (element) => {
    return element.title;
}

const extractElementID = (element) => {
    return element.id;
}

const extractElementDueDate = (element) => {
    return element.dueDate;
}

const extractElementPriority = (element) => {
    return element.priority;
}

const extractElementDescription = (element) => {
    return element.description;
}

const extractElementNotes = (element) => {
    return element.notes;
}

const extractElementCompleted = (element) => {
    return element.completed;
}

const addProjectsToSidebar = (projects) => {
    const projectList = document.createElement("div"); //Also create the  container

    for (let key in projects) {
        const btn = document.createElement("button");
        btn.classList.add("project");

        btn.textContent = extractElementTitle(projects[key]);
        btn.project_id = key;

        btn.addEventListener("click", () => updateProjectView(projects[btn.project_id]));

        projectList.append(btn);
    }

    return projectList;
};

const createNewProjectBtn = () => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Project";
    return newBtn
}

const updateProjectView = (newProject) => {
    const body = document.querySelector(".main");
    const oldProjectView = document.querySelector(".project_view");
    oldProjectView.remove();
    const newProjectView = displayProjectView(newProject);
    body.append(newProjectView);
}

// Display project (and todos within)

// const projectView = () => {
//     return Object.assign(
//         {},
//         {
//             displayProjectView(project) {
//                 const projectView = document.createElement("div");
//                 projectView.classList.add("project_view");
           
//                 const projectHeader = displayProjectHeader(project.title);
//                 const projectTodos = displayProjectTodos(project);
           
//                 projectView.append(projectHeader, projectTodos);
//                 body.append(projectView);
//             },
//             displayProjectHeader(projectTitle) {
//                 const container = document.createElement("div");
//                 container.classList.add("project_header");
            
//                 const displayTitle = document.createElement("h2");
//                 displayTitle.textContent = projectTitle;
            
//                 container.append(displayTitle);
//                 return container;
//             },
//             displayProjectTodos(project) {
//                 const container = document.createElement("div");
//                 container.classList.add("todo_summary");
//                 const todo_list = project.todos;
                
//                 for (let todo_id in todo_list) {
//                     const newTodo = displayTodoSummary(todo_list[todo_id]);
//                     newTodo.classList.add("project_todo");
//                     newTodo.todo_id = extractElementID(todo_list[todo_id]);
            
//                     container.appendChild(newTodo);
//                 }
            
//                 const newTodoBtn = createNewTodoBtn();
//                 container.appendChild(newTodoBtn);
            
//                 return container;
//             },
//             displayTodoSummary(todo) {
//                 const container = document.createElement("div");
            
//                 const todoTitle = extractElementTitle(todo);
//                 const todoDueDate = extractElementDueDate(todo);
            
//                 const displayDueDate = document.createElement("div");
//                 displayDueDate.textContent = todoDueDate;
//                 displayDueDate.classList.add("duedate");
            
//                 const displayTitle = document.createElement("div");
//                 displayTitle.textContent = todoTitle;
//                 displayTitle.classList.add("title");
            
//                 container.append(displayDueDate, displayTitle);
            
//                 return container;
//             },
//             createNewTodoBtn() {
//                 const newBtn = document.createElement("button");
//                 newBtn.textContent = "New Todo";
//                 return newBtn;
//             }
//         }
//     )
// }

const displayProjectView = (project) => {
     const projectView = document.createElement("div");
     projectView.classList.add("project_view");

     const projectHeader = displayProjectHeader(project.title);
     const projectTodos = displayProjectTodos(project);

     projectView.append(projectHeader, projectTodos);

     return projectView
}

const displayProjectHeader = (projectTitle) => {
    const container = document.createElement("div");
    container.classList.add("project_header");

    const displayTitle = document.createElement("h2");
    displayTitle.textContent = projectTitle;

    container.append(displayTitle);
    return container
}

const displayProjectTodos = (project) => {
    const container = document.createElement("div");
    container.classList.add("todo_summary");
    const todo_list = project.todos;
    
    for (let todo_id in todo_list) {
        const newTodo = displayTodoSummary(todo_list[todo_id]);
        newTodo.classList.add("project_todo");
        newTodo.todo_id = extractElementID(todo_list[todo_id]);

        container.appendChild(newTodo);
    }

    const newTodoBtn = createNewTodoBtn();
    container.appendChild(newTodoBtn);

    return container
}

const displayTodoSummary = (todo) => {
    const container = document.createElement("div");

    const todoTitle = extractElementTitle(todo);
    const todoDueDate = extractElementDueDate(todo);

    const displayDueDate = document.createElement("div");
    displayDueDate.textContent = todoDueDate;
    displayDueDate.classList.add("duedate");

    const displayTitle = document.createElement("div");
    displayTitle.textContent = todoTitle;
    displayTitle.classList.add("title");

    container.append(displayDueDate, displayTitle);

    return container
}

const createNewTodoBtn = () => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Todo";
    return newBtn
}

// Unite the two elements
const displayWorkspace = (workspace) => {
    const body = document.querySelector(".main");

    const sidebar = displayProjectsSidebar(workspace.projects);
    const projectView = displayProjectView(workspace.projects["0"]);
    
    body.append(sidebar);
    body.append(projectView);

}

export default {displayWorkspace};