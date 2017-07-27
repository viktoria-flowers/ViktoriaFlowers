/* globals describe, beforeEach, it*/

const { expect } = require('chai');
const request = require('supertest');
const testProducts = require('../utils/fake-products');
const exitsSubscriber = { subscribeEmail: 'exits@one.com' };

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
                        return _db.collection('emailsubscribers')
                            .insertOne(exitsSubscriber);
                    })
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
        });
    });

    describe('Api post subscribers', () => {
        it('Expect to return error', (done) => {
            request(app)
                .post('/api/subscribe')
                .type('application/json')
                .send({ subscribeEmail: exitsSubscriber.subscribeEmail })
                .expect(400)
                .end((err, response) => {
                    if (err) {
                        done(err);
                    }

                    expect(response.body).to.be.equal('email-exists');
                    done();
                });
        });

        it('Expect to add new subscriber', (done) => {
            request(app)
                .post('/api/subscribe')
                .type('application/json')
                .send({ subscribeEmail: 'new@email.com' })
                .expect(201)
                .end((err, response) => {
                    if (err) {
                        done(err);
                    }

                    expect(response.body).to.be.deep.equal({
                        message: 'E-mail added in the list',
                    });
                    done();
                });
        });
    });

    afterEach(function() {
        return db.dropDatabase();
    });
});
