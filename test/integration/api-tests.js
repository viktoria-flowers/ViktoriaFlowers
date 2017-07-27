/* globals describe, beforeEach, it*/

const { expect } = require('chai');
const request = require('supertest');
const testProducts = require('../utils/fake-products');

describe('/API tests', () => {
    const connectionString = 'mongodb://localhost/products-db-test';
    let app = null;
    let db = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((_db) => {
                db = _db;
                return _db.collection('products').insertMany(testProducts)
                    .then(() => {
                        return require('../../data').init(_db);
                    });
            })
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /api/autocomplete', () => {
        it('expect to return correct titles', (done) => {
            const titles = testProducts
                .filter((prod) => {
                    return prod.title.toLowerCase().indexOf('rose') !== -1;
                })
                .map((prod) => {
                    return prod.title;
                });


            request(app)
                .get('/api/autocomplete?name=rose')
                .expect(200)
                .set('Accept', 'application/json')
                .then((response) => {
                    let msg = 'Expected: ' + JSON.stringify(titles);
                    msg += '\n Actual:' + JSON.stringify(response.body) + '\n';
                    expect(response.body, msg).to.be.deep.equal(titles);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('Expect to return all if no parameter provided', (done) => {
            request(app)
                .get('/api/autocomplete')
                .expect(200)
                .set('Accept', 'application/json')
                .then((response) => {
                    expect(response.body).to.be.an('array');
                    expect(response.body.length)
                        .to.be.equal(testProducts.length);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });


        it('Expect to 400 error', (done) => {
            request(app)
                .get('/api/autocomplete')
                .query({ name: 'invalid-prod' })
                .expect(400, (err) => done(err));
            //    .then((d) => done(d))
            //    .catch((err) => done(err));
        });
    });

    afterEach(function() {
        return db.dropDatabase();
    });
});
