export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  // вывод массива элементов на страницу
  generate(items) {
    items.forEach(item => {
      this._container.prepend( this._renderer(item) )});
  }

  // добавление элемента на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}
