"use strict";

const btnsEl = document.querySelectorAll("[data-btn]");
const bookFieldsEl = document.querySelectorAll("[data-book-inputs]");
const addBookModalEl = document.getElementById("Modal");
const bookListEl = document.getElementById("BookList");
const addBookFormEl = document.getElementById("AddBookForm");

let library = [];

function Book(book) {
  this.title = book.title;
  this.author = book.author;
  this.pages = book.pages;
  this.read = book.read;
}

Book.prototype.getInfo = function () {
  const readStr = this.read ? "completed" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages}, ${readStr}.`;
};

const appendBook = function (books) {
  bookListEl.textContent = "";

  books.forEach((book) => {
    const bookItem = document.createElement("li");
    const bookCover = document.createElement("div");
    const bookTop = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookBottom = document.createElement("div");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = book.read ? "Finished" : "Not read yet";

    bookItem.classList.add("book");
    bookTitle.classList.add("book__title");
    bookCover.classList.add("book__cover");
    bookTop.classList.add("book__top");
    bookAuthor.classList.add("book__author");
    bookBottom.classList.add("book__bottom");
    bookPages.classList.add("book__pages");
    bookRead.classList.add("book__read");

    bookBottom.append(bookPages, bookRead);
    bookTop.append(bookTitle, bookAuthor);
    bookCover.append(bookTop, bookBottom);
    bookItem.appendChild(bookCover);

    bookListEl.appendChild(bookItem);
  });
};

const addBookToLibrary = function (form) {
  const book = new Book(form);

  library.push(book);
  appendBook(library);
};

const validateForm = function (fields) {
  let isValid = true;
  fields.forEach((field) => {
    if (!field.value && field.hasAttribute("data-required-field")) {
      field.classList.add("field--invalid");
      isValid = false;
    }
  });

  return isValid;
};

const getFieldsObj = function (fields) {
  const data = {};
  fields.forEach((field) => {
    if (field.dataset.bookInputs == "read") {
      data[field.name] = field.checked;
    } else {
      data[field.name] = field.value;
    }
  });

  return data;
};

const resetFields = function (fields) {
  fields.forEach((field) => {
    if (field.checked) {
      field.checked = false;
    } else {
      field.value = "";
    }
  });
};

const onSubmit = function (e) {
  e.preventDefault();
  const formIsValid = validateForm(bookFieldsEl);
  if (!formIsValid) return;

  const fieldsObj = getFieldsObj(bookFieldsEl);

  addBookToLibrary(fieldsObj);

  resetFields(bookFieldsEl);
  addBookModalEl.close();
};

const onOpenAddBookModal = function () {
  addBookModalEl.showModal();

  addBookFormEl.addEventListener("submit", onSubmit);

  bookFieldsEl.forEach((field) => {
    field.addEventListener("keyup", (e) => {
      field.classList.remove("field--invalid");
    });
  });
};

btnsEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.btn) {
      case "open-add-modal":
        onOpenAddBookModal();
        break;
      case "close-add-modal":
        addBookModalEl.close();
        break;
    }
  });
});
