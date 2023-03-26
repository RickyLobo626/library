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

const addClassesToBookParts = function (elements) {
  for (const key in elements) {
    const classes = [];

    if (key != "book") {
      classes.push(key.replace("book", "book__").toLowerCase());
    } else {
      classes.push(key);
    }

    classes.forEach((cls) => {
      elements[key].classList.add(cls);
    });
  }
};

const addTextToBookParts = function (elements, book) {
  elements.bookTitle.textContent = book.title;
  elements.bookAuthor.textContent = book.author;
  elements.bookPages.textContent = `${book.pages} pages`;
  elements.bookRead.textContent = book.read ? "Finished" : "Not read yet";
};

const addTextToActionParts = function (elements) {
  elements.inputSwitchText.textContent = "read";
  elements.actionsDelete.textContent = "remove";
};

const createBookElement = function (bookObj) {
  const allParts = {
    book: document.createElement("div"),
    bookCover: document.createElement("div"),
    bookTop: document.createElement("div"),
    bookTitle: document.createElement("p"),
    bookAuthor: document.createElement("p"),
    bookBottom: document.createElement("div"),
    bookPages: document.createElement("p"),
    bookRead: document.createElement("p"),
  };

  addClassesToBookParts(allParts);
  addTextToBookParts(allParts, bookObj);

  const {
    book,
    bookCover,
    bookTop,
    bookTitle,
    bookAuthor,
    bookBottom,
    bookPages,
    bookRead,
  } = allParts;
  bookBottom.append(bookPages, bookRead);
  bookTop.append(bookTitle, bookAuthor);
  bookCover.append(bookTop, bookBottom);
  book.appendChild(bookCover);

  return book;
};

const addClassesToActionParts = function (elements) {
  for (const key in elements) {
    const classes = [];
    switch (true) {
      case key == "inputSwitch":
        classes.push("switch");
        break;
      case key == "actions":
        classes.push("book-actions");
        break;
      case key == "actionsDelete":
        classes.push("book-actions__delete", "text-btn");
        break;
      case key.startsWith("inputSwitch"):
        classes.push(key.replace("inputSwitch", "switch__").toLowerCase());
        break;
      default:
        classes.push(key);
    }

    classes.forEach((cls) => {
      elements[key].classList.add(cls);
    });
  }
};

const createActionsElement = function () {
  const allParts = {
    actions: document.createElement("div"),
    actionsDelete: document.createElement("button"),
    inputSwitch: document.createElement("label"),
    inputSwitchCheckbox: document.createElement("input"),
    inputSwitchSlider: document.createElement("span"),
    inputSwitchText: document.createElement("span"),
  };

  addClassesToActionParts(allParts);
  addTextToActionParts(allParts);

  const {
    inputSwitch,
    inputSwitchCheckbox,
    inputSwitchSlider,
    inputSwitchText,
    actionsDelete,
    actions,
  } = allParts;

  inputSwitch.append(inputSwitchCheckbox, inputSwitchSlider, inputSwitchText);
  actions.append(inputSwitch, actionsDelete);

  return actions;
};

const buildBookItem = function (bookObj) {
  const book = createBookElement(bookObj);
  const bookActions = createActionsElement();
  const gridItem = document.createElement("li");
  gridItem.append(book, bookActions);
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

const addBookToLibrary = function (form) {
  const book = new Book(form);

  library.push(book);

  // reset list
  bookListEl.textContent = "";

  library.forEach((book) => {
    const bookItemEl = buildBookItem(book);

    bookListEl.appendChild(bookItemEl);
  });
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(bookInputsEls);
  if (!formIsValid) return;

  const formObj = getFormObj(addBookFormEl);

  addBookToLibrary(formObj);
  addBookModalEl.close();

  resetInputs(bookInputsEls);
};

const onOpenAddBookModal = function () {
  addBookModalEl.showModal();
  addBookFormEl.addEventListener("submit", onSubmit);

  bookInputsEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });
};

btnsEls.forEach((btn) => {
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
