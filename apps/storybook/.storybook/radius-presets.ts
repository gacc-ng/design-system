export const RADIUS_OPTIONS = [
    { id: 'default', title: 'Default', value: '' },
    { id: 'none', title: 'None (0px)', value: '0rem' },
    { id: 'subtle', title: 'Subtle (4px)', value: '0.25rem' },
    { id: 'moderate', title: 'Moderate (14px)', value: '0.875rem' },
    { id: 'pronounced', title: 'Pronounced (24px)', value: '1.5rem' },
] as const;

export type RadiusPreset = (typeof RADIUS_OPTIONS)[number]['id'];

export const RADIUS_STORAGE_KEY = 'gacc-storybook-radius';
export const RADIUS_CHANNEL_EVENT = 'gacc/set-radius';

export interface SetRadiusPayload {
    radius: RadiusPreset;
    animate?: boolean;
}

export const RADIUS_MAP: Record<string, string> = Object.fromEntries(
    RADIUS_OPTIONS.filter((opt) => opt.value).map((opt) => [opt.id, opt.value]),
);

export function isRadiusPreset(value: unknown): value is RadiusPreset {
    return typeof value === 'string' && RADIUS_OPTIONS.some((opt) => opt.id === value);
}
