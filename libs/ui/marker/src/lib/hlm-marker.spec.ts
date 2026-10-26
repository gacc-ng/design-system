import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmMarkerImports, type MarkerVariants } from './hlm-marker';

@Component({
    imports: [HlmMarkerImports],
    template: `
        <div hlmMarker [variant]="variant()" [status]="status()">
            <div hlmMarkerIcon>●</div>
            <div hlmMarkerContent>Compacted history</div>
        </div>
    `,
})
class TestHostComponent {
    variant = signal<MarkerVariants['variant']>('default');
    status = signal<MarkerVariants['status']>('idle');
}

describe('HlmMarker', () => {
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

    it('should render marker with proper role status and data slots', () => {
        const markerEl = fixture.debugElement.query(By.css('[data-slot="marker"]'));
        const iconEl = fixture.debugElement.query(By.css('[data-slot="marker-icon"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="marker-content"]'));

        expect(markerEl).toBeTruthy();
        expect(markerEl.nativeElement.getAttribute('role')).toBe('status');
        expect(iconEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
    });

    it('should update variant and status data attributes when signals change', () => {
        const markerEl = fixture.debugElement.query(By.css('[data-slot="marker"]'));

        expect(markerEl.nativeElement.getAttribute('data-variant')).toBe('default');
        expect(markerEl.nativeElement.getAttribute('data-status')).toBe('idle');

        host.variant.set('separator');
        host.status.set('running');
        fixture.detectChanges();

        expect(markerEl.nativeElement.getAttribute('data-variant')).toBe('separator');
        expect(markerEl.nativeElement.getAttribute('data-status')).toBe('running');
    });
});
