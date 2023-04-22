const createEl = function (tag, styleClasses, content) {
  const el = document.createElement(tag);

  el.textContent = content;

  if (Array.isArray(styleClasses)) {
    el.classList.add(...styleClasses);
  } else {
    el.classList.add(styleClasses);
  }

  return el;
};

export const createBookElements = function (bookObj) {
  const container = createEl("div", "book");
  const cover = createEl("div", "book__cover");
  const top = createEl("div", "book__top");
  const title = createEl("p", "book__title", bookObj.title);
  const author = createEl("p", "book__author", bookObj.author);
  const bottom = createEl("div", "book__bottom");
  const pages = createEl("p", "book__pages", bookObj.pages);
  const read = createEl(
    "p",
    "book__read",
    bookObj.read ? "Read" : "Not read yet"
  );

  bottom.append(pages, read);
  top.append(title, author);
  cover.append(top, bottom);
  container.appendChild(cover);

  return { container, read };
};

export const createActionsElements = function () {
  const container = createEl("div", "book-actions");
  const switchLabel = createEl("label", "switch");
  const switchInput = createEl("input", "switch__input");
  const switchSlider = createEl("span", "switch__slider");
  const switchText = createEl("span", "switch__text", "read");
  const deleteBtn = createEl(
    "button",
    ["book-actions__delete", "text-btn"],
    "delete"
  );

  switchInput.setAttribute("type", "checkbox");

  switchLabel.append(switchInput, switchSlider, switchText);
  container.append(switchLabel, deleteBtn);

  return { container, switchInput, deleteBtn };
};

export const createGridItemElement = function (book, actions) {
  const gridItem = createEl("li", "grid__item");

  gridItem.append(book, actions);

  return gridItem;
};
