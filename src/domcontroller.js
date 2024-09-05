/* eslint-disable import/prefer-default-export */
import './styles.css';

import { Project } from './project';
import { Todo } from './todo';
import { TodoApp } from './todo-app';

// For testing
const todoApp = new TodoApp();

// const defaultProject = new Project("default", 0);
// const defaultProject2 = new Project("default2", 1);
// todoApp.addProject(defaultProject);
// todoApp.addProject(defaultProject2);
// defaultProject.addTodo(new Todo("test1", "description lorem ipsum", 29091996, true));
// defaultProject.addTodo(new Todo("test2", "description", 29091996, false));

// Get DOM elements
const dom = (() => {
  const container = document.querySelector('.container');
  const projectContainer = document.querySelector('.project-container');
  const projectTitle = document.querySelector('.project-title');
  const projectsBtn = document.querySelector('#Projects');
  const addProjectBtn = document.querySelector('#addProject');
  const navbar = document.querySelector('.navbar');
  const addTodoBtn = document.querySelector('#addTodo');
  const projectModalContainer = document.getElementById('project-modal-container');
  const todoModalContainer = document.getElementById('todo-modal-container');
  const editTodoModalContainer = document.getElementById('edit-todo-modal-container');
  return {
    container,
    projectContainer,
    projectTitle,
    projectsBtn,
    addProjectBtn,
    navbar,
    addTodoBtn,
    projectModalContainer,
    todoModalContainer,
    editTodoModalContainer,
  };
})();
const renderEditTodoForm = (todo) => {
  // Get the modal container
  dom.editTodoModalContainer.classList.add('show');

  // get todo value
  document.getElementById('edit-todo-title').value = todo.title;
  document.getElementById('edit-todo-description').value = todo.description;
  document.getElementById('edit-todo-due-date').value = todo.dueDate;
  document.getElementById('edit-todo-priority').checked = todo.priority;
};

const renderTodos = (project) => {
  dom.projectTitle.innerHTML = '';
  dom.projectContainer.innerHTML = '';

  // Set active project
  todoApp.setActiveProject(project);

  dom.addTodoBtn.classList.add('show');
  dom.addProjectBtn.classList.remove('show');

  // add project title
  const projectTitle = document.createElement('h1');
  projectTitle.textContent = project.title;
  dom.projectTitle.appendChild(projectTitle);

  // render todos
  project.getAllTodos().forEach((todo) => {
    const todoElement = document.createElement('button');
    todoElement.classList.add('todo-card');

    const titleElement = document.createElement('p');
    titleElement.textContent = todo.title;

    const descElement = document.createElement('p');
    descElement.textContent = todo.description;

    const dueElement = document.createElement('p');
    dueElement.textContent = new Date(todo.dueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const priorityElement = document.createElement('p');
    priorityElement.textContent = todo.priority ? 'High' : 'Low';

    // Button to remove to do
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      project.removeTodo(todo);
      todoApp.saveToLocalStorage();
      renderTodos(project);
    });

    // Button to edit to do
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      // Select current todo
      todoApp.setActiveProject(project);
      todo.setActiveTodo();

      renderEditTodoForm(todo);
    });

    todoElement.appendChild(titleElement);
    todoElement.appendChild(descElement);
    todoElement.appendChild(dueElement);
    todoElement.appendChild(priorityElement);
    dom.projectContainer.appendChild(todoElement);
    todoElement.appendChild(editBtn);
    todoElement.appendChild(removeBtn);
  });
};

const renderAddTodoForm = () => {
  // Get the modal container
  dom.todoModalContainer.classList.add('show');
};

const renderAddProjectForm = () => {
  // Get the modal container
  dom.projectModalContainer.classList.add('show');
};

const renderProjects = () => {
  dom.projectContainer.innerHTML = '';
  dom.addProjectBtn.classList.add('show');
  dom.projectTitle.innerHTML = '';
  dom.addTodoBtn.classList.remove('show');

  todoApp.getAllProjects().forEach((project) => {
    const renderTodosHandler = () => {
      renderTodos(project);
    };
    const projectElement = document.createElement('div');
    projectElement.classList.add('project-card');
    projectElement.textContent = project.title;

    projectElement.addEventListener('click', renderTodosHandler);

    dom.projectContainer.appendChild(projectElement);

    // Add button to remove project and its todos
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      // Remove the todos
      project.getAllTodos().forEach((todo) => {
        project.removeTodo(todo);
      });
      // Remove the project
      todoApp.removeProject(project);
      todoApp.saveToLocalStorage();
      projectElement.removeEventListener('click', renderTodosHandler);
      projectElement.remove();
      renderProjects();
    });
    projectElement.appendChild(removeBtn);
  });
};

const setupEventListeners = () => {
  // Add event listener to submit project button
  let projectID = 0;
  document.getElementById('submit-project-btn').addEventListener('click', (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Get the title value from the text field and create a new project
    const title = document.getElementById('project-title').value;

    const newProject = new Project(title, projectID);
    projectID += 1;

    // Add the new project to the projects array
    todoApp.addProject(newProject);
    todoApp.saveToLocalStorage();
    // Render the new project
    renderProjects();

    // Close the modal
    dom.projectModalContainer.classList.remove('show');

    // Clear the text field
    document.getElementById('project-title').value = '';
  });

  // Event listener for to do submission
  document.getElementById('submit-todo-btn').addEventListener('click', (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Close the modal
    dom.todoModalContainer.classList.remove('show');

    // Get value from form fields and create new to do
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-description').value;
    const dueDate = document.getElementById('todo-due-date').value;
    const priority = document.getElementById('todo-priority').checked;
    const newTodo = new Todo(title, description, dueDate, priority);
    const activeProject = todoApp.getActiveProject();
    activeProject.addTodo(newTodo);
    todoApp.saveToLocalStorage();
    renderTodos(activeProject);

    // Clear the text fields
    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';
    document.getElementById('todo-due-date').value = '';
    document.getElementById('todo-priority').checked = false;
  });

  // Add event listener for edit todo
  document.getElementById('submit-edit-todo-btn').addEventListener('click', (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Close the modal
    dom.editTodoModalContainer.classList.remove('show');

    // Get value from form fields and overwrite current todo
    const title = document.getElementById('edit-todo-title').value;
    const description = document.getElementById('edit-todo-description').value;
    const dueDate = document.getElementById('edit-todo-due-date').value;
    const priority = document.getElementById('edit-todo-priority').checked;
    const activeProject = todoApp.getActiveProject();

    const activeTodo = activeProject.getActiveTodo();

    activeTodo.title = title;
    activeTodo.description = description;
    activeTodo.dueDate = dueDate;
    activeTodo.priority = priority;
    renderTodos(activeProject);

    // make current to do inactive
    activeTodo.setInactiveTodo();
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
  dom.editTodoModalContainer.addEventListener('click', (e) => {
    if (e.target === dom.editTodoModalContainer) {
      dom.editTodoModalContainer.classList.remove('show');
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

function init() {
  todoApp.loadFromLocalStorage();
  setupEventListeners();
  renderProjects();
}

export { init };
