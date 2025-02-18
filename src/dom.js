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

const addProjectsToSidebar = (projects) => {
    const projectList = document.createElement("div"); //Also create the  container

    for (let key in projects) {
        const btn = document.createElement("button");
        btn.classList.add("project");

        btn.textContent = projects[key].title;
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
        newTodo.todo_id = todo_id;
        newTodo.project_id = project.id;

        const deleteToDoBtn = createDeleteToDoBtn(project, todo_id); // To refactor into a more abstract "delete" function
        newTodo.append(deleteToDoBtn);
        container.appendChild(newTodo);
    }

    const newTodoBtn = createNewTodoBtn(project); // To refactor into a "create" button
    container.appendChild(newTodoBtn);

    return container
}

const displayTodoSummary = (todo) => {
    const container = document.createElement("div");

    const todoTitle = todo.title;
    const todoDueDate = todo.dueDate;

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

    const template = {
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
    };

    const dialog = document.createElement("dialog");
    newBtn.addEventListener("click", () => openDialog(project, template, dialog));

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

const createForm = (project, template, dialog) => {
    // Create form container and header
    const newForm = document.createElement("form");
    newForm.classList.add("newToDoForm");

    // Create properties
    const formProperties = document.createElement("div");
    formProperties.classList.add("formProperties");
    for (const toDoProperty in template) {
        const newOption = document.createElement("div");
        newOption.classList.add("formOption");

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", `${toDoProperty}`);
        newLabel.textContent= `${toDoProperty}`;

        const newInput = document.createElement("input");
        newInput.setAttribute("name", `${toDoProperty}`);
        newInput.setAttribute("id", `${toDoProperty}`);
        newInput.setAttribute("required","");
        newInput.setAttribute("type", template[toDoProperty].type) // I can specify it in the template, so the info is taken from there!!
        
        newOption.append(newLabel, newInput);
        formProperties.append(newOption);
    }

    const newToDoBtn = document.createElement("button");
    newToDoBtn.textContent = "Create";    
    
    newForm.append(formProperties, newToDoBtn);

    //Decide what happens when submitting the form (create a new element and remove the dialog)
    newForm.onsubmit = function (event) {
        event.preventDefault();
        const newToDo = getNewElement(newForm);
        project.addTodoToProject(newToDo);
        removeDialog(dialog);
        updateProjectView(project);
    }
    return newForm
}

const openDialog = (project, template, dialog) => {
    const body = document.querySelector(".main");

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
        removeDialog(dialog)
    });
    
    dialog.append(closeBtn);
    dialog.append(createForm(project, template, dialog));

    body.append(dialog);
    dialog.showModal();
}

const getNewElement = (form) => {
    let newTodo = {};
    Array.from(form.elements).forEach(element => {
        if (element.name) {
          newTodo[element.name] = element.value;
        }
      });
    
    return newTodo
}

const removeDialog = (dialog) => {
    dialog.innerHTML = "";
    dialog.close();
    dialog.remove();
}

export default {displayWorkspace};