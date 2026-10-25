import { addons } from 'storybook/manager-api';

import { darkTheme, lightTheme } from './themes';

addons.setConfig({
    theme: lightTheme,
});

addons.register('gacc/manager-theme-sync', (api) => {
    const applyTheme = (themeName?: string) => {
        const selectedTheme = themeName === 'dark' ? darkTheme : lightTheme;
        api.setOptions({
            theme: selectedTheme,
        });
    };

    // Initial sync from active globals (e.g. ?globals=theme:dark)
    const initialGlobals = api.getGlobals();
    if (initialGlobals?.theme) {
        applyTheme(initialGlobals.theme);
    }

    // Dynamic sync on initial preview connection
    api.on('setGlobals', ({ globals }: { globals?: { theme?: string } }) => {
        if (globals?.theme) {
            applyTheme(globals.theme);
        }
    });

    // Dynamic sync on toolbar switch
    api.on('globalsUpdated', ({ globals }: { globals?: { theme?: string } }) => {
        if (globals?.theme) {
            applyTheme(globals.theme);
        }
    });
});
