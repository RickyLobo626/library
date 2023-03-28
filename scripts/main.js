import { createActionsElement } from "./createElements.js";
import { createBookElement } from "./createElements.js";
import Book from "./Book.js";

("use strict");

const modalAddBookEl = document.getElementById("ModalAddBook");
const bookListEl = document.getElementById("BookList");
const addBookFormEl = document.getElementById("AddBookForm");
const btnsEls = document.querySelectorAll("[data-btn]");
const addBookInputEls = document.querySelectorAll("[data-book-inputs]");

let library = [];

const buildBookContainer = function (bookObj, index) {
  const bookEl = createBookElement(bookObj);
  const bookActionsEl = createActionsElement(index);
  const gridItem = document.createElement("li");

  gridItem.append(bookEl, bookActionsEl);
  gridItem.classList.add("grid__item");

  return gridItem;
};

const resetInputs = function (inputs) {
  inputs.forEach((input) => {
    if (input.getAttribute("type") == "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

const validateForm = function (inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.value == "" && input.hasAttribute("data-required-field")) {
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

  library.forEach((book, index, arr) => {
    const bookItemEl = buildBookContainer(book, index);
    bookListEl.appendChild(bookItemEl);

    // TODO: Remove Item from array and dom
    const bookActionsInputEls = document.querySelectorAll(
      "[data-book-actions]"
    );
  });
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(addBookInputEls);
  if (!formIsValid) return;

  const formObj = getFormObj(addBookFormEl);

  addBookToLibrary(formObj);
  modalAddBookEl.close();

  resetInputs(addBookInputEls);
};

const onOpenModalAddBook = function () {
  modalAddBookEl.showModal();
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
  modalAddBookEl.close();
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
