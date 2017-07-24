/**
 * 
 * @param { Number } itemsLength Any number 
 * @param { Number } pageSizes Positive value
 * @param { Number } currentPage Positive value
 * @return { Array } Normal page with one active and last page for arrow 
 * symbol (») in the template. The last element is the last page 
 * from all possible pages.
 * @example
 *   [{ 4, 5, 6, 7, 8, 20 }] // 20 is the last page  
 *   20 is used for the last page symbol » button.
 */
const pagination = (itemsLength, pageSizes, currentPage) => {
    pageSizes = pageSizes || 1;
    currentPage = currentPage || 1;
    itemsLength = itemsLength || 1;

    if (pageSizes < 1) {
        pageSizes = 1;
    }

    if (currentPage < 1) {
        currentPage = 1;
    }

    if (itemsLength < 1) {
        itemsLength = 1;
    }

    const allPagesCount = Math.ceil(itemsLength / pageSizes);

    // count of pages to show
    const PAGES_COUNT = 5;
    // previous two, next two
    const PAGE_RANGE = Math.floor(PAGES_COUNT / 2);

    // Make sure the current page is in range
    if (currentPage > allPagesCount) {
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
