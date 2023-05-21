const CreateBook = function (bookId, data) {
  /*** DATA ***/

  const _id = bookId;
  const _title = data.title;
  const _author = data.author;
  const _pages = data.pages;
  let _read = !!data.read;

  const toggleRead = function (flag) {
    _read = flag;
  };

  /*** PUBLIC ***/
  const getInfo = function () {
    const readStr = _bookObj.read ? "completed" : "not read yet";

    return `${_bookObj.title} by ${_bookObj.author}, ${_bookObj.pages}, ${readStr}.`;
  };

  const getters = {
    get id() {
      return _id;
    },

    get title() {
      return _title;
    },

    get author() {
      return _author;
    },

    get read() {
      return _read;
    },

    get pages() {
      return _pages;
    },

    get author() {
      return _author;
    },
  };

  return {
    ...getters,
    toggleRead,
    getInfo,
  };
};

export default CreateBook;
