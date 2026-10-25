import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmCheckbox } from '@gacc-ng/ui/checkbox';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmTextarea } from '@gacc-ng/ui/textarea';

import { HlmFieldImports } from '../index';

const meta: Meta = {
    title: 'UI/Field',
    decorators: [
        moduleMetadata({
            imports: [HlmFieldImports, HlmInput, HlmButton, HlmCheckbox, HlmTextarea],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-sm mx-auto">
                <div hlmField>
                    <label hlmFieldLabel for="email-field">Email address</label>
                    <input hlmInput id="email-field" placeholder="john@example.com" type="email" />
                    <p hlmFieldDescription>We'll never share your email with anyone else.</p>
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

export const FormFieldSet: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-md mx-auto">
                <fieldset hlmFieldSet>
                    <legend hlmFieldLegend>Account Settings</legend>
                    <p hlmFieldDescription>Manage your public profile and preferences.</p>

                    <div hlmFieldGroup>
                        <div hlmField>
                            <label hlmFieldLabel for="profile-name">Display Name</label>
                            <input hlmInput id="profile-name" placeholder="John Doe" />
                        </div>

                        <div hlmField>
                            <label hlmFieldLabel for="profile-bio">Bio</label>
                            <textarea hlmTextarea id="profile-bio" placeholder="Tell us about yourself..." class="resize-none"></textarea>
                            <p hlmFieldDescription>Brief description for your profile.</p>
                        </div>

                        <hlm-field-separator>Notifications</hlm-field-separator>

                        <div hlmField orientation="horizontal">
                            <hlm-checkbox inputId="newsletter" [checked]="true" />
                            <label hlmFieldLabel for="newsletter">Receive weekly product updates</label>
                        </div>

                        <div hlmField orientation="horizontal" class="pt-4">
                            <button hlmBtn>Save Changes</button>
                            <button hlmBtn variant="outline">Cancel</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        `,
    }),
};
