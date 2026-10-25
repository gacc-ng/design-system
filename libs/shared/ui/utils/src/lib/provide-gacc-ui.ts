import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/**
 * Provides default configuration for @gacc-ng/ui design system components.
 *
 * This utility configures the Angular CDK overlay to disable the `usePopover`
 * behavior introduced in Angular 21, ensuring CDK overlay-based components
 * (sheets, dialogs, tooltips, dropdowns, etc.) render properly with overlay containers.
 *
 * @returns {EnvironmentProviders} Environment providers to be added to the application config.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideGaccUi } from '@gacc-ng/ui/utils';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideGaccUi(),
 *     // ... other providers
 *   ],
 * };
 * ```
 */
export function provideGaccUi(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: OVERLAY_DEFAULT_CONFIG,
            useValue: { usePopover: false },
        },
    ]);
}

/**
 * Ergonomic alias for `provideGaccUi` matching all-caps UI acronym casing.
 */
export const provideGaccUI = provideGaccUi;

/**
 * @deprecated Use `provideGaccUi()` instead. Will be removed in future versions.
 */
export const provideSpartanHlm = provideGaccUi;
