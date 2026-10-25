import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HlmSkeleton } from './hlm-skeleton';

@Component({
    standalone: true,
    imports: [HlmSkeleton],
    template: ` <hlm-skeleton class="h-4 w-32" /> `,
})
class TestHostComponent {}

describe('HlmSkeleton', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should set data-slot="skeleton" and pulse animation class', () => {
        const skeleton = fixture.debugElement.query(By.css('hlm-skeleton'));
        expect(skeleton).toBeTruthy();
        expect(skeleton.attributes['data-slot']).toBe('skeleton');
        expect(skeleton.nativeElement.className).toContain('bg-muted');
        expect(skeleton.nativeElement.className).toContain('animate-pulse');
    });
});
