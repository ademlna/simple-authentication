class DuplicateDataException extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = "DuplicateDataException";
    this.data = data;
  }
}

module.exports = {
  DuplicateDataException,
};
