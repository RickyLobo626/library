const btns = document.querySelectorAll("[data-btn]");
const inputs = document.querySelectorAll("[data-input]");
const modal = document.getElementById("modal");

let myLibrary = [];
let form = {
  title: "",
  author: "",
  pages: null,
  read: false,
};

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.getInfo = function () {
  const readStr = this.read ? "completed" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages}, ${readStr}.`;
};

function addBookToLibrary() {
  // do stuff here
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.btn) {
      case "add-book":
        modal.showModal();
        break;
      case "close-modal":
        modal.close();
        break;
    }
  });
});

inputs.forEach((input) => {
  if (input.dataset.input == "read") {
    input.addEventListener("click", (e) => {
      form[input.name] = input.checked;
      console.log(form);
    });
  } else {
    input.addEventListener("keyup", (e) => {
      form[input.name] = +input.value;
    });
  }
});
