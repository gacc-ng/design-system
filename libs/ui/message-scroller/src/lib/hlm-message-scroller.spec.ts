import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { HlmMessageScrollerImports } from './hlm-message-scroller';

@Component({
    imports: [HlmMessageScrollerImports],
    template: `
        <div hlmMessageScrollerProvider [autoScroll]="autoScroll()">
            <div hlmMessageScroller class="h-64">
                <div hlmMessageScrollerViewport>
                    <div hlmMessageScrollerContent>
                        <div hlmMessageScrollerItem messageId="msg-1">First item</div>
                        <div hlmMessageScrollerItem messageId="msg-2">Second item</div>
                    </div>
                </div>
                <button hlmMessageScrollerButton>Down</button>
            </div>
        </div>
    `,
})
class TestHostComponent {
    autoScroll = signal<boolean | 'smooth' | 'auto'>('smooth');
}

describe('HlmMessageScroller', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeAll(() => {
        class MockResizeObserver {
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        }
        Object.defineProperty(window, 'ResizeObserver', {
            writable: true,
            value: MockResizeObserver,
        });
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render all message scroller elements with proper data slots', () => {
        const providerEl = fixture.debugElement.query(By.css('[data-slot="message-scroller-provider"]'));
        const scrollerEl = fixture.debugElement.query(By.css('[data-slot="message-scroller"]'));
        const viewportEl = fixture.debugElement.query(By.css('[data-slot="message-scroller-viewport"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="message-scroller-content"]'));
        const itemEls = fixture.debugElement.queryAll(By.css('[data-slot="message-scroller-item"]'));
        const buttonEl = fixture.debugElement.query(By.css('[data-slot="message-scroller-button"]'));

        expect(providerEl).toBeTruthy();
        expect(scrollerEl).toBeTruthy();
        expect(viewportEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
        expect(itemEls.length).toBe(2);
        expect(buttonEl).toBeTruthy();
    });

    it('should bind messageId attributes on items', () => {
        const itemEls = fixture.debugElement.queryAll(By.css('[data-slot="message-scroller-item"]'));
        expect(itemEls[0].nativeElement.getAttribute('data-message-id')).toBe('msg-1');
        expect(itemEls[1].nativeElement.getAttribute('data-message-id')).toBe('msg-2');
    });
});
