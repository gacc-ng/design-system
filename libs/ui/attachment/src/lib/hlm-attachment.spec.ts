import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { type AttachmentVariants, HlmAttachmentImports } from './hlm-attachment';

@Component({
    imports: [HlmAttachmentImports],
    template: `
        <div hlmAttachmentGroup>
            <div hlmAttachment [state]="state()" [size]="size()" [layout]="layout()">
                <div hlmAttachmentMedia>Icon</div>
                <div hlmAttachmentContent>
                    <div hlmAttachmentTitle>spec.pdf</div>
                    <div hlmAttachmentDescription>1.2 MB</div>
                </div>
                <div hlmAttachmentActions>
                    <button hlmAttachmentAction>✕</button>
                </div>
            </div>
        </div>
    `,
})
class TestHostComponent {
    state = signal<AttachmentVariants['state']>('idle');
    size = signal<AttachmentVariants['size']>('default');
    layout = signal<AttachmentVariants['layout']>('horizontal');
}

describe('HlmAttachment', () => {
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

    it('should render all attachment sub-directives with appropriate data slots', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-slot="attachment-group"]'));
        const attachmentEl = fixture.debugElement.query(By.css('[data-slot="attachment"]'));
        const mediaEl = fixture.debugElement.query(By.css('[data-slot="attachment-media"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="attachment-content"]'));
        const titleEl = fixture.debugElement.query(By.css('[data-slot="attachment-title"]'));
        const descEl = fixture.debugElement.query(By.css('[data-slot="attachment-description"]'));
        const actionsEl = fixture.debugElement.query(By.css('[data-slot="attachment-actions"]'));
        const actionEl = fixture.debugElement.query(By.css('[data-slot="attachment-action"]'));

        expect(groupEl).toBeTruthy();
        expect(attachmentEl).toBeTruthy();
        expect(mediaEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
        expect(titleEl).toBeTruthy();
        expect(descEl).toBeTruthy();
        expect(actionsEl).toBeTruthy();
        expect(actionEl).toBeTruthy();
    });

    it('should update state, size, and layout data attributes when signals change', () => {
        const attachmentEl = fixture.debugElement.query(By.css('[data-slot="attachment"]'));

        expect(attachmentEl.nativeElement.getAttribute('data-state')).toBe('idle');
        expect(attachmentEl.nativeElement.getAttribute('data-size')).toBe('default');
        expect(attachmentEl.nativeElement.getAttribute('data-layout')).toBe('horizontal');

        host.state.set('uploading');
        host.size.set('sm');
        host.layout.set('vertical');
        fixture.detectChanges();

        expect(attachmentEl.nativeElement.getAttribute('data-state')).toBe('uploading');
        expect(attachmentEl.nativeElement.getAttribute('data-size')).toBe('sm');
        expect(attachmentEl.nativeElement.getAttribute('data-layout')).toBe('vertical');
    });
});
