export type Page = number | '...';

/**
 * Returns a corrected page number if the requested page is out of bounds.
 */
export function outOfBoundCorrection(totalItems: number, itemsPerPage: number, currentPage: number): number {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages < currentPage && totalPages > 0) {
        return totalPages;
    }

    if (currentPage < 1) {
        return 1;
    }

    return currentPage;
}

/**
 * Calculates what page number corresponds to a specific position in the pagination range.
 */
export function calculatePageNumber(
    i: number,
    currentPage: number,
    paginationRange: number,
    totalPages: number,
): number {
    const halfWay = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
        return totalPages;
    }

    if (i === 1) {
        return i;
    }

    if (paginationRange < totalPages) {
        if (totalPages - halfWay < currentPage) {
            return totalPages - paginationRange + i;
        }
        if (halfWay < currentPage) {
            return currentPage - halfWay + i;
        }
        return i;
    }

    return i;
}

/**
 * Returns an array of Page items to render in pagination controls.
 */
export function createPageArray(
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
    paginationRange: number,
): Page[] {
    const range = +paginationRange;
    const pages: Page[] = [];

    const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
    const halfWay = Math.ceil(range / 2);

    const isStart = currentPage <= halfWay;
    const isEnd = totalPages - halfWay < currentPage;
    const isMiddle = !isStart && !isEnd;

    const ellipsesNeeded = range < totalPages;
    let i = 1;

    while (i <= totalPages && i <= range) {
        let label: Page;
        const pageNumber = calculatePageNumber(i, currentPage, range, totalPages);
        const openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
        const closingEllipsesNeeded = i === range - 1 && (isMiddle || isStart);

        if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
            label = '...';
        } else {
            label = pageNumber;
        }
        pages.push(label);
        i++;
    }

    return pages;
}
