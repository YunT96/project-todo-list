import "./styles.css";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

}

class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}


function printNavbar() {
    const navbar = document.querySelector(".navbar");

    const addToDoButton = document.createElement("button");
    addToDoButton.classList.add("add-todo-button");
    addToDoButton.textContent = "Add new todo";
    navbar.appendChild(addToDoButton);

    addToDoButton.addEventListener("click", showForm);

    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-button");
    addProjectButton.textContent = "Add new project";
    navbar.appendChild(addProjectButton);

}

function showForm() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");
  
    const form = document.createElement("form");
    form.classList.add("form");
  
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Title";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
  
    const labelDescription = document.createElement("label");
    labelDescription.textContent = "Description";
    const inputDescription = document.createElement("input");
    inputDescription.type = "text";
  
    const labelDueDate = document.createElement("label");
    labelDueDate.textContent = "Due Date";
    const inputDueDate = document.createElement("input");
    inputDueDate.type = "date";
  
    const labelPriority = document.createElement("label");
    labelPriority.textContent = "Priority";
    const selectPriority = document.createElement("select");
    const option1 = document.createElement("option");
    option1.textContent = "Low";
    const option2 = document.createElement("option");
    option2.textContent = "Medium";
    const option3 = document.createElement("option");
    option3.textContent = "High";
  
    selectPriority.appendChild(option1);
    selectPriority.appendChild(option2);
    selectPriority.appendChild(option3);
  
    const button = document.createElement("button");
    button.textContent = "Submit";
    button.type = "submit";
  
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelDescription);
    form.appendChild(inputDescription);
    form.appendChild(labelDueDate);
    form.appendChild(inputDueDate);
    form.appendChild(labelPriority);
    form.appendChild(selectPriority);
    form.appendChild(button);
  
    formContainer.appendChild(form);
    modal.appendChild(formContainer);
  
    document.body.appendChild(modal);
  
    // add event listener to close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

function printList(todos) {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    todos.forEach(todo => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h3");
        title.textContent = todo.title;

        const description = document.createElement("p");
        description.textContent = todo.description;

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due: ${todo.dueDate}`;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${todo.priority}`;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(dueDate);
        card.appendChild(priority);

        container.appendChild(card);
    });
}




const initialise = (function () {
    const testProject = new Project("My project");

    testProject.addTodo(new Todo("Test title", "Test description", "Test due date", "Test priority"));
    testProject.addTodo(new Todo("Test title", "Test description", "Test due date", "Test priority"));
    testProject.addTodo(new Todo("Test title", "Test description", "Test due date", "Test priority"));
    printList(testProject.todos);
    printNavbar();
})();
