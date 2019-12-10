import AbstractComponent from './abstract-component.js';

// Список задач
const createBoardTemplate = () =>
  `<section class="board container"></section>`;

export default class Board extends AbstractComponent {

  getTemplate() {
    return createBoardTemplate();
  }
}

