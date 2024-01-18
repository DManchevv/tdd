const fs = require('fs');
//const { parse: stackTraceParse } = import("stack-trace");
const config = require("../supp/config.js");
const { sendRequestResponse } = require("../utils.js");
const NotFound404Error = require("./NotFound404Error.js");
const BaseError = require("./BaseError.js");
const path = require('path');
const ClientError = require('./ClientError.js');

const errorLogger = fs.createWriteStream(path.resolve('./logs/error.log'), { flags: 'a' });

function logError(req, err) {
    console.error(err);
    console.log("LOG_ERROR");
    const DELIMITER_POSITION = 7;
    const SPLIT_DELIMITER = '/';
//    const trace = stackTraceParse(err);
 //   let shortTrace = trace[0]
 //       .getFileName()
 //       .split(SPLIT_DELIMITER)
  //      .slice(DELIMITER_POSITION)
  //      .join(SPLIT_DELIMITER);

//    let lineNumber = trace[0].getLineNumber();

    if (err instanceof Error) {
        //let errMsg = (err.stack).split('\n')[0];
        let timestamp = new Date;
        let year = timestamp.getFullYear();
        let month = timestamp.getMonth() + 1;
        let monthStr = (month >= 10) ? month : `0${month}`;
        let day = timestamp.getDate();
        let dayStr = (day >= 10) ? day : `0${day}`;
        let hours = timestamp.getHours();
        let hoursStr = (hours >= 10) ? hours : `0${hours}`;
        let minutes = timestamp.getMinutes();
        let minutesStr = (minutes >= 10) ? minutes : `0${minutes}`;
        let seconds = timestamp.getSeconds();
        let secondsStr = (seconds >= 10) ? seconds : `0${seconds}`;
        let curHrefMsg = (req.originalUrl == undefined) ? "Външен за системата адрес." : req.originalUrl;
        let timestampStr = `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
        let curStaffUser = req.session && req.session.staffname ? req.session.staffname : "-";
        let curUser = req.session && req.session.username ? req.session.username : "-";
        errorLogger.write(`[${timestampStr}] \t [user: ${curUser}] \t [staff user: ${curStaffUser}] [${curHrefMsg}]]`);
        //errorLogger.write(`[${timestampStr}] \t [user: ${curUser}] \t [staff user: ${curStaffUser}] [${curHrefMsg}] \t [${errMsg}] \t [/${shortTrace}] \t [${lineNumber}]`);
        errorLogger.write('\n');
    }
}

module.exports.logErrorMiddleware = function logErrorMiddleware(err, req, res, next) {
    logError(req, err);
    next(err);
}

module.exports.returnError = function returnError(err, req, res, next) {
    console.log("IN RETURN ERROR");

    if (err instanceof NotFound404Error) {
        sendRequestResponse(res, null, config.http.NOT_FOUND, null);
        return;
    }

    if (err instanceof ClientError) {
        sendRequestResponse(res, null, err.statusCode, err.message);
        return;
    }

    if (err.code == 23505) {
        sendRequestResponse(res, null, config.http.CLIENT_ERR, "Invalid input - data already exists!");
        return;
    }

    sendRequestResponse(res, null, config.http.SERVER_ERR, null);

    return;
}

module.exports.isOperationalError = function isOperationalError(err) {
    if (err instanceof BaseError) {
        return err.isOperational;
    }

    return false;
}