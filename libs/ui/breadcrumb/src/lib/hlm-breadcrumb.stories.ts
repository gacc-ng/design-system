import { provideRouter } from '@angular/router';

import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBreadcrumbImports } from '../index';

interface BreadcrumbStoryArgs {
    separatorText: string;
}

const meta: Meta<BreadcrumbStoryArgs> = {
    title: 'Layout/Breadcrumb',
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideRouter([])],
        }),
        moduleMetadata({
            imports: [HlmBreadcrumbImports],
        }),
    ],
    argTypes: {
        separatorText: {
            control: 'text',
            description: 'Custom separator character or symbol.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'/'" },
            },
        },
    },
    args: {
        separatorText: '/',
    },
};

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <nav hlmBreadcrumb>
                    <ol hlmBreadcrumbList>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/">Home</a>
                        </li>
                        <li hlmBreadcrumbSeparator></li>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/components">Components</a>
                        </li>
                        <li hlmBreadcrumbSeparator></li>
                        <li hlmBreadcrumbItem>
                            <span hlmBreadcrumbPage>Breadcrumb</span>
                        </li>
                    </ol>
                </nav>
            </div>
        `,
    }),
};

export const WithEllipsis: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <nav hlmBreadcrumb>
                    <ol hlmBreadcrumbList>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/">Home</a>
                        </li>
                        <li hlmBreadcrumbSeparator></li>
                        <li hlmBreadcrumbItem>
                            <span hlmBreadcrumbEllipsis></span>
                        </li>
                        <li hlmBreadcrumbSeparator></li>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/settings">Settings</a>
                        </li>
                        <li hlmBreadcrumbSeparator></li>
                        <li hlmBreadcrumbItem>
                            <span hlmBreadcrumbPage>Security & API Keys</span>
                        </li>
                    </ol>
                </nav>
            </div>
        `,
    }),
};

export const CustomSeparator: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <nav hlmBreadcrumb>
                    <ol hlmBreadcrumbList>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/">Home</a>
                        </li>
                        <li hlmBreadcrumbSeparator>{{ separatorText }}</li>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/docs">Docs</a>
                        </li>
                        <li hlmBreadcrumbSeparator>{{ separatorText }}</li>
                        <li hlmBreadcrumbItem>
                            <span hlmBreadcrumbPage>Architecture</span>
                        </li>
                    </ol>
                </nav>
            </div>
        `,
    }),
};
