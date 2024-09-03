

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isActive = false;
    }

    setActiveTodo() {
        this.isActive = true;
    }

    setInactiveTodo() {
        this.isActive = false;
    }

    toggleActiveTodo() {
        this.isActive = !this.isActive;
      }
      
    isActiveTodo() {
        return this.isActive;
      }

}

export { Todo };