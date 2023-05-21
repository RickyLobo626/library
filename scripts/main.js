import fakeStorage from "./storage/fakeStorage.js";
import Library from "./modules/Library.js";
import BookFormModal from "./modules/BookFormModal.js";

("use strict");

const btnEls = document.querySelectorAll("[data-click]");

btnEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.click) {
      case "open-book-form":
        BookFormModal.open();
        break;
      case "close-book-form":
        BookFormModal.close();
        break;
    }
  });
});

fakeStorage.forEach((book) => {
  Library.addBook(book);
});
