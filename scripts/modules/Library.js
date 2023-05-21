import CreateBook from "../factories/CreateBook.js";
import CreateBookElement from "../factories/CreateBookElement.js";
import LibraryElement from "./LibraryElement.js";

const Library = (function () {
  const _arr = [];

  const removeBook = function (bookId) {
    const bookIndex = _arr.findIndex((book) => {
      return book.id == bookId;
    });

    LibraryElement.removeBook(bookIndex); // Remove from DOM
    _arr.splice(bookIndex, 1); // Remove from Array
  };

  const addBook = function (bookData) {
    const id = _arr.length + 1;

    const book = CreateBook(id, bookData); // Create book's object
    const bookEl = CreateBookElement(book); // Create book's element

    LibraryElement.addBook(bookEl); // Add to library's element
    _arr.push(book); // Add to library's array
  };

  return { addBook, removeBook };
})();

export default Library;
