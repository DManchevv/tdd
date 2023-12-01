const pg_promise = require("pg-promise");

const config = require('./supp/config.js');

const { client, staff, audit, db: db_conf_session } = require("../database/db_conf.js");

const db = require("../database/db.js");
const ClientError = require("./customErrors/ClientError.js");

module.exports.dbClient = db(client.user, client.password, client.host, client.port, client.database);

//export const dbStaff = db(staff.user, staff.password, staff.host, staff.port, staff.database);

//export const dbAudit = db(audit.user, audit.password, audit.host, audit.port, audit.database);

module.exports.asyncErrorHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(err => {
            next(err);
        });
};

module.exports.assertClient = (value, errorMessage = "Client Error") => {
    if (!value) {
        throw new ClientError(config.http.CLIENT_ERR, errorMessage);
    }
}

module.exports.sendRequestResponse = (res, data, statusCode, message) => {
    let responseJSON = {};

    if ((statusCode < config.http.OK && statusCode > config.http.NETWORK_AUTHENTICATION_REQUIRED) || !Number.isInteger(statusCode)) {
        throw Error('Invalid status Code!');
    }

    if (data != null) {
        responseJSON.data = data;
    }

    if (message != null) {
        responseJSON.message = message;
    }

    if (statusCode == config.http.SERVER_ERR && message == null) {
        responseJSON.message = "Application Error!";
    }

    res.status(statusCode).json(responseJSON);
    return;
}

module.exports.parseStringToNumber = (number) => {
    return !Number.isNaN(parseInt(number));
}