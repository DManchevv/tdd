const { dbClient } = require("./utils");

module.exports = class Book {
    isbn;
    author;
    name;

    constructor(book) {
        this.isbn = book.isbn;
        this.author = book.author;
        this.name = book.name;
    }

    get isbn() {
        return this.isbn;
    }

    get author() {
        return this.author;
    }

    get name() {
        return this.name;
    }

    static validateBookInput(obj) {
        return obj != null
            && obj.isbn != null
            && obj.author != null
            && obj.name != null;
    }

    async insertBook() {
        let insertedBook = await dbClient.one(`
            INSERT
            INTO books
            (isbn, author, name)
            SELECT $1, $2, $3
            RETURNING *
        `, [this.isbn, this.author, this.name]);

        return insertedBook;
    }

    async updateBook(id) {
        let updatedBook = await dbClient.one(`
            UPDATE books
            SET isbn = $1,
                author = $2,
                name = $3
            WHERE id = $4
            RETURNING *
        `, [this.isbn, this.author, this.name, id]);
        
        return updatedBook;
    }
}

