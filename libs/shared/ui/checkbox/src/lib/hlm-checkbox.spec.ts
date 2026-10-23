import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HlmCheckbox } from './hlm-checkbox';

@Component({
    standalone: true,
    imports: [HlmCheckbox, FormsModule],
    template: `
        <hlm-checkbox
            inputId="test-checkbox"
            [checked]="checked()"
            [disabled]="disabled()"
            [(indeterminate)]="indeterminate"
            (checkedChange)="onCheckedChange($event)"
        />
    `,
})
class TestHostComponent {
    public checked = signal(false);
    public disabled = signal(false);
    public indeterminate = false;
    public lastChangeValue: boolean | null = null;

    onCheckedChange(val: boolean) {
        this.lastChangeValue = val;
        this.checked.set(val);
    }
}

describe('HlmCheckbox', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and render inner button with correct role and id', () => {
        const buttonDebug = fixture.debugElement.query(By.css('brn-checkbox button'));
        expect(buttonDebug).toBeTruthy();
        expect(buttonDebug.attributes['role']).toBe('checkbox');
        expect(buttonDebug.attributes['id']).toBe('test-checkbox');
    });

    it('should toggle checked state on button click and emit checkedChange', () => {
        const checkboxButton = fixture.debugElement.query(By.css('brn-checkbox button'));
        checkboxButton.nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.lastChangeValue).toBe(true);
        expect(hostComponent.checked()).toBe(true);
    });

    it('should respect disabled state and prevent toggle', () => {
        hostComponent.disabled.set(true);
        fixture.detectChanges();

        const checkboxButton = fixture.debugElement.query(By.css('brn-checkbox button'));
        checkboxButton.nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.checked()).toBe(false);
    });

    it('should render check icon when checked', () => {
        hostComponent.checked.set(true);
        fixture.detectChanges();

        const iconDebug = fixture.debugElement.query(By.css('ng-icon'));
        expect(iconDebug).toBeTruthy();
    });
});
