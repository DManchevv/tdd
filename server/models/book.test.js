const Book = require("./book");

describe('Book tests', () => {
    it('test book constructor', () => {
        const isbn = "test_isbn";
        const author = "test_author";
        const name = "test_name";

        const book = new Book({
            isbn: isbn,
            author: author,
            name: name
        });
        
        expect(book.isbn).toBe(isbn);
        expect(book.author).toBe(author);
        expect(book.name).toBe(name);
    });
});