class ErrorQueryException extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = "ErrorQueryException";
    this.data = data;
  }
}

module.exports = {
  ErrorQueryException,
};
