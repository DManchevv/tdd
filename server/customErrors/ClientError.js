const config = require("../supp/config.js");
const assert = require("assert");
const BaseError = require("./BaseError.js");

module.exports = class ClientError extends BaseError {
    constructor(statusCode = config.http.CLIENT_ERR, errorMessage = 'Client Error', isOperational = true) {
        assert(Number.isInteger(statusCode), "Status code is not integer in Client Error builder!");
        assert(isOperational == true || isOperational == false, "isOperational is not boolean in Client Error builder!");
        super(statusCode, isOperational, errorMessage);
    }
}