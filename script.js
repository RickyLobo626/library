const btns = document.querySelectorAll("[data-btn]");

let myLibrary = [];

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

console.log(btns);

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.dataset.btn == "add-btn") {
    }
  });
});
