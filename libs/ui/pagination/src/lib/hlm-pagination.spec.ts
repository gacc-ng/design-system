import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HlmPaginationImports } from '../index';

@Component({
    imports: [HlmPaginationImports],
    template: `
        <nav hlmPagination>
            <ul hlmPaginationContent>
                <li hlmPaginationItem>
                    <hlm-pagination-previous link="/previous" />
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/1" [isActive]="true">1</a>
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-ellipsis />
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-next link="/next" />
                </li>
            </ul>
        </nav>
    `,
})
class TestHostComponent {}

describe('HlmPagination', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    it('should create and render navigation elements correctly', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        const nav = fixture.nativeElement.querySelector('nav[hlmPagination]');
        expect(nav).toBeTruthy();
        expect(nav.getAttribute('role')).toBe('navigation');
        expect(nav.getAttribute('aria-label')).toBe('pagination');

        const ul = fixture.nativeElement.querySelector('ul[hlmPaginationContent]');
        expect(ul).toBeTruthy();

        const items = fixture.nativeElement.querySelectorAll('li[hlmPaginationItem]');
        expect(items.length).toBe(4);

        const activeLink = fixture.nativeElement.querySelector('[hlmPaginationLink][data-active="true"]');
        expect(activeLink).toBeTruthy();
        expect(activeLink.getAttribute('aria-current')).toBe('page');
    });
});
