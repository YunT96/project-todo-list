/* eslint-disable import/prefer-default-export */
import './styles.css';
import { Project } from './project';
import { Todo } from './todo';

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
      this.projects = data.projects.map((projectData) => {
        const project = new Project(projectData.title, projectData.projectID);
        project.todos = projectData.todos.map((todoData) => new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority,
        ));
        return project;
      });
    }
  }
}

export { TodoApp };
