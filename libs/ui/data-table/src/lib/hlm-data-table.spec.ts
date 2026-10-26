import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
    columnVisibilityFeature,
    createColumnHelper,
    createPaginatedRowModel,
    injectTable,
    rowPaginationFeature,
    tableFeatures,
    TanStackTable,
} from '@tanstack/angular-table';

import { HlmDataTableImports } from '../index';

interface User {
    id: string;
    name: string;
    email: string;
}

const features = tableFeatures({
    columnVisibilityFeature,
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
});

type UserTableFeatures = typeof features;

const columnHelper = createColumnHelper<UserTableFeatures, User>();

@Component({
    imports: [HlmDataTableImports, TanStackTable],
    template: `
        <div [tanStackTable]="table">
            <hlm-data-table-view-options />
            <hlm-data-table-pagination />
        </div>
    `,
})
class TestHostComponent {
    public readonly data = signal<User[]>([
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
    ]);

    public readonly columns = columnHelper.columns([
        columnHelper.accessor('name', {
            header: 'Name',
            enableHiding: true,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            enableHiding: true,
        }),
    ]);

    public readonly table = injectTable(() => ({
        features,
        data: this.data(),
        columns: this.columns,
    }));
}

describe('HlmDataTable', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();
    });

    it('should instantiate and render pagination and view options', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        const pagination = fixture.nativeElement.querySelector('hlm-data-table-pagination');
        expect(pagination).toBeTruthy();

        const viewOptions = fixture.nativeElement.querySelector('hlm-data-table-view-options');
        expect(viewOptions).toBeTruthy();
    });
});
