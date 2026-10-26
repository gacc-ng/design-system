import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmQuestionnaire, HlmQuestionnaireImports } from './hlm-questionnaire';

const meta: Meta<HlmQuestionnaire> = {
    title: 'Chat & AI/Questionnaire',
    component: HlmQuestionnaire,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmQuestionnaireImports],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmQuestionnaire>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="border-border bg-card w-full max-w-xl rounded-2xl border p-6 shadow-sm">
                <form hlmQuestionnaire [shortcuts]="'letters'">
                    <div hlmQuestionnaireProgress></div>

                    <fieldset hlmQuestionnaireItem name="step1">
                        <legend hlmQuestionnaireTitle>What kind of project are you building?</legend>
                        <p hlmQuestionnaireDescription>Pick the category that fits best.</p>

                        <div hlmQuestionnaireChoices>
                            <label hlmQuestionnaireChoice value="design-system">
                                <input hlmQuestionnaireChoiceInput type="radio" name="project-type" id="opt-ds" value="design-system" checked />
                                <span hlmQuestionnaireChoiceLabel>Design System & UI Primitives</span>
                                <span hlmQuestionnaireChoiceShortcut>A</span>
                            </label>
                            <label hlmQuestionnaireChoice value="saas">
                                <input hlmQuestionnaireChoiceInput type="radio" name="project-type" id="opt-saas" value="saas" />
                                <span hlmQuestionnaireChoiceLabel>Fullstack SaaS Application</span>
                                <span hlmQuestionnaireChoiceShortcut>B</span>
                            </label>
                            <label hlmQuestionnaireChoice value="mobile">
                                <input hlmQuestionnaireChoiceInput type="radio" name="project-type" id="opt-mobile" value="mobile" />
                                <span hlmQuestionnaireChoiceLabel>Mobile / Cross-platform App</span>
                                <span hlmQuestionnaireChoiceShortcut>C</span>
                            </label>
                        </div>

                        <div hlmQuestionnaireActions>
                            <button hlmQuestionnairePrevious disabled>Previous</button>
                            <button hlmQuestionnaireNext>Next Step →</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        `,
    }),
};
