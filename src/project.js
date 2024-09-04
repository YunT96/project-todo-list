

class Project {
    constructor(title, projectID, todos = []) {
        this.title = title;
        this.todos = [];
        this.projectID = projectID;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
    }

    getAllTodos() {
        return this.todos;
    }
    getActiveTodo() {
        return this.todos.find(todo => todo.isActive);
    }

}

class TodoApp {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        this.projects = this.projects.filter((p) => p !== project);
    }
    getAllProjects() {
        return this.projects;
    }
    getProjectByID(projectID) {
        return this.projects[projectID];
    }
    setActiveProject(project) {
        this.activeProject = project;
    }
    getActiveProject() {
        return this.activeProject;
    }
    saveProjectsToLocalStorage() {
        const projectsWithTodos = this.projects.map(project => {
            return {
                title: project.title,
                projectID: project.projectID,
                todos: project.todos
            };
        });
        localStorage.setItem('projects', JSON.stringify(projectsWithTodos));
    }

    loadProjectsFromLocalStorage() {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const projectsWithTodos = JSON.parse(storedProjects);
            this.projects = projectsWithTodos.map(project => {
                return new Project(project.title, project.projectID, project.todos);
            });
        }
    }
}


export { Project, TodoApp };