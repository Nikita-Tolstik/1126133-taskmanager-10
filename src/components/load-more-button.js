import AbstractComponent from './abstract-component.js';

// Кнопка
const createLoadMoreButtonTemplate = () =>
  `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton extends AbstractComponent {

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}
