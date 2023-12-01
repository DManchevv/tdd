const assert = require('assert');
const express = require('express');
const { dbClient, asyncErrorHandler, assertClient, parseStringToNumber } = require('../utils');
const Book = require('../book');
const router = express.Router();

router.use((req, res, next) => {
    // MIDDLEWARE

    next();
});

// ------------------------------------------------------------------------
// ENDPOINTS

router.get('/', asyncErrorHandler(async (req, res) => {
    let books = await dbClient.query(`
        SELECT *
        FROM books
    `);

    res.status(200).json(books);
}));

router.post('/add', asyncErrorHandler(async (req, res) => {
    assertClient(Book.validateBookInput(req.body.book), "Invalid input!");

    let book = new Book(req.body.book);
    let insertedBook = await book.insertBook();

    res.status(200).json(insertedBook);
}));

router.put('/edit/:id', asyncErrorHandler(async (req, res) => {
    assertClient(req.params.id != null, "Please provide book ID");
    assertClient(parseStringToNumber(req.params.id), "Book ID must be a number!");

    assertClient(req.body.book != null, "Please provide valid book information!");

    assertClient(Book.validateBookInput(req.body.book), "Invalid input!");
    
    let book = new Book(req.body.book);

    let updatedBook = await book.updateBook(req.params.id);

    res.status(200).json(updatedBook);
}));

// --------------------------------------------------------------------------
// HELPER FUNCTIONS

module.exports = router;