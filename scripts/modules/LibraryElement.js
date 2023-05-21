const LibraryElement = (function () {
  const _el = document.getElementById("library");

  const removeBook = function (bookIndex) {
    _el.children[bookIndex].remove();
  };

  const addBook = function (bookEl) {
    _el.appendChild(bookEl);
  };

  return { addBook, removeBook };
})();

export default LibraryElement;
