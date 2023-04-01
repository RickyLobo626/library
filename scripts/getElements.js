export const getBookElements = function (bookObj) {
  const els = {
    container: document.createElement("div"),
    cover: document.createElement("div"),
    top: document.createElement("div"),
    title: document.createElement("p"),
    author: document.createElement("p"),
    bottom: document.createElement("div"),
    pages: document.createElement("p"),
    read: document.createElement("p"),
  };

  els.title.textContent = bookObj.title;
  els.author.textContent = bookObj.author;
  els.pages.textContent = `${bookObj.pages} pages`;
  els.read.innerHTML = bookObj.read ? "Read" : "Not read yet";

  els.container.classList.add("book");
  els.cover.classList.add("book__cover");
  els.top.classList.add("book__top");
  els.title.classList.add("book__title");
  els.author.classList.add("book__author");
  els.bottom.classList.add("book__bottom");
  els.pages.classList.add("book__pages");
  els.read.classList.add("book__read");

  els.bottom.append(els.pages, els.read);
  els.top.append(els.title, els.author);
  els.cover.append(els.top, els.bottom);
  els.container.appendChild(els.cover);

  return els;
};

export const getActionsElements = function () {
  const els = {
    container: document.createElement("div"),
    deleteBtn: document.createElement("button"),
    switch: document.createElement("label"),
    switchInput: document.createElement("input"),
    switchSlider: document.createElement("span"),
    switchText: document.createElement("span"),
  };

  els.switchInput.setAttribute("type", "checkbox");
  els.switchText.textContent = "read";
  els.deleteBtn.textContent = "delete";

  els.container.classList.add("book-actions");
  els.deleteBtn.classList.add("book-actions__delete", "text-btn");
  els.switch.classList.add("switch");
  els.switchInput.classList.add("switch__input");
  els.switchSlider.classList.add("switch__slider");
  els.switchText.classList.add("switch__text");

  els.switch.append(els.switchInput, els.switchSlider, els.switchText);

  els.container.append(els.switch, els.deleteBtn);

  return els;
};

export const getGridItemElement = function (book, actions) {
  const gridItem = document.createElement("li");
  gridItem.classList.add("grid__item");

  gridItem.append(book, actions);

  return gridItem;
};
