const createProjectsSidebar = (projects) => {
    const body = document.querySelector(".main");
    
    const sidebar = document.createElement("div");
    
    const title = document.createElement("h3");
    title.textContent = "Projects";

    const projectList = addProjectsToSidebar(projects);    

    const newProjectBtn = createNewProjectBtn(sidebar);

    sidebar.append(title, projectList, newProjectBtn);
    body.append(sidebar);
};

const extractProjectName = (projects, key) => {
    return projects[key].title;
}

const extractProjectID = (projects, key) => {
    return projects[key].id;
}

const addProjectsToSidebar = (projects) => {
    const projectList = document.createElement("div");

    for (let key in projects) {
        const btn = document.createElement("button");
        btn.classList.add("project");

        btn.textContent = extractProjectName(projects, key);
        btn.project_id = extractProjectID(projects, key);

        projectList.append(btn);
    }

    return projectList;
};

const createNewProjectBtn = () => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Project";
    return newBtn
}

export default {createProjectsSidebar};