import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HlmSpinner } from './hlm-spinner';

@Component({
    standalone: true,
    imports: [HlmSpinner],
    template: ` <hlm-spinner aria-label="Saving changes" /> `,
})
class TestHostComponent {}

describe('HlmSpinner', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render spinner with status role and aria-label', () => {
        const spinner = fixture.debugElement.query(By.css('hlm-spinner'));
        expect(spinner).toBeTruthy();
        expect(spinner.attributes['data-slot']).toBe('spinner');
        expect(spinner.attributes['role']).toBe('status');
        expect(spinner.attributes['aria-label']).toBe('Saving changes');
    });

    it('should render ng-icon element', () => {
        const icon = fixture.debugElement.query(By.css('ng-icon'));
        expect(icon).toBeTruthy();
    });
});
