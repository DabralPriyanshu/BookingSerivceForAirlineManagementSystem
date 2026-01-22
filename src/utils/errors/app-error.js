const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(name, message, explanation, statusCode) {
    super();
    let explanations = [];
    error.errors.forEach((e) => {
      explanation.push(e.message);
    });
    this.name = name;
    this.message = message;
    this.explanation = explanations;
    this.statusCode = statusCode;
  }
}
module.exports = AppError;
