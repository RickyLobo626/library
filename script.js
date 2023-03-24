"use strict";

const btnsEls = document.querySelectorAll("[data-btn]");
const bookInputsEls = document.querySelectorAll("[data-book-inputs]");
const addBookModalEl = document.getElementById("Modal");
const bookListEl = document.getElementById("BookList");
const addBookFormEl = document.getElementById("AddBookForm");

let library = [];

function Book(book) {
  this.title = book.title;
  this.author = book.author;
  this.pages = book.pages;
  this.read = !!book.read;
}

Book.prototype.getInfo = function () {
  const readStr = this.read ? "completed" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages}, ${readStr}.`;
};

const createBookChildren = function () {
  return {
    cover: document.createElement("div"),
    top: document.createElement("div"),
    title: document.createElement("p"),
    author: document.createElement("p"),
    bottom: document.createElement("div"),
    pages: document.createElement("p"),
    read: document.createElement("p"),
  };
};

const addClassesToChildren = function (elements) {
  for (const key in elements) {
    elements[key].classList.add(`book__${key}`);
  }
};

const addTextToChildren = function (elements, book) {
  elements.title.textContent = book.title;
  elements.author.textContent = book.author;
  elements.pages.textContent = `${book.pages} pages`;
  elements.read.textContent = book.read ? "Finished" : "Not read yet";
};

const buildBookCover = function (elements, book) {
  addClassesToChildren(elements);
  addTextToChildren(elements, book);

  const { cover, top, bottom, title, author, read, pages } = elements;

  bottom.append(pages, read);
  top.append(title, author);
  cover.append(top, bottom);

  return cover;
};

const resetInputs = function (inputs) {
  inputs.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

const appendBook = function (books) {
  // reset list
  bookListEl.textContent = "";

  books.forEach((book) => {
    const bookEl = document.createElement("li");
    bookEl.classList.add("book");

    const bookChildrenEls = createBookChildren();
    const bookCover = buildBookCover(bookChildrenEls, book);

    bookEl.appendChild(bookCover);
    bookListEl.appendChild(bookEl);
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

  return obj;
};

const addBookToLibrary = function (form) {
  const book = new Book(form);

  library.push(book);
  appendBook(library);
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(bookInputsEls);
  if (!formIsValid) return;

  const formObj = getFormObj(addBookFormEl);
  formObj.read = !!formObj.read;

  addBookToLibrary(formObj);
  addBookModalEl.close();
  resetInputs(bookInputsEls);
};

const onClickAddBook = function () {
  addBookModalEl.showModal();
  addBookFormEl.addEventListener("submit", onSubmit);

  bookInputsEls.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      input.classList.remove("field--invalid");
    });
  });
};

btnsEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.btn) {
      case "open-add-modal":
        onClickAddBook();
        break;
      case "close-add-modal":
        addBookModalEl.close();
        break;
    }
  });
});
