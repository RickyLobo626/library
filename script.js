const btns = document.querySelectorAll("[data-btn]");
const modal = document.getElementById("modal");

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
