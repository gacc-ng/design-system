import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmItem } from './hlm-item';
import { HlmItemActions } from './hlm-item-actions';
import { HlmItemContent } from './hlm-item-content';
import { HlmItemDescription } from './hlm-item-description';
import { HlmItemFooter } from './hlm-item-footer';
import { HlmItemGroup } from './hlm-item-group';
import { HlmItemHeader } from './hlm-item-header';
import { HlmItemMedia } from './hlm-item-media';
import { HlmItemSeparator } from './hlm-item-separator';
import { HlmItemTitle } from './hlm-item-title';

@Component({
    standalone: true,
    imports: [
        HlmItem,
        HlmItemGroup,
        HlmItemHeader,
        HlmItemMedia,
        HlmItemContent,
        HlmItemTitle,
        HlmItemDescription,
        HlmItemActions,
        HlmItemFooter,
        HlmItemSeparator,
    ],
    template: `
        <hlm-item-group>
            <hlm-item variant="outline" size="sm">
                <hlm-item-media variant="icon">
                    <span class="icon">Icon</span>
                </hlm-item-media>
                <hlm-item-content>
                    <hlm-item-title>Item Title</hlm-item-title>
                    <p hlmItemDescription>Item description text.</p>
                </hlm-item-content>
                <hlm-item-actions>
                    <button type="button">Action</button>
                </hlm-item-actions>
            </hlm-item>
            <hlm-item-separator />
            <hlm-item variant="muted">
                <hlm-item-header>
                    <span>Header</span>
                </hlm-item-header>
                <hlm-item-footer>
                    <span>Footer</span>
                </hlm-item-footer>
            </hlm-item>
        </hlm-item-group>
    `,
})
class TestHostComponent {}

describe('HlmItem', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render items and sub-elements with correct slots and attributes', () => {
        const groupEl = fixture.debugElement.query(By.directive(HlmItemGroup)).nativeElement as HTMLElement;
        const items = fixture.debugElement.queryAll(By.directive(HlmItem));
        const item1 = items[0].nativeElement as HTMLElement;
        const item2 = items[1].nativeElement as HTMLElement;

        expect(groupEl.getAttribute('data-slot')).toBe('item-group');

        expect(item1.getAttribute('data-slot')).toBe('item');
        expect(item1.getAttribute('data-variant')).toBe('outline');
        expect(item1.getAttribute('data-size')).toBe('sm');
        expect(item1.className).toContain('border-border');

        expect(item2.getAttribute('data-variant')).toBe('muted');
        expect(item2.className).toContain('bg-muted/50');

        const mediaEl = fixture.debugElement.query(By.directive(HlmItemMedia)).nativeElement as HTMLElement;
        expect(mediaEl.getAttribute('data-slot')).toBe('item-media');

        const contentEl = fixture.debugElement.query(By.directive(HlmItemContent)).nativeElement as HTMLElement;
        expect(contentEl.getAttribute('data-slot')).toBe('item-content');

        const titleEl = fixture.debugElement.query(By.directive(HlmItemTitle)).nativeElement as HTMLElement;
        expect(titleEl.getAttribute('data-slot')).toBe('item-title');

        const descEl = fixture.debugElement.query(By.directive(HlmItemDescription)).nativeElement as HTMLElement;
        expect(descEl.getAttribute('data-slot')).toBe('item-description');

        const actionsEl = fixture.debugElement.query(By.directive(HlmItemActions)).nativeElement as HTMLElement;
        expect(actionsEl.getAttribute('data-slot')).toBe('item-actions');

        const separatorEl = fixture.debugElement.query(By.directive(HlmItemSeparator)).nativeElement as HTMLElement;
        expect(separatorEl.getAttribute('data-slot')).toBe('item-separator');
    });
});
