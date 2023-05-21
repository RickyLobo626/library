import { createEl } from "../helpers/elementHelpers.js";
import Library from "../modules/Library.js";

const CreateBookElement = function (bookObj) {
  const el = createEl("li", "grid__item"); // Container

  const _bookObj = bookObj;

  const _bodyEls = {
    container: createEl("div", "book"),
    cover: createEl("div", "book__cover"),
    top: createEl("div", "book__top"),
    bottom: createEl("div", "book__bottom"),
    title: createEl("p", "book__title", _bookObj.title),
    author: createEl("p", "book__author", _bookObj.author),
    pages: createEl("p", "book__pages", `${_bookObj.pages} pages`),
    read: createEl("p", "book__read", _bookObj.read ? "Read" : "Not read yet"),
  };

  const _actionsEls = {
    container: createEl("div", "book-actions"),
    switchLabel: createEl("label", "switch"),
    switchInput: createEl("input", "switch__input"),
    switchSlider: createEl("span", "switch__slider"),
    switchText: createEl("span", "switch__text", "read"),
    deleteBtn: createEl(
      "button",
      ["book-actions__delete", "text-btn"],
      "delete"
    ),
  };

  const _appendElements = function () {
    _bodyEls.bottom.append(_bodyEls.pages, _bodyEls.read);
    _bodyEls.top.append(_bodyEls.title, _bodyEls.author);
    _bodyEls.cover.append(_bodyEls.top, _bodyEls.bottom);
    _bodyEls.container.appendChild(_bodyEls.cover);

    _actionsEls.switchLabel.append(
      _actionsEls.switchInput,
      _actionsEls.switchSlider,
      _actionsEls.switchText
    );
    _actionsEls.container.append(
      _actionsEls.switchLabel,
      _actionsEls.deleteBtn
    );

    el.append(_bodyEls.container, _actionsEls.container);
  };

  const _setAttributes = function () {
    _actionsEls.switchInput.setAttribute("type", "checkbox");

    if (_bookObj.read) {
      _actionsEls.switchInput.setAttribute("checked", true);
    }
  };

  const _appendAndSetAttributes = function () {
    _appendElements();
    _setAttributes();
  };

  const _updateReadText = function () {
    _bookObj.toggleRead(_actionsEls.switchInput.checked);

    _bodyEls.read.textContent = bookObj.read ? "Read" : "Not read yet";
  };

  const _removeBook = function () {
    Library.removeBook(_bookObj.id);
    _actionsEls.switchInput.removeEventListener("click", _updateReadText);
    _actionsEls.deleteBtn.removeEventListener("click", _removeBook);
  };

  _appendAndSetAttributes();
  _actionsEls.switchInput.addEventListener("click", _updateReadText);
  _actionsEls.deleteBtn.addEventListener("click", _removeBook);

  return el;
};

export default CreateBookElement;
