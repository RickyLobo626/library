import Library from "./Library.js";
import BookFormModal from "./BookFormModal.js";

const BookForm = (function () {
  const _el = document.getElementById("book-form");
  const _inputEls = [
    ...document.forms["book-form"].getElementsByTagName("input"),
  ];

  const resetInputs = function () {
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
    const formData = new FormData(_el);
    const obj = Object.fromEntries(formData);

    return obj;
  };

  const submitForm = function (e) {
    e.preventDefault();

    const formIsValid = _validateForm();

    if (!formIsValid) return;

    const formObj = _getFormObj(_el);

    Library.addBook(formObj);

    BookFormModal.close();

    resetInputs();
  };

  _inputEls.forEach((input) => {
    if (input.classList.contains("field")) {
      input.addEventListener("input", (e) => {
        input.classList.remove("form-control__field--invalid");
      });
    }
  });

  _el.addEventListener("submit", submitForm);

  return { resetInputs };
})();

export default BookForm;
