class ErrorModelNotFoundException extends Error {
  constructor(message = "Model data not found", data = {}) {
    super(message);
    this.name = "ErrorModelNotFoundException";
    this.data = data;
  }
}
module.exports = { ErrorModelNotFoundException };
