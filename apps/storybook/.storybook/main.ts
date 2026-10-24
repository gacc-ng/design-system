import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    stories: ['../../../libs/shared/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: [],
    framework: {
        name: '@storybook/angular',
        options: {},
    },
};

export default config;
