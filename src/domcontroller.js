import "./styles.css";

import { Project } from "./project";
import { Todo } from "./todo";
import { TodoApp } from "./project";


//For testing
const todoApp = new TodoApp();
const defaultProject = new Project("default");
const defaultProject2 = new Project("default2");
todoApp.addProject(defaultProject);
todoApp.addProject(defaultProject2);
defaultProject.addTodo(new Todo("test1", "description", 29091996, true));
defaultProject.addTodo(new Todo("test2", "description", 29091996, false));


const dom = (() => {
    const projectContainer = document.querySelector(".container");
    const projectsBtn = document.querySelector("#Projects");
    const addProjectBtn = document.querySelector("#addProject");
    const addTodoBtn = document.querySelector("#addTodo");
    const projectModalContainer = document.getElementById('project-modal-container');
    const todoModalContainer = document.getElementById('todo-modal-container');
    return { projectContainer, projectsBtn, addProjectBtn, addTodoBtn, projectModalContainer, todoModalContainer };
})();

const setupEventListeners = () => {
    // Add event listener to submit project button
    document.getElementById('submit-project-btn').addEventListener('click', (e) => {

        // Prevent default form submission
        e.preventDefault();

        // Get the title value from the text field and create a new project
        const title = document.getElementById('project-title').value;
        const newProject = new Project(title);

        // Add the new project to the projects array
        todoApp.addProject(newProject);

        // Render the new project
        renderProjects();

        // Close the modal
        dom.projectModalContainer.classList.remove('show');

        // Clear the text field
        document.getElementById('project-title').value = '';
    });

    //Form button
    document.getElementById('submit-todo-btn').addEventListener('click', (e) => {

        // Prevent default form submission
        e.preventDefault();

        // Close the modal
        dom.todoModalContainer.classList.remove('show');
    });

    // Add event listener to close the modal when clicked outside
    dom.projectModalContainer.addEventListener('click', (e) => {
        if (e.target === dom.projectModalContainer) {
            dom.projectModalContainer.classList.remove('show');
        }
    });
    dom.todoModalContainer.addEventListener('click', (e) => {
        if (e.target === dom.todoModalContainer) {
            dom.todoModalContainer.classList.remove('show');
        }
    });


    // Add event listener to open the new project form
    dom.addProjectBtn.addEventListener('click', () => {
        renderAddProjectForm();
    });

    // add event listner to show projects
    dom.projectsBtn.addEventListener('click', () => {
        renderProjects();
    });

    dom.addTodoBtn.addEventListener('click', () => {
        renderAddTodoForm();
    });
};

const renderTodos = (project) => {
    console.log("rendering todos");
    dom.projectContainer.innerHTML = "";

    dom.addTodoBtn.classList.add("show");
    dom.addProjectBtn.classList.remove("show");

    project.getAllTodos().forEach((todo) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add("todo-card");

        const titleElement = document.createElement('p');
        titleElement.textContent = todo.title;

        const descElement = document.createElement('p');
        descElement.textContent = todo.description;

        const dueElement = document.createElement('p');
        dueElement.textContent = new Date(todo.dueDate).toLocaleString();

        const priorityElement = document.createElement('p');
        priorityElement.textContent = todo.priority ? "High" : "Low";

        // Button to remove to do
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener('click', () => {
            project.removeTodo(todo);
            renderTodos(project);
        });


        todoElement.appendChild(removeBtn);
        todoElement.appendChild(titleElement);
        todoElement.appendChild(descElement);
        todoElement.appendChild(dueElement);
        todoElement.appendChild(priorityElement);
        dom.projectContainer.appendChild(todoElement);

    });
};

const renderAddTodoForm = () => {
    // Get the modal container

    const addTodoModalContainer = document.getElementById('todo-modal-container');
    addTodoModalContainer.classList.add('show');

}

const renderAddProjectForm = () => {
    // Get the modal container
    // const modalContainer = document.getElementById('modal-container');

    dom.projectModalContainer.classList.add('show');
};


const renderProjects = () => {
    console.log("rendering projects");
    dom.projectContainer.innerHTML = "";
    dom.addProjectBtn.classList.add("show");
    dom.addTodoBtn.classList.remove("show");

    todoApp.getAllProjects().forEach((project) => {
        const renderTodosHandler = () => {
            renderTodos(project);
        };
        const projectElement = document.createElement('button');
        projectElement.classList.add("project-card");
        projectElement.textContent = project.title;

        projectElement.addEventListener("click", renderTodosHandler);

        dom.projectContainer.appendChild(projectElement);

        //Add button to remove project and its todos
        const removeBtn = document.createElement('button');
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener('click', () => {
            // Remove the todos
            project.getAllTodos().forEach((todo) => {
                project.removeTodo(todo);
            });
            // Remove the project
            todoApp.removeProject(project);
            projectElement.removeEventListener("click", renderTodosHandler);
            projectElement.remove();
            renderProjects();
        });
        projectElement.appendChild(removeBtn);
    });
};

function init() {
    setupEventListeners();
    renderProjects();
}

export { init };
