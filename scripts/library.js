import { createBook } from "./createBook.js";

export const library = (function () {
  const el = document.getElementById("library");
  const _arr = [];

  const removeBook = function (bookId) {
    const bookIndex = _arr.findIndex((book) => {
      return book.id == bookId;
    });

    _arr.splice(bookIndex, 1);
  };

  const addBook = function (bookData) {
    const id = _arr.length + 1;
    const book = createBook(id, bookData);

    _arr.push(book);
    el.appendChild(book.el);
  };

  return { el, addBook, removeBook };
})();
