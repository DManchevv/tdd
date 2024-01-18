const Library = require("./library");

describe('Library tests', () => {
    it('test library constructor', () => {
        const id = 1;
        const name = "test_name";

        const library = new Library({
            id: id,
            name: name
        });

        expect(library.books).toMatchObject([]);
        expect(library.id).toBe(id);
        expect(library.name).toBe(name);
    });
});