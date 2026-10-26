# @gacc-ng/ui/questionnaire

Multi-step conversational questionnaire and survey component built on `@spartan-ng/brain/questionnaire` with keyboard navigation, shortcuts, choice validation, and progress tracking.

## Installation & Setup

```typescript
import { HlmQuestionnaireImports } from '@gacc-ng/ui/questionnaire';
```

## Features

- Composed with `@spartan-ng/brain/questionnaire`.
- Single and multi-step progression with validation states.
- Choice shortcuts (`letters`, `numbers`).
- Accessible semantic HTML with `fieldset`, `legend`, and `aria-keyshortcuts`.

## Usage

```html
<div hlmQuestionnaire [shortcuts]="'letters'">
    <div hlmQuestionnaireProgress></div>

    <fieldset hlmQuestionnaireItem name="framework">
        <legend hlmQuestionnaireTitle>Which framework do you use?</legend>
        <p hlmQuestionnaireDescription>Select the primary frontend framework.</p>

        <div hlmQuestionnaireChoices>
            <div hlmQuestionnaireChoice value="angular">
                <input hlmQuestionnaireChoiceInput type="radio" name="framework" id="opt-angular" value="angular" />
                <label hlmQuestionnaireChoiceLabel for="opt-angular">Angular</label>
                <span hlmQuestionnaireChoiceShortcut>A</span>
            </div>
        </div>

        <div hlmQuestionnaireActions>
            <button hlmQuestionnairePrevious>Back</button>
            <button hlmQuestionnaireNext>Next</button>
        </div>
    </fieldset>
</div>
```
