export const createBookElement = function (bookObj) {
  const book = document.createElement("div");
  const bookCover = document.createElement("div");
  const bookTop = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookBottom = document.createElement("div");
  const bookPages = document.createElement("p");
  const bookRead = document.createElement("p");

  bookTitle.textContent = bookObj.title;
  bookAuthor.textContent = bookObj.author;
  bookPages.textContent = `${bookObj.pages} pages`;
  bookRead.textContent = bookObj.read ? "Finished" : "Not read yet";

  book.classList.add("book");
  bookCover.classList.add("book__cover");
  bookTop.classList.add("book__top");
  bookTitle.classList.add("book__title");
  bookAuthor.classList.add("book__author");
  bookBottom.classList.add("book__bottom");
  bookPages.classList.add("book__pages");
  bookRead.classList.add("book__read");

  bookBottom.append(bookPages, bookRead);
  bookTop.append(bookTitle, bookAuthor);
  bookCover.append(bookTop, bookBottom);
  book.appendChild(bookCover);

  return book;
};

export const createActionsElement = function (index) {
  const bookActions = document.createElement("div");
  const bookActionsDelete = document.createElement("button");
  const bookActionsSwitch = document.createElement("label");
  const bookActionsSwitchCheckbox = document.createElement("input");
  const bookActionsSwitchSlider = document.createElement("span");
  const bookActionsSwitchText = document.createElement("span");

  bookActionsSwitchCheckbox.setAttribute("type", "checkbox");
  bookActionsSwitchCheckbox.setAttribute("data-book-actions", index);
  bookActionsDelete.setAttribute("data-book-actions", index);
  bookActionsSwitchText.textContent = "read";
  bookActionsDelete.textContent = "delete";

  bookActions.classList.add("book-actions");
  bookActionsDelete.classList.add("book-actions__delete", "text-btn");
  bookActionsSwitch.classList.add("switch");
  bookActionsSwitchCheckbox.classList.add("switch__checkbox");
  bookActionsSwitchSlider.classList.add("switch__slider");
  bookActionsSwitchText.classList.add("switch__text");

  bookActionsSwitch.append(
    bookActionsSwitchCheckbox,
    bookActionsSwitchSlider,
    bookActionsSwitchText
  );

  bookActions.append(bookActionsSwitch, bookActionsDelete);

  return bookActions;
};
