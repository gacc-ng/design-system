import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmMessageImports } from './hlm-message';

@Component({
    imports: [HlmMessageImports],
    template: `
        <div hlmMessageGroup>
            <div hlmMessage [align]="align()">
                <div hlmMessageAvatar>Avatar</div>
                <div hlmMessageContent>
                    <div hlmMessageHeader>Sender</div>
                    <p>Message text</p>
                    <div hlmMessageFooter>Timestamp</div>
                </div>
            </div>
        </div>
    `,
})
class TestHostComponent {
    align = signal<'start' | 'end'>('start');
}

describe('HlmMessage', () => {
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

    it('should render all message slots correctly', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-slot="message-group"]'));
        const messageEl = fixture.debugElement.query(By.css('[data-slot="message"]'));
        const avatarEl = fixture.debugElement.query(By.css('[data-slot="message-avatar"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="message-content"]'));
        const headerEl = fixture.debugElement.query(By.css('[data-slot="message-header"]'));
        const footerEl = fixture.debugElement.query(By.css('[data-slot="message-footer"]'));

        expect(groupEl).toBeTruthy();
        expect(messageEl).toBeTruthy();
        expect(avatarEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
        expect(headerEl).toBeTruthy();
        expect(footerEl).toBeTruthy();
    });

    it('should update alignment data attribute and layout class when align signal changes', () => {
        const messageEl = fixture.debugElement.query(By.css('[data-slot="message"]'));
        expect(messageEl.nativeElement.getAttribute('data-align')).toBe('start');

        host.align.set('end');
        fixture.detectChanges();

        expect(messageEl.nativeElement.getAttribute('data-align')).toBe('end');
    });
});
