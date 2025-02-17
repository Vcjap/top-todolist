const createProjectsSidebar = (projects) => {
    const body = document.querySelector(".main");
    
    const sidebar = document.createElement("div");
    
    const title = document.createElement("h3");
    title.textContent = "Projects";

    const projectList = document.createElement("div");
    // addProjectsToSidebar(projects)

    const newProjectBtn = createNewProjectBtn(sidebar);

    sidebar.append(title, projectList, newProjectBtn);
    body.append(sidebar);
};

const addProjectsToSidebar = (projects) => {
    const projectList = document.createElement("div");
    projects.array.forEach(project => {
        const btn = document.createElement("button");
        btn.textContent = projects.title;
        btn.classList.add("project");
        projectList.append(btn);
    });
    return projectList;
};

const createNewProjectBtn = () => {
    const newBtn = document.createElement("button");
    newBtn.textContent = "New Project";
    return newBtn
}

export default {createProjectsSidebar};