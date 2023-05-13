import { library } from "./library.js";

("use strict");

const btnEls = document.querySelectorAll("[data-click]");

const formModal = (function () {
  const el = document.getElementById("form-modal");
  const _overlayEl = document.getElementById("form-modal-overlay");
  const _formEl = document.getElementById("book-form");
  const _inputEls = document.querySelectorAll("[data-book-inputs]");

  _inputEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("keyup", (e) => {
        input.classList.remove("field--invalid");
      });
    }
  });

  const open = function () {
    _overlayEl.classList.remove("hidden");

    setTimeout(() => {
      el.classList.add("modal--open");
    }, 50);
  };

  const close = function () {
    setTimeout(() => {
      el.classList.remove("modal--open");
    }, 50);

    _overlayEl.classList.add("hidden");

    _resetInputs(_inputEls);
  };

  const _resetInputs = function () {
    _inputEls.forEach((input) => {
      if (input.getAttribute("type") == "checkbox") {
        input.checked = false;
      } else {
        input.classList.remove("field--invalid");
        input.value = "";
      }
    });
  };

  const _validateForm = function () {
    let isValid = true;

    _inputEls.forEach((input) => {
      if (input.value == "" && input.hasAttribute("required")) {
        input.classList.add("field--invalid");
        isValid = false;
      }
    });

    return isValid;
  };

  const _getFormObj = function (form) {
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);

    return obj;
  };

  const submitForm = function (e) {
    e.preventDefault();

    const formIsValid = _validateForm();

    if (!formIsValid) return;

    const formObj = _getFormObj(_formEl);

    library.addBook(formObj);

    close();

    _resetInputs();
  };

  _formEl.addEventListener("submit", submitForm);

  el.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return { el, open, close };
})();

btnEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.dataset.click) {
      case "open-book-form":
        formModal.open();
        break;
      case "close-book-form":
        formModal.close();
        break;
    }
  });
});
