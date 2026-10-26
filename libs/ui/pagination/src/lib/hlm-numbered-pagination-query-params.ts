import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    model,
    numberAttribute,
    untracked,
} from '@angular/core';

import { HlmSelectImports } from '@gacc-ng/ui/select';
import { classes } from '@gacc-ng/ui/utils';

import { HlmPagination } from './hlm-pagination';
import { injectHlmPaginationConfig } from './hlm-pagination.token';
import { createPageArray, outOfBoundCorrection } from './hlm-pagination-calc';
import { HlmPaginationContent } from './hlm-pagination-content';
import { HlmPaginationEllipsis } from './hlm-pagination-ellipsis';
import { HlmPaginationItem } from './hlm-pagination-item';
import { HlmPaginationLink } from './hlm-pagination-link';
import { HlmPaginationNext } from './hlm-pagination-next';
import { HlmPaginationPrevious } from './hlm-pagination-previous';

@Component({
    selector: 'hlm-numbered-pagination-query-params',
    exportAs: 'hlmNumberedPaginationQueryParams',
    imports: [
        HlmPagination,
        HlmPaginationContent,
        HlmPaginationItem,
        HlmPaginationPrevious,
        HlmPaginationNext,
        HlmPaginationLink,
        HlmPaginationEllipsis,
        HlmSelectImports,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="text-muted-foreground flex items-center gap-1 text-sm text-nowrap">
            <b>{{ totalItems() }}</b>
            {{ totalItemsLabel() }} |
            <b>{{ _lastPageNumber() }}</b>
            {{ pagesLabel() }}
        </div>

        <nav hlmPagination>
            <ul hlmPaginationContent>
                @if (showEdges() && !_isFirstPageActive()) {
                    <li hlmPaginationItem>
                        <hlm-pagination-previous
                            [link]="link()"
                            [queryParams]="{ page: currentPage() - 1 }"
                            queryParamsHandling="merge"
                            [text]="previousLabel()"
                            [aria-label]="previousAriaLabel()"
                        />
                    </li>
                }

                @for (page of _pages(); track page) {
                    <li hlmPaginationItem>
                        @if (page === '...') {
                            <hlm-pagination-ellipsis />
                        } @else {
                            <a
                                hlmPaginationLink
                                [link]="currentPage() !== page ? link() : undefined"
                                [queryParams]="{ page }"
                                queryParamsHandling="merge"
                                [isActive]="currentPage() === page"
                            >
                                {{ page }}
                            </a>
                        }
                    </li>
                }

                @if (showEdges() && !_isLastPageActive()) {
                    <li hlmPaginationItem>
                        <hlm-pagination-next
                            [link]="link()"
                            [queryParams]="{ page: currentPage() + 1 }"
                            queryParamsHandling="merge"
                            [text]="nextLabel()"
                            [aria-label]="nextAriaLabel()"
                        />
                    </li>
                }
            </ul>
        </nav>

        <!-- Show Page Size selector -->
        <hlm-select [(value)]="itemsPerPage" class="ml-auto">
            <hlm-select-trigger class="w-fit">
                <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content *hlmSelectPortal>
                <hlm-select-group>
                    @for (pageSize of _pageSizesWithCurrent(); track pageSize) {
                        <hlm-select-item [value]="pageSize">{{ pageSize }}</hlm-select-item>
                    }
                </hlm-select-group>
            </hlm-select-content>
        </hlm-select>
    `,
})
export class HlmNumberedPaginationQueryParams {
    private readonly _config = injectHlmPaginationConfig();

    /** The current (active) page. */
    public readonly currentPage = model.required<number>();

    /** The number of items per paginated page. */
    public readonly itemsPerPage = model.required<number>();

    /** The total number of items in the collection. */
    public readonly totalItems = input.required<number, NumberInput>({
        transform: numberAttribute,
    });

    /** The URL path to use for the pagination links. Defaults to '.' (current path). */
    public readonly link = input<string>('.');

    /** The number of page links to show. */
    public readonly maxSize = input<number, NumberInput>(7, {
        transform: numberAttribute,
    });

    /** Show the first and last page buttons. */
    public readonly showEdges = input<boolean, BooleanInput>(true, {
        transform: booleanAttribute,
    });

    /** The page sizes to show. Defaults to [10, 20, 50, 100]. */
    public readonly pageSizes = input<number[]>([10, 20, 50, 100]);

    /** The label for total items or pages to show. */
    public readonly totalItemsLabel = input<string>(this._config.totalItemsLabel);

    /** The label for pages to show. */
    public readonly pagesLabel = input<string>(this._config.pagesLabel);

    /** The label to show on the next button. */
    public readonly nextLabel = input<string>(this._config.nextLabel);

    /** The aria-label to show on the next button. */
    public readonly nextAriaLabel = input<string>(this._config.nextAriaLabel);

    /** The label to show on the previous button. */
    public readonly previousLabel = input<string>(this._config.previousLabel);

    /** The aria-label to show on the previous button. */
    public readonly previousAriaLabel = input<string>(this._config.previousAriaLabel);

    protected readonly _pageSizesWithCurrent = computed(() => {
        const pageSizes = this.pageSizes();
        return pageSizes.includes(this.itemsPerPage())
            ? pageSizes
            : [...pageSizes, this.itemsPerPage()].sort((a, b) => a - b);
    });

    protected readonly _isFirstPageActive = computed(() => this.currentPage() === 1);
    protected readonly _isLastPageActive = computed(() => this.currentPage() === this._lastPageNumber());

    protected readonly _lastPageNumber = computed(() => {
        if (this.totalItems() < 1) {
            return 1;
        }
        return Math.ceil(this.totalItems() / this.itemsPerPage());
    });

    protected readonly _pages = computed(() => {
        const correctedCurrentPage = outOfBoundCorrection(this.totalItems(), this.itemsPerPage(), this.currentPage());

        if (correctedCurrentPage !== this.currentPage()) {
            untracked(() => this.currentPage.set(correctedCurrentPage));
        }

        return createPageArray(correctedCurrentPage, this.itemsPerPage(), this.totalItems(), this.maxSize());
    });

    constructor() {
        classes(() => 'flex items-center justify-between gap-2 px-4 py-2');
    }
}
