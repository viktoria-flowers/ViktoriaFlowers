/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setLocals } = require('../../../../app/middlewares');
const { getResponseMock } = require('../../mocks-req-res');

describe('Middleware setLocals() tests', () => {
    let isNextCalled = false;
    const next = () => {
        isNextCalled = true;
    };

    beforeEach(() => {
        isNextCalled = false;
    });

    it('Expect to set non authenticated when user is missing', () => {
        const res = getResponseMock();
        res.locals = {};
        setLocals({}, res, next);

        expect(res.locals.isAuthenticated).to.be.false;
        expect(res.locals.username).to.be.equal('');
        expect(res.locals.isAdmin).to.be.undefined;
        expect(isNextCalled).to.be.true;
    });

    it('Expect to set user information to locals, but not admin', () => {
        const username = 'user_0000872';
        const res = getResponseMock();
        res.locals = {};
        const req = { user: { username: username } };

        setLocals(req, res, next);

        expect(res.locals.isAuthenticated).to.be.true;
        expect(res.locals.username).to.be.equal(username);
        expect(res.locals.isAdmin).to.be.undefined;
        expect(isNextCalled).to.be.true;
    });

    it('Expect to set user information to locals and admin is true', () => {
        const username = 'admin';
        const res = getResponseMock();
        res.locals = {};
        const req = {};
        req.user = {};
        req.user.username = username;
        req.user.roles = ['admin'];

        setLocals(req, res, next);

        expect(res.locals.isAuthenticated).to.be.true;
        expect(res.locals.username).to.be.equal(username);
        expect(res.locals.isAdmin).to.be.true;
        expect(isNextCalled).to.be.true;
    });

    it('Expect to set user information to locals - no admin role', () => {
        const username = 'admin';
        const res = getResponseMock();
        res.locals = {};
        const req = {};
        req.user = {};
        req.user.username = username;
        req.user.roles = ['editor'];

        setLocals(req, res, next);

        expect(res.locals.isAuthenticated).to.be.true;
        expect(res.locals.username).to.be.equal(username);
        expect(res.locals.isAdmin).to.be.undefined;
        expect(isNextCalled).to.be.true;
    });
});
