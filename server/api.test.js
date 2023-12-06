const request = require('supertest');
const app = require('./app');
let server;

beforeAll(done => {
    done()
  });

  beforeEach(() => {
    server = app.listen(3000);
 })

describe('API Tests', () => {
    it('should retrieve all books', async () => {
        const res = await request(app).get('/api/books/');
        expect(res.statusCode).toBe(200);
    });

    it('missing book information client error', async () => {
        const res = await request(app).put('/api/books/edit/1');
        expect(res.statusCode).toBe(400);
    });

    it('wrong id client error', async () => {
        const res = await request(app).put('/api/books/edit/asd');
        expect(res.statusCode).toBe(400);
    });

    it('should return invalid input client error', async () => {
        const res = await request(app).put('/api/books/edit/1').send({
            "book": {
                "isbna": 'asd',
                'name': 'testbook',
                'author': 'mitko'
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid input!');
    });

    it('should update book', async () => {
        const res = await request(app).put('/api/books/edit/1').send({
            "book": {
                "isbn": 'asd',
                'name': 'testbook',
                'author': 'mitko'
            }
        });

        expect(res.statusCode).toBe(200);
    });

    it('should return missing info', async () => {
        const res = await request(app).post('/api/books/add').send();

        expect(res.statusCode).toBe(400);
    });

    it('should return invalid input book', async () => {
        const res = await request(app).post('/api/books/add').send({
            "book": {
                "isbn1": 'asdc',
                'name': 'testbook',
                'author': 'mitko'
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid input!');
    });

    it('should create book', async () => {
        const res = await request(app).post('/api/books/add').send({
            "book": {
                "isbn": 'asdc',
                'name': 'testbook',
                'author': 'mitko'
            }
        });

        expect(res.statusCode).toBe(200);
    });

    it('should return book', async() => {
        const res = await request(app).get('/api/books/1');

        expect(res.statusCode).toBe(200);
    });
    
    it('should return all libraries', async() => {
        const res = await request(app).get('/api/libraries');

        expect(res.statusCode).toBe(200);
    });

    it('should return invalid input library', async () => {
        const res = await request(app).post('/api/libraries/add').send({
            "book": {
                "isbn1": 'asdc',
                'name': 'testbook',
                'author': 'mitko'
            }
        });

        expect(res.statusCode).toBe(400);
    });
});

afterEach(() => {
    server.close()
 });

afterAll(done => {
    done();
  })