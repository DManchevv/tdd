const express = require('express');
const config = require("./supp/config.js");
const assert = require("assert");
const { dbClient } = require('./utils.js');
const router = express.Router();
const booksRouter = require('./routes/booksRouter.js');
const librariesRouter = require('./routes/libraryRouter.js');
const { logErrorMiddleware, returnError } = require("./customErrors/errorHandler.js");
const NotFound404Error = require('./customErrors/NotFound404Error.js');

try {
    const app = express();
    
    app.use(express.json({limit: '50mb'}));
    app.use(express.static(`${__dirname}/static`));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use('/books', booksRouter)
       .use('/libraries', librariesRouter);

    app.get('*', (req, res) => {
        throw new NotFound404Error();
    });

    app.use(logErrorMiddleware);
    app.use(returnError);

    app.listen(config.nodePort, () => {
        console.log(`Starting server on port ${config.nodePort}`);
    });
}
catch (err) {
    console.error("CRITICAL_ERROR", err);
}