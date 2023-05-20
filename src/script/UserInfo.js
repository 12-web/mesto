export default class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._nameSelector = nameSelector;
    this._professionSelector = professionSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileProfession = document.querySelector(this._professionSelector);
  }
  // получение данных пользователя со страницы
  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userProfession: this._profileProfession.textContent
    }
  }
  // добавление данных пользователя на страницу
  setUserInfo({ newName, newProfession }) {
    this._profileName.textContent = newName;
    this._profileProfession.textContent = newProfession;
  }
}
