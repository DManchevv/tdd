const assert = require('assert');
const express = require('express');
const { dbClient, asyncErrorHandler, assertClient, parseStringToNumber } = require('../utils');
const Library = require('../models/library');
const router = express.Router();

router.use((req, res, next) => {
    // MIDDLEWARE

    next();
});

// ------------------------------------------------------------------------
// ENDPOINTS

router.get('/', asyncErrorHandler(async (req, res, next) => {
     let libraries = await getAllLibraries();

     res.status(200).json(libraries);
}));

router.post('/add', asyncErrorHandler(async (req, res, next) => {
    assertClient(Library.validateLibrary(req.body.library), "Invalid input!");

    let library = new Library(req.body.library);

    let insertedLibrary = await library.insertLibrary();

    res.status(200).json(insertedLibrary);
}));

router.put('/edit/:id', asyncErrorHandler(async (req, res, next) => {
    let id = req.params.id;

    assertClient(id != null, "Please provide library ID");
    assertClient(parseStringToNumber(id), "Library ID must be a number!");
    assertClient(req.body.library != null, "Please provide library information!");
    assertClient(Library.validateLibrary(req.body.library), "Invalid input!");

    let library = new Library(req.body.library);

    let updatedLibrary = await library.updateLibrary(id);

    res.status(200).json(updatedLibrary);
}));

router.post('/:id/addBook', asyncErrorHandler(async (req, res, next) => {
    let id = req.params.id;
    
    assertClient(id != null, "Please provide library ID");
    assertClient(parseStringToNumber(id), "Library ID must be a number!");

    // TODO: Use book ISBN instead of ID
    assertClient(req.body.bookID != null, "Please provide book ID!");

    let _library = await getLibrary(req.params.id);

    _library.id = id;

    let library = new Library(_library);

    await library.addBookToLibrary(req.body.bookID);

    res.status(200);
}));

// --------------------------------------------------------------------------
// HELPER FUNCTIONS


async function getLibrary(id) {
    let library = await dbClient.one(`
        SELECT *
        FROM libraries
        WHERE id =$1
    `, [id]);

    return library;
}

async function getAllLibraries() {
    let libraries = await dbClient.query(`
        SELECT *
        FROM libraries
    `);

    return libraries;
}

module.exports = router;