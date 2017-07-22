// TODO NEEDS TO BE TESTED WITH UNIT TESTS !!!!!

/**
 * 
 * @param { Number } itemsLength Any number 
 * @param { NUmber } pageSizes Positve value
 * @param { Number } currentPage Positive value
 * @return { Array } Pages as objects, the first and last object  
 *  will be used for (« ») arrows. Means to navigate to the last  
 *  and first page.
 * @example [{ }]
 */
const pagination = (itemsLength, pageSizes, currentPage) => {
    itemsLength = itemsLength || 1;
    const allPagesCount = Math.ceil(itemsLength / pageSizes);

    // count of pages to show
    const PAGES_COUNT = 5;
    // previus two, next two
    const PAGE_RANGE = Math.floor(PAGES_COUNT / 2);

    // Make sure the current page is in range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > allPagesCount) {
        currentPage = allPagesCount;
    }

    // set start page and end page
    let start = currentPage - PAGE_RANGE;
    let end = currentPage + PAGE_RANGE;
    if (currentPage <= PAGE_RANGE + 1) {
        start = 1;
        end = Math.min(allPagesCount, PAGES_COUNT);
    }

    if (end > allPagesCount) {
        end = allPagesCount;
    }

    if (end - start < PAGES_COUNT && currentPage > PAGE_RANGE + 1) {
        start = Math.max((end - PAGES_COUNT), 0) + 1;
    }

    // take maximum 5
    const resultPages = [];
    for (let i = start; i <= end; i++) {
        const pageItem = {
            page: i,
            isCurrent: currentPage === i,
            type: 'normal',
        };

        resultPages.push(pageItem);
    }

    // add last page
    resultPages.push({
        page: allPagesCount,
        isCurrent: false,
        type: 'last',
    });
    return resultPages;
};

module.exports = pagination;
