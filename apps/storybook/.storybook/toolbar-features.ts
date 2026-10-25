export interface ToolbarFeatures {
    /** Corner radius presets tool (None, Subtle, Moderate, Pronounced) */
    radius: boolean;
    /** Light / Dark theme switcher */
    theme: boolean;
    /** Accessibility panel and toolbar utilities */
    a11y: boolean;
    /** Background grid and color switcher */
    backgrounds: boolean;
}

export const DEFAULT_TOOLBAR_FEATURES: ToolbarFeatures = {
    radius: true,
    theme: true,
    a11y: true,
    backgrounds: false,
};

/**
 * Resolves whether a specific toolbar feature is enabled.
 * Priority:
 * 1. Runtime URL Query Parameter (?feature_<name>=true|false or ?features=-<name>)
 * 2. Build-time environment variable (STORYBOOK_FEATURE_<NAME>=true|false)
 * 3. Configuration default in DEFAULT_TOOLBAR_FEATURES
 */
export function isToolbarFeatureEnabled(feature: keyof ToolbarFeatures): boolean {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);

        // Exact query param: ?feature_radius=false or ?feature_radius=true
        const explicit = params.get(`feature_${feature}`);
        if (explicit === 'false' || explicit === '0') return false;
        if (explicit === 'true' || explicit === '1') return true;

        // Comma-separated list: ?features=-radius,-a11y or ?features=no-radius
        const featuresParam = params.get('features');
        if (featuresParam) {
            const list = featuresParam.split(',');
            if (list.includes(`-${feature}`) || list.includes(`no-${feature}`) || list.includes(`!${feature}`)) {
                return false;
            }
            if (list.includes(feature) || list.includes(`+${feature}`)) {
                return true;
            }
        }
    }

    // Build/Environment override (e.g. STORYBOOK_FEATURE_RADIUS=false)
    const envKey = `STORYBOOK_FEATURE_${feature.toUpperCase()}`;
    const envVal = typeof process !== 'undefined' ? process.env?.[envKey] : undefined;
    if (envVal === 'false' || envVal === '0') return false;
    if (envVal === 'true' || envVal === '1') return true;

    return DEFAULT_TOOLBAR_FEATURES[feature];
}
