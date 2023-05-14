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

const createBodyEls = function (data) {
  const bookEl = createEl("div", "book");
  const coverEl = createEl("div", "book__cover");
  const topEl = createEl("div", "book__top");
  const titleEl = createEl("p", "book__title", data.title);
  const authorEl = createEl("p", "book__author", data.author);
  const bottomEl = createEl("div", "book__bottom");
  const pagesEl = createEl("p", "book__pages", data.pages);
  const readEl = createEl(
    "p",
    "book__read",
    data.read ? "Read" : "Not read yet"
  );

  bottomEl.append(pagesEl, readEl);
  topEl.append(titleEl, authorEl);
  coverEl.append(topEl, bottomEl);
  bookEl.appendChild(coverEl);

  return { bookEl, readEl };
};

const createActionEls = function () {
  const actionsEl = createEl("div", "book-actions");
  const switchLabelEl = createEl("label", "switch");
  const switchInputEl = createEl("input", "switch__input");
  const switchSliderEl = createEl("span", "switch__slider");
  const switchTextEl = createEl("span", "switch__text", "read");
  const deleteBtnEl = createEl(
    "button",
    ["book-actions__delete", "text-btn"],
    "delete"
  );

  switchInputEl.setAttribute("type", "checkbox");

  switchLabelEl.append(switchInputEl, switchSliderEl, switchTextEl);
  actionsEl.append(switchLabelEl, deleteBtnEl);

  return { actionsEl, switchInputEl, deleteBtnEl };
};

export const createBookEl = function (data) {
  const el = createEl("li", "grid__item");
  const { bookEl, readEl } = createBodyEls(data);
  const { actionsEl, switchInputEl, deleteBtnEl } = createActionEls(data);

  if (data.read) switchInputEl.setAttribute("checked", true);

  el.append(bookEl, actionsEl);

  return { el, readEl, switchInputEl, deleteBtnEl };
};
