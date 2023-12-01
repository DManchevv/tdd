const config = require("../supp/config.js");

const BaseError = require("./BaseError.js");

module.exports = class NotFound404Error extends BaseError {
    constructor(statusCode = config.http.NOT_FOUND, errorMessage = 'Not Found.', isOperational = true) {
        super(statusCode, isOperational, errorMessage);
    }
}