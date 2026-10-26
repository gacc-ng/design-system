import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmCaption } from './hlm-caption';
import { HlmTable } from './hlm-table';
import { HlmTableContainer } from './hlm-table-container';
import { HlmTBody } from './hlm-tbody';
import { HlmTd } from './hlm-td';
import { HlmTFoot } from './hlm-tfoot';
import { HlmTh } from './hlm-th';
import { HlmTHead } from './hlm-thead';
import { HlmTr } from './hlm-tr';

@Component({
    standalone: true,
    imports: [HlmCaption, HlmTableContainer, HlmTable, HlmTHead, HlmTBody, HlmTFoot, HlmTr, HlmTh, HlmTd],
    template: `
        <div hlmTableContainer>
            <table hlmTable>
                <caption hlmTableCaption>
                    Test Caption
                </caption>
                <thead hlmTableHeader>
                    <tr hlmTableRow>
                        <th hlmTableHead>Header 1</th>
                        <th hlmTableHead>Header 2</th>
                    </tr>
                </thead>
                <tbody hlmTableBody>
                    <tr hlmTableRow data-state="selected">
                        <td hlmTableCell>Row 1 Cell 1</td>
                        <td hlmTableCell>Row 1 Cell 2</td>
                    </tr>
                </tbody>
                <tfoot hlmTableFooter>
                    <tr hlmTableRow>
                        <td hlmTableCell colspan="2">Footer Total</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `,
})
class TestHostComponent {}

describe('HlmTable', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and render semantic table elements with expected data-slot attributes and classes', () => {
        const container = fixture.debugElement.query(By.directive(HlmTableContainer)).nativeElement as HTMLElement;
        const table = fixture.debugElement.query(By.directive(HlmTable)).nativeElement as HTMLElement;
        const caption = fixture.debugElement.query(By.directive(HlmCaption)).nativeElement as HTMLElement;
        const thead = fixture.debugElement.query(By.directive(HlmTHead)).nativeElement as HTMLElement;
        const tbody = fixture.debugElement.query(By.directive(HlmTBody)).nativeElement as HTMLElement;
        const tfoot = fixture.debugElement.query(By.directive(HlmTFoot)).nativeElement as HTMLElement;
        const rows = fixture.debugElement.queryAll(By.directive(HlmTr));
        const ths = fixture.debugElement.queryAll(By.directive(HlmTh));
        const tds = fixture.debugElement.queryAll(By.directive(HlmTd));

        expect(container.getAttribute('data-slot')).toBe('table-container');
        expect(container.className).toContain('overflow-x-auto');

        expect(table.getAttribute('data-slot')).toBe('table');
        expect(table.className).toContain('w-full');

        expect(caption.getAttribute('data-slot')).toBe('table-caption');
        expect(caption.className).toContain('text-muted-foreground');

        expect(thead.getAttribute('data-slot')).toBe('table-header');
        expect(tbody.getAttribute('data-slot')).toBe('table-body');
        expect(tfoot.getAttribute('data-slot')).toBe('table-footer');

        expect(rows[1].nativeElement.getAttribute('data-state')).toBe('selected');
        expect(ths.length).toBe(2);
        expect(tds.length).toBe(3);
    });
});
