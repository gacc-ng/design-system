import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmCheckbox } from '@gacc-ng/ui/checkbox';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmTextarea } from '@gacc-ng/ui/textarea';

import { HlmFieldImports } from '../index';

import { HlmField } from './hlm-field';

interface FieldStoryArgs {
    orientation: 'vertical' | 'horizontal';
}

const meta: Meta<FieldStoryArgs> = {
    title: 'Forms/Field',
    component: HlmField,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmFieldImports, HlmInput, HlmButton, HlmCheckbox, HlmTextarea],
        }),
    ],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'The layout axis orientation for the field label and control.',
            table: {
                type: { summary: "'vertical' | 'horizontal'" },
                defaultValue: { summary: "'vertical'" },
            },
        },
    },
    args: {
        orientation: 'vertical',
    },
};

export default meta;
type Story = StoryObj<FieldStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 max-w-sm mx-auto">
                <div hlmField [orientation]="orientation">
                    <label hlmFieldLabel for="email-field">Email address</label>
                    <input hlmInput id="email-field" placeholder="john@example.com" type="email" />
                    <p hlmFieldDescription>We will never share your email with anyone else.</p>
                </div>
            </div>
        `,
    }),
};

export const WithError: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-sm mx-auto">
                <div hlmField data-invalid="true">
                    <label hlmFieldLabel for="error-email">Email address</label>
                    <input hlmInput id="error-email" value="invalid-email" class="border-destructive focus-visible:ring-destructive" />
                    <hlm-field-error [forceShow]="true">Please enter a valid email address.</hlm-field-error>
                </div>
            </div>
        `,
    }),
};

export const Horizontal: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-md mx-auto">
                <div hlmField orientation="horizontal">
                    <hlm-checkbox inputId="terms-checkbox" />
                    <label hlmFieldLabel for="terms-checkbox">I accept the terms and conditions</label>
                </div>
            </div>
        `,
    }),
};

export const WithTextarea: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-sm mx-auto">
                <div hlmField>
                    <label hlmFieldLabel for="bio-textarea">Biography</label>
                    <textarea hlmTextarea id="bio-textarea" placeholder="Brief summary of your background..."></textarea>
                    <p hlmFieldDescription>Maximum 500 characters.</p>
                </div>
            </div>
        `,
    }),
};
