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
        newTodo.project_id = extractElementID(project);

        const deleteToDoBtn = createDeleteToDoBtn(project, todo_id);
        newTodo.append(deleteToDoBtn);
        container.appendChild(newTodo);
    }

    const newTodoBtn = createNewTodoBtn(project);
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

const createNewTodoBtn = (project) => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Todo";
    
    newBtn.addEventListener("click", () => openNewToDoDialog(project));

    return newBtn
}

const createDeleteToDoBtn = (project, todoID) => {
    const deleteToDoBtn = document.createElement("button");
    deleteToDoBtn.textContent = "Delete Todo";
    deleteToDoBtn.classList.add("deleteToDoBtn");
    
    deleteToDoBtn.addEventListener("click", () => {
        project.deleteTodo(todoID);
        updateProjectView(project);
    })

    return deleteToDoBtn
}

// Unite the two elements
const displayWorkspace = (workspace) => {
    const body = document.querySelector(".main");
    let projects = workspace.projects;
    const sidebar = displayProjectsSidebar(projects);
    const projectView = displayProjectView(projects["0"]);
    
    body.append(sidebar);
    body.append(projectView);
}

//Display the form to create a new todo

const createToDoFormFromTemplate = (project) => {
    const toDoTemplate = {
        title: {
            type: "text"
        },
        due_date: {
            type: "date"
        },
        priority: {
            type: "text"
        },
        description: {
            type: "text"
        },
        notes: {
            type: "text"
        },
        completed: {
            type: "boolean"
        }
    }

    const newForm = createToDoForm(toDoTemplate, project);
    return newForm;
}

const createToDoForm = (toDoTemplate, project) => {
    // Create form container and header
    const newForm = document.createElement("form");
    newForm.classList.add("newToDoForm");

    const formHeader = document.createElement("div");
    formHeader.classList.add("formHeader");
    
    const formTitle = document.createElement("h2");
    formTitle.textContent = "New todo"

    const dialogCloseBtn = createDialogCloseBtn();

    formHeader.append(formTitle, dialogCloseBtn);

    // Create properties
    const formProperties = document.createElement("div");
    formProperties.classList.add("formProperties");
    for (const toDoProperty in toDoTemplate) {
        const newOption = document.createElement("div");
        newOption.classList.add("formOption");

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", `${toDoProperty}`);
        newLabel.textContent= `${toDoProperty}`;

        const newInput = document.createElement("input");
        newInput.setAttribute("name", `${toDoProperty}`);
        newInput.setAttribute("id", `${toDoProperty}`);
        newInput.setAttribute("required","");
        newInput.setAttribute("type", toDoTemplate[toDoProperty].type) // I can specify it in the template, so the info is taken from there!!
        
        newOption.append(newLabel, newInput);
        formProperties.append(newOption);
    }

    const formNewToDoBtn = createFormNewToDoBtn(toDoTemplate, project);

    newForm.append(formHeader, formProperties, formNewToDoBtn);

    return newForm
}

const openNewToDoDialog = (project) => {
    const newDialog = document.createElement("dialog");
    newDialog.append(createToDoFormFromTemplate(project));

    const body = document.querySelector(".main");
    body.append(newDialog);

    newDialog.showModal();
}

const createDialogCloseBtn = () => {
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("dialogCloseBtn");

    closeBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Needed to prevent form to try and send something
        closeDialog(); //If the dialog is not removed, the website will keep using the old one
    })

    return closeBtn
}

const closeDialog = () => {
    const dialog = document.querySelector("dialog");
    dialog.remove();
}

const createFormNewToDoBtn = (toDoTemplate, project) => {
    const formNewToDoBtn = document.createElement("button");
    formNewToDoBtn.textContent = "Create todo";
    formNewToDoBtn.classList.add("formNewToDoBtn");

    formNewToDoBtn.addEventListener("click", (event) => {
        console.log("Create new todo");
        event.preventDefault();
        const newToDo = getNewToDo(toDoTemplate);
        project.addTodoToProject(newToDo);
        closeDialog();
        updateProjectView(project);
    });

    return formNewToDoBtn
}

const getNewToDo = (toDoTemplate) => {
    let newToDo = {};
    // Based on the todotemplate (that we used to create the form), we get the values from the form
    // and use them to populate the new todo
    for (const property in toDoTemplate) {
        newToDo[property] = document.querySelector(`.formOption #${property}`).value
    }

    return newToDo
}

export default {displayWorkspace};