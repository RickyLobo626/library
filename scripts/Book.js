export default function Book(book) {
  this.title = book.title;
  this.author = book.author;
  this.pages = book.pages;
  this.read = !!book.read;
}

Book.prototype.getInfo = function () {
  const readStr = this.read ? "completed" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pages}, ${readStr}.`;
};
