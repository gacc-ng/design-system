import { create } from 'storybook/theming';

/**
 * Storybook Dark Theme aligned with @gacc-ng/ui pitch black tokens (#09090b)
 */
export const darkTheme = create({
    base: 'dark',
    brandTitle: 'gacc-ng UI',
    appBg: '#09090b',
    appContentBg: '#09090b',
    appPreviewBg: '#09090b',
    barBg: '#09090b',
    barTextColor: '#a1a1aa',
    barSelectedColor: '#fafafa',
    textColor: '#fafafa',
    textInverseColor: '#18181b',
    inputBg: '#18181b',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
    inputTextColor: '#fafafa',
    gridCellSize: 12,
});

/**
 * Storybook Light Theme aligned with @gacc-ng/ui light tokens (#ffffff)
 */
export const lightTheme = create({
    base: 'light',
    brandTitle: 'gacc-ng UI',
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    barBg: '#ffffff',
    barTextColor: '#71717a',
    barSelectedColor: '#18181b',
    textColor: '#18181b',
    textInverseColor: '#ffffff',
    inputBg: '#ffffff',
    inputBorder: 'rgba(0, 0, 0, 0.1)',
    inputTextColor: '#18181b',
    gridCellSize: 12,
});
