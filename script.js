"use strict";

const btns = document.querySelectorAll("[data-btn]");
const inputs = document.querySelectorAll("[data-input]");
const addBookModal = document.getElementById("Modal");
const bookList = document.getElementById("BookList");

let library = [];

let addBookForm = {
  title: "",
  author: "",
  pages: null,
  read: false,
};

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
  bookList.textContent = "";
  books.forEach((book) => {
    const bookItem = document.createElement("li");
    const bookCover = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookDetails = document.createElement("div");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookRead.textContent = book.read ? "completed" : "not read yet";

    bookItem.classList.add("book");
    bookTitle.classList.add("book__title");
    bookCover.classList.add("book__cover");
    bookAuthor.classList.add("book__author");
    bookDetails.classList.add("book__details");
    bookPages.classList.add("book__pages");
    bookRead.classList.add("book__read");

    bookDetails.append(bookPages, bookRead);
    bookCover.append(bookTitle, bookAuthor, bookDetails);
    bookItem.appendChild(bookCover);

    bookList.appendChild(bookItem);
  });
};

const addBookToLibrary = function (form) {
  const book = new Book(form);

  library.push(book);
  console.log(library);
  appendBook(library);
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.btn) {
      case "open-add-modal":
        addBookModal.showModal();
        break;
      case "close-add-modal":
        addBookModal.close();
        break;
      case "add-book":
        e.preventDefault();
        addBookToLibrary(addBookForm);
        break;
    }
  });
});

inputs.forEach((input) => {
  if (input.dataset.input == "read") {
    input.addEventListener("click", (e) => {
      addBookForm[input.name] = input.checked;
    });
  } else {
    input.addEventListener("keyup", (e) => {
      addBookForm[input.name] = input.value;
    });
  }
});
