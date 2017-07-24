const { expect } = require('chai');
const { pagination } = require('../../../../app/utils');

describe('Pagination tests', () => {
    const pageSize = 12;
    const normalTypePage = 'normal';
    const lastTypePage = 'last';

    it('Expect only one normal page (with last one)', () => {
        const pages = pagination(1, 1, 1);

        expect(pages.length).to.be.equal(2);
        expect(pages).to.be.deep.equal([{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }]);
    });

    it('Expect only one page if items length is negative', () => {
        const pages = pagination(-1, 1, 1);

        expect(pages.length).to.be.equal(2);
        expect(pages).to.be.deep.equal([{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }]);
    });

    it('Expect only one page if pageSize is negative', () => {
        const pages = pagination(1, -1, 1);

        expect(pages.length).to.be.equal(2);
        expect(pages).to.be.deep.equal([{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }]);
    });

    it('Expect only one page if current page is negative', () => {
        const pages = pagination(1, 1, -1);

        expect(pages.length).to.be.equal(2);
        expect(pages).to.be.deep.equal([{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }]);
    });

    it('Expect two normal pages with last one', () => {
        const pages = pagination(89, 50, 2);

        const expected = [{
            page: 1,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect one normal page and last one', () => {
        const pages = pagination(1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect two normal pages and last one', () => {
        const pages = pagination(pageSize + 1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect three normal pages and the last one', () => {
        const pages = pagination((pageSize * 2) + 1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect four normal pages and the last one', () => {
        const pages = pagination((pageSize * 3) + 1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 4,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 4,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect 5 normal pages with last one and current to be 1', () => {
        const pages = pagination((pageSize * 4) + 1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 4,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 5,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 5,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect 5 normal pages and different last one', () => {
        const pages = pagination((pageSize * 10) + 1, pageSize, 1);

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 4,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 5,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 11,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect last 5 pages and last one if current page is too high', () => {
        const pages = pagination((pageSize * 10) + 1, pageSize, 999);

        const expected = [{
            page: 7,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 8,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 9,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 10,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 11,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 11,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect middle five pages and the last one', () => {
        const pages = pagination((pageSize * 10) + 1, pageSize, 5);

        const expected = [{
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 4,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 5,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 6,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 7,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 11,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect two normal pages and current to be last', () => {
        const pages = pagination(pageSize + 1, pageSize, 2);

        const expected = [{
            page: 1,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect 3 normal pages and current to be the last', () => {
        const pages = pagination((pageSize * 2) + 1, pageSize, 3);

        const expected = [{
            page: 1,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect 3 normal pages and current to be in the middle', () => {
        const pages = pagination((pageSize * 2) + 1, pageSize, 2);

        const expected = [{
            page: 1,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 2,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: normalTypePage,
        }, {
            page: 3,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });

    it('Expect 1 normal page with last one if parameters are missing', () => {
        const pages = pagination();

        const expected = [{
            page: 1,
            isCurrent: true,
            type: normalTypePage,
        }, {
            page: 1,
            isCurrent: false,
            type: lastTypePage,
        }];

        expect(pages.length).to.be.equal(expected.length);
        expect(pages).to.be.deep.equal(expected);
    });
});
