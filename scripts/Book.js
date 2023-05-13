import { createBookEl } from "./createElements.js";

export const Book = function (bookId, data) {
  const { el, readEl, switchInputEl, deleteBtnEl } = createBookEl(data);
  const id = bookId;
  const title = data.title;
  const author = data.author;
  const pages = data.pages;
  let read = data.read;

  const toggleRead = function (e) {
    read = !read;

    readEl.textContent = read ? "Read" : "Not read yet";
  };

  const getInfo = function () {
    const readStr = read ? "completed" : "not read yet";

    return `${title} by ${author}, ${pages}, ${readStr}.`;
  };

  switchInputEl.addEventListener("click", toggleRead);

  return {
    id,
    el,
    deleteBtnEl,
    getInfo,
  };
};
