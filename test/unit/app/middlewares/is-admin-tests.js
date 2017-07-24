/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { isAdmin } = require('../../../../app/middlewares');
const { getResponseMock } = require('../../mocks-req-res');

describe('Middleware isAdmin() tests', () => {
    describe('Expect to have correct status and to redirect to login', () => {
        it('When res.locals is undefined', () => {
            const res = getResponseMock();

            isAdmin({}, res);

            expect(res.redirectUrl).to.be.equal('/login');
            expect(res.statusCode).to.be.equal(403);
        });

        it('When res.locals is defined, but isAdmin is undefined', () => {
            const res = getResponseMock();
            res.locals = {};
            isAdmin({}, res);

            expect(res.redirectUrl).to.be.equal('/login');
            expect(res.statusCode).to.be.equal(403);
        });

        it('When res.locals is defined and isAdmin has wrong value', () => {
            const res = getResponseMock();
            res.locals = { isAdmin: 'No' };
            isAdmin({}, res);

            expect(res.redirectUrl).to.be.equal('/login');
            expect(res.statusCode).to.be.equal(403);
        });
    });

    it('Expect ot call next() when everything is correct', () => {
        const res = getResponseMock();
        res.locals = { isAdmin: true };

        let isInvoked = false;
        const next = () => {
            isInvoked = true;
        };

        isAdmin({}, res, next);

        expect(res.redirectUrl).to.be.undefined;
        expect(res.statusCode).to.be.undefined;
        expect(isInvoked).to.be.true;
    });
});
