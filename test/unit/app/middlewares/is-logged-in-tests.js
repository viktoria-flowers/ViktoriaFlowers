/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { isLoggedIn } = require('../../../../app/middlewares');
const { getResponseMock, getRequestMock } = require('../../mocks-req-res');

describe('Middleware isLoggedIn() tests', () => {
    it('Expect to redirect to login if is not authenticated', () => {
        const req = getRequestMock({ isAuthenticated: () => false });
        const res = getResponseMock();

        isLoggedIn(req, res);

        expect(res.redirectUrl).to.be.equal('/login');
        expect(res.statusCode).to.be.equal(401);
    });

    it('Expect to call next() if is authenticated', () => {
        const res = getResponseMock();
        const req = getRequestMock({ isAuthenticated: () => true });

        let isNextCalled = false;
        const next = () => {
            isNextCalled = true;
        };
        isLoggedIn(req, res, next);

        expect(res.redirectUrl).to.be.undefined;
        expect(res.statusCode).to.be.undefined;

        expect(isNextCalled).to.be.true;
    });
});
