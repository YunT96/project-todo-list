import { Todo } from "./todo.js";

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
    saveToLocalStorage() {
        const serializedData = JSON.stringify(this);
        localStorage.setItem('todoAppData', serializedData);
    }

    loadFromLocalStorage() {
        const serializedData = localStorage.getItem('todoAppData');
        if (serializedData) {
            const data = JSON.parse(serializedData);
            this.projects = data.projects.map(projectData => {
                const project = new Project(projectData.title, projectData.projectID);
                project.todos = projectData.todos.map(todoData => {
                    return new Todo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate,
                        todoData.priority
                    );
                });
                return project;
            });
        }
    }
}


export { Project, TodoApp };