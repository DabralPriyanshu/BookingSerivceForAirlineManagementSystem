const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.forEach((e) => {
      explanation.push(e.message);
    });
    this.name = "ValidationError";
    this.message = "Not able to validate data in the incoming request";
    this.explanation = explanation;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = ValidationError;
