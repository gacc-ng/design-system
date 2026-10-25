import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, type Preview } from '@storybook/angular-vite';

import { provideSpartanHlm } from '@gacc-ng/ui/utils';

import './tailwind.css';

const preview: Preview = {
    decorators: [
        withThemeByClassName({
            themes: {
                light: '',
                dark: 'dark',
            },
            defaultTheme: 'light',
            parentSelector: 'html',
        }),
        applicationConfig({
            providers: [provideSpartanHlm()],
        }),
    ],
    parameters: {
        backgrounds: {
            options: {
                light: { name: 'light', value: '#ffffff' },
                dark: { name: 'dark', value: '#18181b' },
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: 'light' },
    },
};

export default preview;
