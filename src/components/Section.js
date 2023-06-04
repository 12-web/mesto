export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  // вывод массива элементов на страницу
  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  // добавление элемента в конец страницы
  appendItem(item) {
    this._container.append(item);
  }

  // добавление элемента в конец страницы
  prependItem(item) {
    this._container.prepend(item);
  }
}
