/* eslint-disable import/prefer-default-export */
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
    return this.todos.find((todo) => todo.isActive);
  }
}

export { Project };
