import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { applicationConfig, type Preview } from '@storybook/angular';

import { provideSpartanHlm } from '../utils/src/provide-spartan-hlm';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [provideZonelessChangeDetection(), provideAnimations(), provideSpartanHlm()],
        }),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
