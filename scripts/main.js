import { createBook } from "./createBook.js";

("use strict");

const bookListEl = document.getElementById("BookList");
const modalAddBookEl = document.getElementById("ModalAddBook");
const modalAddBookOverlayEl = document.getElementById("ModalAddBookOverlay");
const formAddBookEl = document.getElementById("FormAddBook");
const inputsAddBookEls = document.querySelectorAll("[data-book-inputs]");
const btnsEls = document.querySelectorAll("[data-click]");
// const main = document.querySelector(".main")

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
  const id = library.length + 1;
  const book = createBook(formObj, id);

  library.push(book);

  bookListEl.appendChild(book.el);

  // Action Events
  book.switchInputEl.addEventListener("click", (e) => {
    book.toggleRead();
  });

  book.deleteBtnEl.addEventListener("click", (e) => {
    const bookIndex = library.findIndex((item) => {
      return item.id == id;
    });

    library.splice(bookIndex, 1); // Remove from array
    book.el.remove(); // Remove from dom
  });
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(inputsAddBookEls);

  if (!formIsValid) return;

  const formObj = getFormObj(formAddBookEl);

  addBookToLibrary(formObj);

  closeModalAddBook();

  resetInputs(inputsAddBookEls);
};

const openModalAddBook = function () {
  modalAddBookOverlayEl.classList.remove("hidden");

  setTimeout(() => {
    modalAddBookEl.classList.add("modal--open");
  }, 50);

  formAddBookEl.addEventListener("submit", onSubmit);

  inputsAddBookEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });
};

const closeModalAddBook = function () {
  setTimeout(() => {
    modalAddBookEl.classList.remove("modal--open");
  }, 50);

  modalAddBookOverlayEl.classList.add("hidden");

  resetInputs(inputsAddBookEls);
};

btnsEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.click) {
      case "open-modal-add":
        openModalAddBook();
        break;
      case "close-modal-add":
        closeModalAddBook();
        break;
    }
  });
});

modalAddBookEl.addEventListener("click", (e) => {
  e.stopPropagation();
});
