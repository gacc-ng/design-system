import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmTraceImports, type TraceLineVariants } from './hlm-trace';

@Component({
    imports: [HlmTraceImports],
    template: `
        <div hlmTrace>
            <details hlmTraceCollapsible>
                <summary hlmTraceCollapsibleTrigger>
                    <span hlmTraceIcon>⚡</span>
                    <span hlmTraceTitle>tool_execution</span>
                    <span hlmTraceDescription>120ms</span>
                </summary>
                <div hlmTraceCollapsibleContent>
                    <div hlmTraceLine [status]="status()">
                        <span hlmTraceIcon>✓</span>
                        <span hlmTraceTitle>step 1</span>
                        <span hlmTraceDescription>40ms</span>
                    </div>
                </div>
            </details>
        </div>
    `,
})
class TestHostComponent {
    status = signal<TraceLineVariants['status']>('default');
}

describe('HlmTrace', () => {
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

    it('should render trace elements with appropriate data slots', () => {
        const traceEl = fixture.debugElement.query(By.css('[data-slot="trace"]'));
        const collapsibleEl = fixture.debugElement.query(By.css('[data-slot="trace-collapsible"]'));
        const triggerEl = fixture.debugElement.query(By.css('[data-slot="trace-collapsible-trigger"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="trace-collapsible-content"]'));
        const lineEl = fixture.debugElement.query(By.css('[data-slot="trace-line"]'));
        const iconEl = fixture.debugElement.query(By.css('[data-slot="trace-icon"]'));
        const titleEl = fixture.debugElement.query(By.css('[data-slot="trace-title"]'));
        const descEl = fixture.debugElement.query(By.css('[data-slot="trace-description"]'));

        expect(traceEl).toBeTruthy();
        expect(collapsibleEl).toBeTruthy();
        expect(triggerEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
        expect(lineEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(titleEl).toBeTruthy();
        expect(descEl).toBeTruthy();
    });

    it('should update line status data attribute when signal changes', () => {
        const lineEl = fixture.debugElement.query(By.css('[data-slot="trace-line"]'));
        expect(lineEl.nativeElement.getAttribute('data-status')).toBe('default');

        host.status.set('running');
        fixture.detectChanges();

        expect(lineEl.nativeElement.getAttribute('data-status')).toBe('running');
    });
});
