/* globals describe, beforeEach, it*/

const { expect } = require('chai');
const request = require('supertest');
const testProducts = require('../utils/test-products');
const testUsers = require('../utils/test-users');
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
                return _db
                    .collection('products')
                    .insertMany(testProducts)
                    .then(() => {
                        return _db
                            .collection('emailsubscribers')
                            .insertOne(exitsSubscriber);
                    })
                    .then(() => {
                        return _db
                            .collection('users')
                            .insertMany(testUsers);
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
        it('Expect to return correct titles', (done) => {
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

        it('Expect to return empty array if no parameter provided', (done) => {
            request(app)
                .get('/api/autocomplete')
                .expect(200)
                .set('Accept', 'application/json')
                .then((response) => {
                    expect(response.body).to.be.an('array');
                    expect(response.body.length).to.be.equal(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });

        it('Expect to 400 error', (done) => {
            request(app)
                .get('/api/autocomplete')
                .query({ name: 'invalid-prod' })
                .expect(200)
                .end((err, response) => {
                    if (err) {
                        done(err);
                    }

                    expect(response.body).to.be.deep.equal([]);
                    return done();
                });
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
                    return done();
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
                        return done(err);
                    }

                    expect(response.body).to.be.deep.equal({
                        message: 'E-mail added in the list',
                    });
                    return done();
                });
        });

        it('Expect to return error if email is invalid', (done) => {
            request(app)
                .post('/api/subscribe')
                .type('application/json')
                .send({ subscribeEmail: 'new  @ .com' })
                .expect(400)
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    expect(response.body).to.be.deep.equal(['email']);
                    return done();
                });
        });
    });

    describe('Delete product tests', () => {
        it('Expect to delete a product', (done) => {
            const idToDelete = testProducts[0]._id.toString();
            const agent = request.agent(app);
            agent
                .post('/login')
                .send({ username: 'Administrator', password: '123456' })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    // user is authenticated here (Admin)
                    return agent
                        .post('/api/delete-product')
                        .type('application/json')
                        .send({ _id: idToDelete })
                        .expect(200)
                        .end((innerErr, response) => {
                            if (innerErr) {
                                return done(innerErr);
                            }

                            expect(response.body).to.be.deep.equal({
                                message: 'OK',
                            });
                            return done();
                        });
                });
        });
    });

    describe('Contact us tests', () => {
        it('Expect to add contact information', (done) => {
            request(app)
                .post('/api/contactUs')
                .type('application/json')
                .send({
                    contactUserNames: 'Sample Operator',
                    contactUserEmail: 'sample@offices.com',
                    contactUserText: 'Your site si well tested',
                })
                .expect(201)
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    expect(response.body).to.be.deep.equal({ message: 'OK' });
                    return done();
                });
        });

        it('Expect to return error if information is incorrect', (done) => {
            request(app)
                .post('/api/contactUs')
                .type('application/json')
                .send({
                    contactUserNames: 'Invalid requires',
                    contactUserEmail: 'invalid @ em ail@.com',
                    contactUserText: 'Test should return error',
                })
                .expect(400)
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    expect(response.body).to.be.deep.equal(['email']);
                    return done();
                });
        });
    });

    // TODO It seems the method is not ready for testing
    describe.skip('Checkout tests', () => {
        it('Expect to return all products', (done) => {
            const agent = request.agent(app);
            const productIds = testProducts
                .slice(1, 3)
                .map((prod) => {
                    return prod._id.toString();
                });

            agent
                .post('/login')
                .send({ username: 'User_00001', password: '123456' })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return agent
                        .post('/api/checkout')
                        .send({ ids: productIds })
                        .expect(200)
                        .end((innerErr, response) => {
                            if (innerErr) {
                                return done(innerErr);
                            }

                            expect(response.body).to.be.an('array')
                                .with.property('length')
                                .that.is.equal(3);

                            return done();
                        });
                });
        });
    });

    describe('Get products tests', () => {
        it('Expect ot return all product without type', (done) => {
            request(app)
                .get('/api/products')
                .expect(200)
                .expect('content-type', 'text/html; charset=utf-8')
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    const pattern = RegExp('col-md-4 top_brand_left', 'ig');
                    const matches = response.text.match(pattern);
                    if (!matches) {
                        return done('Cannot find product selector');
                    }

                    expect(matches.length).to.be.equal(12);
                    return done();
                });
        });

        it('Expect to return products from same type', (done) => {
            const pots = testProducts.filter((prod) => {
                return prod.type === 'pots';
            });

            request(app)
                .get('/api/products/pots')
                .expect(200)
                .expect('content-type', 'text/html; charset=utf-8')
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    const pattern = RegExp('col-md-4 top_brand_left', 'ig');
                    const matches = response.text.match(pattern);
                    if (!matches) {
                        return done('Cannot find product selector');
                    }

                    expect(matches.length).to.be.equal(pots.length);
                    return done();
                });
        });


        it('Expect to return error message with message', (done) => {
            const expectObj = {
                message: `Wrong type: invalid`,
            };

            request(app)
                .get('/api/products/invalid')
                .expect(400)
                .expect('content-type', 'application/json; charset=utf-8')
                .end((err, response) => {
                    if (err) {
                        return done(err);
                    }

                    expect(response.body).to.be.deep.equal(expectObj);
                    return done();
                });
        });
    });

    afterEach(function () {
        return db.dropDatabase();
    });
});
