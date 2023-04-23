import { createBookEl } from "./createElements.js";

export const createBook = function (data, bookId) {
  const id = bookId;
  const title = data.title;
  const author = data.author;
  const pages = data.pages;
  let read = data.read;

  const { el, readEl, switchInputEl, deleteBtnEl } = createBookEl(data);

  const toggleRead = function () {
    read = !read;
    readEl.textContent = read ? "Read" : "Not read yet";
  };

  const getInfo = function () {
    const readStr = read ? "completed" : "not read yet";

    return `${title} by ${author}, ${pages}, ${readStr}.`;
  };

  return {
    id,
    el,
    switchInputEl,
    deleteBtnEl,
    toggleRead,
    getInfo,
  };
};
