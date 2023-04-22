import { createBookEl } from "./getElements.js";

import Book from "./Book.js";

("use strict");

const bookListEl = document.getElementById("BookList");
const addBookModalEl = document.getElementById("ModalAddBook");
const addBookFormEl = document.getElementById("AddBookForm");
const addBookInputEls = document.querySelectorAll("[data-book-inputs]");
const btnsEls = document.querySelectorAll("[data-btn]");

let library = [];

const resetInputs = function (inputs) {
  inputs.forEach((input) => {
    if (input.getAttribute("type") == "checkbox") {
      input.checked = false;
    } else {
      input.classList.remove("field--invalid");
      input.value = "";
    }
  });
};

const validateForm = function (inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.value == "" && input.hasAttribute("required")) {
      input.classList.add("field--invalid");
      isValid = false;
    }
  });

  return isValid;
};

const getFormObj = function (form) {
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);
  obj.read = !!obj.read;

  return obj;
};

const addBookToLibrary = function (formObj) {
  const book = new Book(formObj);

  library.push(book);

  // reset list
  bookListEl.textContent = "";

  library.forEach((book, index) => {
    const bookContainer = createBookEl(book);

    bookListEl.appendChild(bookContainer.el);

    // Action Events
    bookContainer.switchInput.addEventListener("click", (e) => {
      book.read = !book.read;
      bookContainer.toggleRead(book.read);
    });

    bookContainer.deleteBtn.addEventListener("click", (e) => {
      const bookIndex = library.findIndex((item) => {
        return Object.is(item, book);
      });

      library.splice(bookIndex, 1); // Remove from array
      bookContainer.el.remove(); // Remove from dom
    });
  });
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(addBookInputEls);

  if (!formIsValid) return;

  const formObj = getFormObj(addBookFormEl);

  addBookToLibrary(formObj);

  addBookModalEl.close();

  resetInputs(addBookInputEls);
};

const onOpenModalAddBook = function () {
  addBookModalEl.showModal();
  addBookFormEl.addEventListener("submit", onSubmit);

  addBookInputEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });
};

const onCloseModalAddBook = function () {
  addBookModalEl.close();
  resetInputs(addBookInputEls);
};

btnsEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.btn) {
      case "open-modal-add":
        onOpenModalAddBook();
        break;
      case "close-modal-add":
        onCloseModalAddBook();
        break;
    }
  });
});
