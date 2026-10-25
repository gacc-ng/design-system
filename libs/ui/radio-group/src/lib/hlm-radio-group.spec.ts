import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HlmRadioGroupImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmRadioGroupImports, FormsModule],
    template: `
        <hlm-radio-group [value]="selected()" (valueChange)="onValueChange($event)">
            <hlm-radio value="opt1" inputId="r1">
                <hlm-radio-indicator indicator />
            </hlm-radio>
            <hlm-radio value="opt2" inputId="r2">
                <hlm-radio-indicator indicator />
            </hlm-radio>
        </hlm-radio-group>
    `,
})
class TestHostComponent {
    public selected = signal('opt1');

    onValueChange(val: string) {
        this.selected.set(val);
    }
}

describe('HlmRadioGroup', () => {
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

    it('should render radio group and inner radio items', () => {
        const group = fixture.debugElement.query(By.css('hlm-radio-group'));
        expect(group).toBeTruthy();
        expect(group.attributes['data-slot']).toBe('radio-group');

        const radios = fixture.debugElement.queryAll(By.css('hlm-radio'));
        expect(radios.length).toBe(2);
    });

    it('should render indicators inside radio buttons', () => {
        const indicators = fixture.debugElement.queryAll(By.css('hlm-radio-indicator'));
        expect(indicators.length).toBe(2);
        expect(indicators[0].attributes['data-slot']).toBe('radio-group-indicator');
    });

    it('should select second option when input is clicked', async () => {
        const inputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
        expect(inputs.length).toBe(2);

        inputs[1].nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(host.selected()).toBe('opt2');
    });
});
