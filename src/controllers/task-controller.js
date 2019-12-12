import TaskEditComponent from '../components/task-edit.js';
import TaskComponent from '../components/task.js';
import {render, RenderPosition, replace} from '../utils/render.js';


export default class TaskController {
  constructor(container, onDataChange) {

    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(task) {


    const taskComponent = new TaskComponent(task);
    const taskEditComponent = new TaskEditComponent(task);

    const onEscKeyDown = (evt) => {

      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const replaceEditToTask = () => {
      replace(taskComponent, taskEditComponent);
    };

    const replaceTaskToEdit = () => {
      replace(taskEditComponent, taskComponent);
    };

    taskComponent.setEditButtonClickHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });


    taskEditComponent.setSubmitHandler(() => {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });


    taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));

    });


    render(this._container, taskComponent, RenderPosition.BEFOREEND);

  }

}
