import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmBubbleImports } from './hlm-bubble';

@Component({
    imports: [HlmBubbleImports],
    template: `
        <div hlmBubbleGroup>
            <div hlmBubble [variant]="variant()" [align]="align()">
                <div hlmBubbleContent>Hello world</div>
                <div hlmBubbleReactions [side]="reactionSide()" [align]="reactionAlign()">
                    <span>👍</span>
                </div>
            </div>
        </div>
    `,
})
class TestHostComponent {
    variant = signal<'default' | 'secondary' | 'muted' | 'tinted' | 'outline' | 'ghost' | 'destructive'>('muted');
    align = signal<'start' | 'end'>('start');
    reactionSide = signal<'top' | 'bottom'>('bottom');
    reactionAlign = signal<'start' | 'end'>('end');
}

describe('HlmBubble', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render group, bubble, and content with proper data slots', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-slot="bubble-group"]'));
        const bubbleEl = fixture.debugElement.query(By.css('[data-slot="bubble"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="bubble-content"]'));

        expect(groupEl).toBeTruthy();
        expect(bubbleEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
        expect(contentEl.nativeElement.textContent).toContain('Hello world');
    });

    it('should bind variant and align attributes', () => {
        const bubbleEl = fixture.debugElement.query(By.css('[data-slot="bubble"]'));
        expect(bubbleEl.nativeElement.getAttribute('data-variant')).toBe('muted');
        expect(bubbleEl.nativeElement.getAttribute('data-align')).toBe('start');

        host.variant.set('destructive');
        host.align.set('end');
        fixture.detectChanges();

        expect(bubbleEl.nativeElement.getAttribute('data-variant')).toBe('destructive');
        expect(bubbleEl.nativeElement.getAttribute('data-align')).toBe('end');
    });

    it('should render reactions with alignment and side attributes', () => {
        const reactionsEl = fixture.debugElement.query(By.css('[data-slot="bubble-reactions"]'));
        expect(reactionsEl).toBeTruthy();
        expect(reactionsEl.nativeElement.getAttribute('data-side')).toBe('bottom');
        expect(reactionsEl.nativeElement.getAttribute('data-align')).toBe('end');
    });
});
