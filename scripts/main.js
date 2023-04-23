import { createBook } from "./createBook.js";

("use strict");

const bookListEl = document.getElementById("BookList");
const modalAddBookEl = document.getElementById("ModalAddBook");
const formAddBookEl = document.getElementById("FormAddBook");
const inputsAddBookEls = document.querySelectorAll("[data-book-inputs]");
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

  modalAddBookEl.close();

  resetInputs(inputsAddBookEls);
};

const onOpenModalAddBook = function () {
  modalAddBookEl.showModal();
  formAddBookEl.addEventListener("submit", onSubmit);

  inputsAddBookEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });
};

const onCloseModalAddBook = function () {
  modalAddBookEl.close();
  resetInputs(inputsAddBookEls);
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
