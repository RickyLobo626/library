import BookForm from "./BookForm.js";

const BookFormModal = (function () {
  const _el = document.getElementById("form-modal");
  const _overlayEl = document.getElementById("form-modal-overlay");

  const open = function () {
    _overlayEl.classList.remove("hidden");

    setTimeout(() => {
      _el.classList.add("modal--open");
    }, 50);
  };

  const close = function () {
    setTimeout(() => {
      _el.classList.remove("modal--open");
    }, 50);

    _overlayEl.classList.add("hidden");

    BookForm.resetInputs();
  };

  _el.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return { open, close };
})();

export default BookFormModal;
