import projects from "./projects";

// Display project list in sidebar
const displayProjectsSidebar = (workspace) => {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const title = document.createElement("h3");
    title.textContent = "Projects";

    const projectList = addProjectsToSidebar(workspace);    
    projectList.classList.add("projects_list")

    const template = {title: {type : "text"}};
    const newProjectBtn = createNewElementBtn(workspace, template, "New Project", workspace);

    sidebar.append(title, projectList, newProjectBtn);

    return sidebar
};

const addProjectsToSidebar = (workspace) => {
    const projectList = document.createElement("div"); //Also create the  container
    const projects = workspace.projects;

    for (let key in projects) {
        const btn = document.createElement("button");
        btn.classList.add("project");

        btn.textContent = projects[key].title;
        btn.project_id = key;

        btn.addEventListener("click", () => {
            displayWorkspace(workspace, projects[key]);
        })

        projectList.append(btn);
    }

    return projectList;
};

// Display project (and todos within)

const displayProjectView = (project, workspace) => {
     const projectView = document.createElement("div");
     projectView.classList.add("project_view");

     const projectHeader = displayProjectHeader(project.title);
     const projectTodos = displayProjectTodos(project, workspace);

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

const displayProjectTodos = (project, workspace) => {
    const container = document.createElement("div");
    container.classList.add("todo_summary");
    const todo_list = project.todos;
    
    for (let todo_id in todo_list) {
        const newTodo = displayTodoSummary(todo_list[todo_id]);
        newTodo.classList.add("project_todo");
        newTodo.todo_id = todo_id;
        newTodo.project_id = project.id;

        const deleteToDoBtn = document.createElement("button");
        deleteToDoBtn.textContent = "Delete Todo";
        deleteToDoBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Otherwise also the "open todo details" event would be triggered
            project.deleteChild(todo_id);
            displayWorkspace(workspace, project);
        });

        const dialog = document.createElement("dialog");
        const template = createTemplate(todo_list[todo_id]);
        newTodo.addEventListener("click", ()=> openDialog(project, template, dialog, workspace, todo_id));
        
        newTodo.append(deleteToDoBtn);
        container.appendChild(newTodo);
    }

    let template = createTemplate(); 
    const newTodoBtn = createNewElementBtn(project, template, "New Todo", workspace); 
    container.appendChild(newTodoBtn);

    return container
}

//TODO: Make createTemplate agnostic to project or todo
const createTemplate = (originObject = null) => { 
    let template = {
        title: {
            type: "text",
            value: ""
        },
        dueDate: {
            type: "date",
            value: ""
        },
        priority: {
            type: "text",
            value: ""
        },
        description: {
            type: "text",
            value: ""
        },
        notes: {
            type: "text",
            value: ""
        },
        completed: {
            type: "boolean",
            value: ""
        },
    };
    
    if (!originObject) return template;

    for (const key in template) {
        template[key].value = originObject[key];
    }
    return template;
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

const createNewElementBtn = (project, template, textContent, workspace) => {
    const newBtn = document.createElement("button");
    newBtn.textContent = textContent;

    const dialog = document.createElement("dialog");
    newBtn.addEventListener("click", () => openDialog(project, template, dialog, workspace));

    return newBtn
}

// Unite the two elements
const displayWorkspace = (workspace, projectToShow) => {
    const body = document.querySelector(".main");
    body.innerHTML = "";

    const sidebar = displayProjectsSidebar(workspace);
    const projectView = displayProjectView(projectToShow || workspace.projects["0"], workspace);
    
    body.append(sidebar);
    body.append(projectView);
}

//Display the form to create a new todo
const openDialog = (project, template, dialog, workspace, toDoID = null) => {
    const body = document.querySelector(".main");

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {removeDialog(dialog, workspace, project)});
    
    const handleSubmit = (newElement) => {
        if (workspace === project) {
            let newProject = projects.project(newElement.title);
            project.addChild(newProject);
            removeDialog(dialog, workspace, newProject);
        } else {
            toDoID ? project.todos[toDoID] = newElement : project.addChild(newElement);
            removeDialog(dialog, workspace, project);
        }
    };

    dialog.append(closeBtn);
    dialog.append(createForm(template, handleSubmit));

    body.append(dialog);
    dialog.showModal();
}

const createForm = (template, onSubmitCallback) => {
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
        newInput.setAttribute("value", template[toDoProperty].value); //If the template comes from an existing note, pre-fill the form values

        newOption.append(newLabel, newInput);
        formProperties.append(newOption);
    }

    const newToDoBtn = document.createElement("button");
    newToDoBtn.textContent = "Create";    
    
    newForm.append(formProperties, newToDoBtn);

    //Decide what happens when submitting the form (create a new element and remove the dialog)
    newForm.onsubmit = (event) => {
        event.preventDefault();
        const newElement = getNewElement(newForm);
        onSubmitCallback(newElement);
    }
    return newForm
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

const removeDialog = (dialog, workspace, projectToShow) => {
    dialog.innerHTML = "";
    dialog.close();
    dialog.remove();
    if (workspace === projectToShow) {projectToShow = workspace.projects["0"]} // if we cancel the form to create a new form, we display the first project of the list
    displayWorkspace(workspace, projectToShow);
}

export default {displayWorkspace};