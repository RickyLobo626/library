import { Book } from "./Book.js";

export const Library = function (element) {
  const el = element;
  const arr = [];

  const removeBook = function (bookIndex) {
    arr[bookIndex].el.remove(); // Remove from dom
    arr.splice(bookIndex, 1); // Remove from array
  };

  const addBook = function (bookData) {
    const id = arr.length + 1;
    const book = Book(id, bookData);

    arr.push(book);
    el.appendChild(book.el);

    book.deleteBtnEl.addEventListener("click", (e) => {
      const bookIndex = arr.findIndex((item) => {
        return item.id == id;
      });

      removeBook(bookIndex);
    });
  };

  return { addBook };
};
