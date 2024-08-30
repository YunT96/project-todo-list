class Project { 
    constructor(title) {
        this.title = title;
        this.todos = [];
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
    
}

class TodoApp {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    getAllProjects() {
        return this.projects;
    }
}


export { Project, TodoApp };