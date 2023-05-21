export const createEl = function (tag, styleClasses, content) {
  const el = document.createElement(tag);

  el.textContent = content;

  if (Array.isArray(styleClasses)) {
    el.classList.add(...styleClasses);
  } else {
    el.classList.add(styleClasses);
  }

  return el;
};
