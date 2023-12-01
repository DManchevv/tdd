module.exports = class BaseError extends Error {
    constructor(statusCode, isOperational, errorMessage) {
        super(errorMessage);

        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this);
    }
}