import { addons, types } from 'storybook/manager-api';

import { RadiusTool } from './radius-tool';
import { readInitialThemeMode, resolveTheme } from './theme-presets';
import { ThemeTool } from './theme-tool';
import { darkTheme, lightTheme } from './themes';
import { isToolbarFeatureEnabled } from './toolbar-features';

function getInitialTheme(): typeof darkTheme | typeof lightTheme {
    const initialMode = readInitialThemeMode();
    const resolved = resolveTheme(initialMode);
    return resolved === 'dark' ? darkTheme : lightTheme;
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

    // Initial sync from active globals or stored theme mode
    const initialMode = readInitialThemeMode();
    const resolved = resolveTheme(initialMode);
    applyTheme(resolved);

    // Shared sync listener for initial preview connection & toolbar switch
    const handleThemeSync = ({ globals }: { globals?: { theme?: string } }) => {
        if (globals?.theme) {
            applyTheme(globals.theme);
        }
    };

    api.on('setGlobals', handleThemeSync);
    api.on('globalsUpdated', handleThemeSync);

    // Custom Theme dropdown tool (Light, Dark, System + Corner radius)
    if (isToolbarFeatureEnabled('theme')) {
        addons.add('gacc/theme-tool', {
            title: 'Theme',
            type: types.TOOL,
            match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
            render: ThemeTool,
        });
    }

    // Standalone Radius tool only if explicitly enabled without the unified Theme tool
    if (isToolbarFeatureEnabled('radius') && !isToolbarFeatureEnabled('theme')) {
        addons.add('gacc/radius-tool', {
            title: 'Corner Radius',
            type: types.TOOL,
            match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
            render: RadiusTool,
        });
    }
});
