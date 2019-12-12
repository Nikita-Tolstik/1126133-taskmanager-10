import LoadMoreButtonComponent from '../components/load-more-button.js';
import TasksComponent from '../components/tasks.js';
import SortComponent, {SortType} from '../components/sort.js';
import NoTasksComponent from '../components/no-tasks.js';
import TaskController from './task-controller.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const FIRST_ELEMENT = 0;
const ONE = 1;
const NO_ELEMENT = -1;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const renderTasks = (taskListElement, tasks, onDataChange) => {
  tasks.forEach((task) => {
    const taskController = new TaskController(taskListElement, onDataChange);
    taskController.render(task);
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);

  }

  render(tasks) {

    this._tasks = tasks;

    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        renderTasks(taskListElement, tasks.slice(prevTasksCount, showingTasksCount), this._onDataChange);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }


    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(FIRST_ELEMENT, showingTasksCount), this._onDataChange);
    renderLoadMoreButton();


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          sortedTasks = tasks.slice(FIRST_ELEMENT, SHOWING_TASKS_COUNT_ON_START);
          break;
      }

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks, this._onDataChange);

      if (sortType === SortType.DEFAULT) {
        showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });

  }

  _onDataChange(taskController, oldData, newData) {

    const index = this._tasks.findIndex((task) => task === oldData);

    if (index === NO_ELEMENT) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(FIRST_ELEMENT, index), newData, this._tasks.slice(index + ONE));

    taskController.render(this._tasks[index]);
  }
}
