import { createBookEl } from "./createElements.js";
import { library } from "./library.js";

export const createBook = function (bookId, data) {
  const {
    el,
    readEl: _readEl,
    switchInputEl: _switchInputEl,
    deleteBtnEl: _deleteBtnEl,
  } = createBookEl(data);

  const _id = bookId;
  const _title = data.title;
  const _author = data.author;
  const _pages = data.pages;
  let _read = data.read;

  _switchInputEl.checked = data.read;

  const _toggleRead = function (e) {
    _read = !_read;

    _readEl.textContent = read ? "Read" : "Not read yet";
  };

  const _remove = function () {
    library.removeBook(_id); // Remove from library's array
    el.remove(); // Remove from dom

    _switchInputEl.removeEventListener("click", _toggleRead);
    _deleteBtnEl.removeEventListener("click", _remove);
  };

  const getInfo = function () {
    const readStr = _read ? "completed" : "not read yet";

    return `${_title} by ${_author}, ${_pages}, ${readStr}.`;
  };

  _switchInputEl.addEventListener("click", _toggleRead);
  _deleteBtnEl.addEventListener("click", _remove);

  return {
    el,
    getInfo,
  };
};
