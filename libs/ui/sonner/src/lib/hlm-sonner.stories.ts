import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButtonImports } from '@gacc-ng/ui/button';

import { HlmToaster, HlmToasterImports, toast } from '../index';

@Component({
    selector: 'gacc-sonner-demo',
    standalone: true,
    imports: [HlmToasterImports, HlmButtonImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <hlm-toaster richColors closeButton />
        <div class="flex flex-wrap gap-3 p-8">
            <button hlmBtn variant="outline" (click)="showDefault()">Default Toast</button>
            <button hlmBtn variant="outline" (click)="showSuccess()">Success</button>
            <button hlmBtn variant="outline" (click)="showError()">Error</button>
            <button hlmBtn variant="outline" (click)="showAction()">With Action</button>
        </div>
    `,
})
class SonnerDemoComponent {
    public showDefault(): void {
        toast('Event has been created', {
            description: 'Monday, October 26, 2026 at 9:00 AM',
        });
    }

    public showSuccess(): void {
        toast.success('Profile updated successfully!');
    }

    public showError(): void {
        toast.error('Failed to save changes. Please try again.');
    }

    public showAction(): void {
        toast('File deleted', {
            action: {
                label: 'Undo',
                onClick: () => toast.info('File restored!'),
            },
        });
    }
}

const meta: Meta = {
    title: 'Overlays/Sonner',
    component: HlmToaster,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [SonnerDemoComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: '<gacc-sonner-demo />',
    }),
};
