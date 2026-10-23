import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmSwitchImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmSwitchImports],
    template: `
        <hlm-switch data-testid="default-switch" [checked]="checked" (checkedChange)="onCheckedChange($event)" />
        <hlm-switch size="sm" data-testid="sm-switch" />
        <hlm-switch [disabled]="true" data-testid="disabled-switch" />
    `,
})
class TestSwitchHostComponent {
    checked = false;

    onCheckedChange(val: boolean): void {
        this.checked = val;
    }
}

describe('HlmSwitch', () => {
    let fixture: ComponentFixture<TestSwitchHostComponent>;
    let component: TestSwitchHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSwitchHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSwitchHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create switch with data-slot', () => {
        const switchEl = fixture.debugElement.query(By.css('[data-testid="default-switch"]'));
        expect(switchEl).toBeTruthy();
        expect(switchEl.nativeElement.getAttribute('data-slot')).toBe('switch');
    });

    it('should support size attribute on underlying switch button', () => {
        const smSwitch = fixture.debugElement.query(By.css('[data-testid="sm-switch"]'));
        const switchBtn = smSwitch.query(By.css('button[role="switch"]'));
        expect(switchBtn.nativeElement.getAttribute('data-size')).toBe('sm');
    });

    it('should handle toggle via click and emit checkedChange', () => {
        const switchEl = fixture.debugElement.query(By.css('[data-testid="default-switch"]'));
        const switchBtn = switchEl.query(By.css('button[role="switch"]'));

        expect(component.checked).toBe(false);
        switchBtn.nativeElement.click();
        fixture.detectChanges();

        expect(component.checked).toBe(true);
    });

    it('should respect disabled input', () => {
        const disabledSwitch = fixture.debugElement.query(By.css('[data-testid="disabled-switch"]'));
        const switchBtn = disabledSwitch.query(By.css('button[role="switch"]'));

        expect(switchBtn.nativeElement.disabled).toBe(true);
    });
});
