const { dbClient } = require("../utils")

module.exports = class Library {
    constructor(library) {
        this.id = library.id;
        this.name = library.name;
    }

    static validateLibrary(library) {
        return library != null
            && library.name != null;
    }

    async insertLibrary() {
        let library = await dbClient.one(`
            INSERT
            INTO libraries
            (name)
            SELECT $1
            RETURNING *
        `, [this.name]);

        return library;
    }

    async updateLibrary(id) {
        let updatedLibrary = await dbClient.one(`
            UPDATE libraries
            SET name = $1
            WHERE id = $2
            RETURNING *
        `, [this.name, id]);
        
        return updatedLibrary;
    }

    async addBookToLibrary(bookID) {
        let addedPair = await dbClient.one(`
            UPDATE books
            SET library_id = $1
            WHERE id = $2
            RETURNING *
        `, [this.id, bookID]);

        return addedPair;
    }


}

