import { addons, types } from 'storybook/manager-api';

import { RadiusTool } from './radius-tool';
import { darkTheme, lightTheme } from './themes';

function getInitialTheme(): typeof darkTheme | typeof lightTheme {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const globals = params.get('globals');
        if (globals) {
            const pairs = globals.split(';');
            for (const pair of pairs) {
                const [key, value] = pair.split(':');
                if (key === 'theme' && value === 'dark') {
                    return darkTheme;
                }
            }
        }
    }
    return lightTheme;
}

addons.setConfig({
    theme: getInitialTheme(),
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

    // Shared sync listener for initial preview connection & toolbar switch
    const handleThemeSync = ({ globals }: { globals?: { theme?: string } }) => {
        if (globals?.theme) {
            applyTheme(globals.theme);
        }
    };

    api.on('setGlobals', handleThemeSync);
    api.on('globalsUpdated', handleThemeSync);

    // Custom non-destructive Radius tool
    addons.add('gacc/radius-tool', {
        title: 'Corner Radius',
        type: types.TOOL,
        match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
        render: RadiusTool,
    });
});
