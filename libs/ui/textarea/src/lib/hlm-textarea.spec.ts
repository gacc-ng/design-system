import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HlmTextarea } from './hlm-textarea';

@Component({
    standalone: true,
    imports: [HlmTextarea],
    template: ` <textarea hlmTextarea id="test-textarea" placeholder="Enter notes..."></textarea> `,
})
class TestHostComponent {}

describe('HlmTextarea', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should apply data-slot="textarea" and default styling classes', () => {
        const textarea = fixture.debugElement.query(By.css('textarea'));
        expect(textarea).toBeTruthy();
        expect(textarea.attributes['data-slot']).toBe('textarea');
        expect(textarea.nativeElement.className).toContain('border-input');
        expect(textarea.nativeElement.className).toContain('min-h-16');
    });
});
