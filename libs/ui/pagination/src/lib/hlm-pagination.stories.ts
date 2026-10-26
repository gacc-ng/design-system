import { Component, signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { HlmPaginationImports } from '../index';

import { HlmNumberedPagination } from './hlm-numbered-pagination';

@Component({
    selector: 'hlm-pagination-preview',
    imports: [HlmPaginationImports],
    template: `
        <nav hlmPagination>
            <ul hlmPaginationContent>
                <li hlmPaginationItem>
                    <hlm-pagination-previous link="/components/pagination" />
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination">1</a>
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination" [isActive]="true">2</a>
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination">3</a>
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-ellipsis />
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-next link="/components/pagination" />
                </li>
            </ul>
        </nav>
    `,
})
class PaginationPreviewComponent {}

@Component({
    selector: 'hlm-pagination-icon-only-preview',
    imports: [HlmPaginationImports],
    template: `
        <nav hlmPagination>
            <ul hlmPaginationContent>
                <li hlmPaginationItem>
                    <hlm-pagination-previous [iconOnly]="true" link="/components/pagination" />
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination">1</a>
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination" [isActive]="true">2</a>
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/components/pagination">3</a>
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-ellipsis />
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-next [iconOnly]="true" link="/components/pagination" />
                </li>
            </ul>
        </nav>
    `,
})
class PaginationIconOnlyPreviewComponent {}

@Component({
    selector: 'hlm-pagination-advanced-preview',
    imports: [HlmNumberedPagination],
    template: `
        <hlm-numbered-pagination [(currentPage)]="page" [(itemsPerPage)]="pageSize" [totalItems]="totalProducts()" />
    `,
})
class PaginationAdvancedPreviewComponent {
    public readonly page = signal(1);
    public readonly pageSize = signal(10);
    public readonly totalProducts = signal(100);
}

const meta: Meta<PaginationPreviewComponent> = {
    title: 'Layout/Pagination',
    component: PaginationPreviewComponent,
    decorators: [
        moduleMetadata({
            providers: [provideRouter([])],
        }),
    ],
};

export default meta;
type Story = StoryObj<PaginationPreviewComponent>;

export const Default: Story = {};

export const IconOnly: StoryObj<PaginationIconOnlyPreviewComponent> = {
    render: () => ({
        component: PaginationIconOnlyPreviewComponent,
    }),
};

export const Advanced: StoryObj<PaginationAdvancedPreviewComponent> = {
    render: () => ({
        component: PaginationAdvancedPreviewComponent,
    }),
};
