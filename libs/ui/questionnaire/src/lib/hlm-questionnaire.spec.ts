import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmQuestionnaireImports } from './hlm-questionnaire';

@Component({
    imports: [HlmQuestionnaireImports],
    template: `
        <form hlmQuestionnaire [shortcuts]="'letters'">
            <div hlmQuestionnaireProgress></div>

            <fieldset hlmQuestionnaireItem name="q1">
                <legend hlmQuestionnaireTitle>Preferred Language</legend>
                <div hlmQuestionnaireDescription>Choose your favorite</div>

                <div hlmQuestionnaireChoices>
                    <label hlmQuestionnaireChoice value="ts">
                        <input hlmQuestionnaireChoiceInput type="radio" name="lang" id="opt-ts" value="ts" />
                        <span hlmQuestionnaireChoiceLabel>TypeScript</span>
                        <span hlmQuestionnaireChoiceShortcut>A</span>
                    </label>
                </div>

                <div hlmQuestionnaireError>Please make a selection</div>

                <div hlmQuestionnaireActions>
                    <button hlmQuestionnairePrevious>Previous</button>
                    <button hlmQuestionnaireSkip>Skip</button>
                    <button hlmQuestionnaireNext>Next</button>
                    <button hlmQuestionnaireSubmit>Submit</button>
                </div>
            </fieldset>
        </form>
    `,
})
class TestHostComponent {}

describe('HlmQuestionnaire', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render questionnaire elements with proper data slots', () => {
        const questionnaireEl = fixture.debugElement.query(By.css('[data-slot="questionnaire"]'));
        const progressEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-progress"]'));
        const itemEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-item"]'));
        const titleEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-title"]'));
        const descEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-description"]'));
        const choicesEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-choices"]'));
        const choiceEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-choice"]'));
        const inputEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-choice-input"]'));
        const labelEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-choice-label"]'));
        const shortcutEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-choice-shortcut"]'));
        const errorEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-error"]'));
        const actionsEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-actions"]'));
        const prevEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-previous"]'));
        const nextEl = fixture.debugElement.query(By.css('[data-slot="questionnaire-next"]'));

        expect(questionnaireEl).toBeTruthy();
        expect(progressEl).toBeTruthy();
        expect(itemEl).toBeTruthy();
        expect(titleEl).toBeTruthy();
        expect(descEl).toBeTruthy();
        expect(choicesEl).toBeTruthy();
        expect(choiceEl).toBeTruthy();
        expect(inputEl).toBeTruthy();
        expect(labelEl).toBeTruthy();
        expect(shortcutEl).toBeTruthy();
        expect(errorEl).toBeTruthy();
        expect(actionsEl).toBeTruthy();
        expect(prevEl).toBeTruthy();
        expect(nextEl).toBeTruthy();
    });
});
