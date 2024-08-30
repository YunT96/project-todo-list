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
    return { projectContainer, projectsBtn, addProjectBtn, addTodoBtn };
})();

const setupEventListeners = () => {
    // Add event listener to submit button
    document.getElementById('submit-btn').addEventListener('click', (e) => {

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
        modalContainer.classList.remove('show');

        // Clear the text field
        document.getElementById('project-title').value = '';
    });

    // Add event listener to close the modal when clicked outside
    const modalContainer = document.getElementById('modal-container');
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('show');
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
};

const renderTodos = (project) => {
    dom.projectContainer.innerHTML = "";

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

        todoElement.appendChild(titleElement);
        todoElement.appendChild(descElement);
        todoElement.appendChild(dueElement);
        todoElement.appendChild(priorityElement);
        dom.projectContainer.appendChild(todoElement);

    });
};

const renderAddProjectForm = () => {
    // Get the modal container
    const modalContainer = document.getElementById('modal-container');

    modalContainer.classList.add('show');
};


const renderProjects = () => {
    dom.projectContainer.innerHTML = "";

    todoApp.getAllProjects().forEach((project) => {
        const projectElement = document.createElement('button');
        projectElement.classList.add("project-card");
        projectElement.textContent = project.title;

        projectElement.addEventListener("click", () => {
            renderTodos(project);
        });

        dom.projectContainer.appendChild(projectElement);
    });
};

function init() {
    setupEventListeners();
    renderProjects();
}

export { init };
