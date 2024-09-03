

class Project {
    constructor(title, projectID) {
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

}


export { Project, TodoApp };