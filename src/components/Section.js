export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }
  // вывод массива элементов на страницу
  generate() {
    this._items.forEach(item => { this._container.prepend(this._renderer(item)) });
  }
  // добавление элемента на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}
