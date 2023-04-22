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

const createBookBodyEls = function (bookObj) {
  const book = createEl("div", "book");
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
  book.appendChild(cover);

  return { book, read };
};

const createBookActionsEls = function (bookObj) {
  const actions = createEl("div", "book-actions");
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
  actions.append(switchLabel, deleteBtn);

  return { actions, switchInput, deleteBtn };
};

export const createBookEl = function (bookObj) {
  const el = createEl("li", "grid__item");
  const { book, read } = createBookBodyEls(bookObj);
  const { actions, switchInput, deleteBtn } = createBookActionsEls(bookObj);

  el.append(book, actions);

  return {
    el,
    switchInput,
    deleteBtn,
    toggleRead(flag) {
      read.textContent = flag ? "Read" : "Not read yet";
    },
  };
};
