import { fakeStorage } from "./fakeStorage.js";
import { library } from "./library.js";

("use strict");

const btnEls = document.querySelectorAll("[data-click]");

const formModal = (function () {
  const el = document.getElementById("form-modal");
  const _overlayEl = document.getElementById("form-modal-overlay");
  const _formEl = document.getElementById("book-form");
  const _inputEls = [
    ...document.forms["book-form"].getElementsByTagName("input"),
  ];

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
        input.classList.remove("form-control__field--invalid");
        input.value = "";
      }
    });
  };

  const _validateForm = function () {
    let isValid = true;

    _inputEls.forEach((input) => {
      let errorMsg = "";
      const minPages = 1;
      const maxPages = 99999;

      if (input.type == "number") console.log(input.value);

      if (input.value === "" && input.hasAttribute("required")) {
        errorMsg = "This field is required";
      }

      if (
        input.type == "number" &&
        (input.value < minPages || input.value > maxPages)
      ) {
        errorMsg = `Value must be a number between ${minPages} and ${maxPages}`;
      }

      if (errorMsg) {
        input.classList.add("form-control__field--invalid");
        input.nextElementSibling.textContent = errorMsg;
        isValid = false;
      }
    });

    return isValid;
  };

  const _getFormObj = function () {
    const formData = new FormData(_formEl);
    const obj = Object.fromEntries(formData);

    return obj;
  };

  const submitForm = function (e) {
    e.preventDefault();

    const formIsValid = _validateForm();

    if (!formIsValid) return;

    const formObj = _getFormObj(_formEl);
    console.log(formObj);
    library.addBook(formObj);

    close();

    _resetInputs();
  };

  _inputEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("input", (e) => {
        input.classList.remove("form-control__field--invalid");
      });
    }
  });

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

fakeStorage.forEach((book) => {
  library.addBook(book);
});
