const { expect } = require('chai');
const { authHelper } = require('../../../../app/utils');

describe('Auth Helper tests', () => {
    describe('makeHashFromPassword() tests', () => {
        it('Expect to throw an error if value is missing', () => {
            expect(authHelper.makeHashFromPassword).to.throw();
        });

        it('Expect to throw an error if only salt is provided', () => {
            expect(() => {
                authHelper.makeHashFromPassword(null, 'AF67ZB45F2');
            })
                .to.throw();
        });

        it('Expect to throw an error if password is empty text', () => {
            expect(() => {
                authHelper.makeHashFromPassword('');
            })
                .to.throw();
        });

        it('Expect to return a different value than provided value', () => {
            const password = '123456';

            const result = authHelper.makeHashFromPassword(password);

            expect(result).is.not.equal(password);
        });

        it('Expect to return same value if invoked few times', () => {
            const password = '123456';

            const result = authHelper.makeHashFromPassword(password);
            const newResult = authHelper.makeHashFromPassword(password);
            expect(result).is.equal(newResult);
        });

        it('Expect to return different value with provided salt', () => {
            const password = 'firefox';

            const result = authHelper.makeHashFromPassword(password);
            const newPassword =
                authHelper.makeHashFromPassword(password, 'browser');
            expect(result).is.not.equal(newPassword);
        });
    });
});
