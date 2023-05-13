import { Library } from "./Library.js";

("use strict");

const libraryEl = document.getElementById("library");
const formModalEl = document.getElementById("form-modal");
const formModalOverlayEl = document.getElementById("form-modal-overlay");
const formEl = document.getElementById("book-form");
const formInputEls = document.querySelectorAll("[data-book-inputs]");
const btnEls = document.querySelectorAll("[data-click]");

const library = Library(libraryEl);

const resetInputs = function (inputs) {
  inputs.forEach((input) => {
    if (input.getAttribute("type") == "checkbox") {
      input.checked = false;
    } else {
      input.classList.remove("field--invalid");
      input.value = "";
    }
  });
};

const validateForm = function (inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.value == "" && input.hasAttribute("required")) {
      input.classList.add("field--invalid");
      isValid = false;
    }
  });

  return isValid;
};

const getFormObj = function (form) {
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);

  return obj;
};

const onSubmit = function (e) {
  e.preventDefault();

  const formIsValid = validateForm(formInputEls);

  if (!formIsValid) return;

  const formObj = getFormObj(formEl);

  library.addBook(formObj);

  closeFormModal();

  resetInputs(formInputEls);
};

const openFormModal = function () {
  formModalOverlayEl.classList.remove("hidden");

  setTimeout(() => {
    formModalEl.classList.add("modal--open");
  }, 50);

  formEl.addEventListener("submit", onSubmit);

  formInputEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });
};

const closeFormModal = function () {
  setTimeout(() => {
    formModalEl.classList.remove("modal--open");
  }, 50);

  formModalOverlayEl.classList.add("hidden");

  resetInputs(formInputEls);
};

btnEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.click) {
      case "open-book-form":
        openFormModal();
        break;
      case "close-book-form":
        closeFormModal();
        break;
    }
  });
});

formModalEl.addEventListener("click", (e) => {
  e.stopPropagation();
});
