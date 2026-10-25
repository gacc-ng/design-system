import { provideRouter } from '@angular/router';

import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBreadcrumbImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Breadcrumb',
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideRouter([])],
        }),
        moduleMetadata({
            imports: [HlmBreadcrumbImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

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
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <nav hlmBreadcrumb>
                    <ol hlmBreadcrumbList>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/">Dashboard</a>
                        </li>
                        <li hlmBreadcrumbSeparator>
                            <span class="text-xs text-muted-foreground font-mono">/</span>
                        </li>
                        <li hlmBreadcrumbItem>
                            <a hlmBreadcrumbLink routerLink="/analytics">Analytics</a>
                        </li>
                        <li hlmBreadcrumbSeparator>
                            <span class="text-xs text-muted-foreground font-mono">/</span>
                        </li>
                        <li hlmBreadcrumbItem>
                            <span hlmBreadcrumbPage>Real-time Traffic</span>
                        </li>
                    </ol>
                </nav>
            </div>
        `,
    }),
};
