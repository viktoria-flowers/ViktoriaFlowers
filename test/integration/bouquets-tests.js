/*globals describe, beforeEach, it*/ 

const { expect } = require('chai');
const request = require('supertest');

describe('/bouquets tests', () => {
    const connectionString = 'mongodb://localhost/bouquets-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /bouquets', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/items')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});