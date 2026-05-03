// error/authentication.error.js

class ErrorAuthenticationException extends Error {
 
  constructor(message = "Authentication failed", data = {}, statusCode = 401) {
    super(message);
    this.name = "ErrorAuthenticationException";
    this.data = data;
    this.statusCode = statusCode;
  }
}

module.exports = {
  ErrorAuthenticationException
}
