import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
    computed,
    DestroyRef,
    DOCUMENT,
    inject,
    Injectable,
    PLATFORM_ID,
    REQUEST,
    type Signal,
    signal,
} from '@angular/core';

import { injectHlmSidebarConfig } from './hlm-sidebar.token';

export type SidebarVariant = 'sidebar' | 'floating' | 'inset';

@Injectable({ providedIn: 'root' })
export class HlmSidebarService {
    private readonly _platformId = inject(PLATFORM_ID);
    private readonly _request = inject(REQUEST, { optional: true });
    private readonly _config = injectHlmSidebarConfig();
    private readonly _document = inject(DOCUMENT);
    private readonly _window = this._document.defaultView;
    private readonly _open = signal<boolean>(this._config.defaultOpen);
    private readonly _openMobile = signal<boolean>(false);
    private readonly _isMobile = signal<boolean>(false);
    private readonly _variant = signal<SidebarVariant>('sidebar');
    private _mediaQuery: MediaQueryList | null = null;

    public readonly open: Signal<boolean> = this._open.asReadonly();
    public readonly openMobile: Signal<boolean> = this._openMobile.asReadonly();
    public readonly isMobile: Signal<boolean> = this._isMobile.asReadonly();
    public readonly variant: Signal<SidebarVariant> = this._variant.asReadonly();

    public readonly state = computed<'expanded' | 'collapsed'>(() => (this._open() ? 'expanded' : 'collapsed'));

    constructor() {
        const destroyRef = inject(DestroyRef);
        this.restoreStateFromCookie();

        if (isPlatformBrowser(this._platformId) && this._window) {
            if (typeof this._window.matchMedia === 'function') {
                this._mediaQuery = this._window.matchMedia(`(max-width: ${this._config.mobileBreakpoint})`);
                this._isMobile.set(this._mediaQuery.matches);

                const mediaQueryHandler = (e: MediaQueryListEvent) => {
                    this._isMobile.set(e.matches);
                    if (!e.matches) this._openMobile.set(false);
                };
                this._mediaQuery.addEventListener('change', mediaQueryHandler);

                destroyRef.onDestroy(() => {
                    if (this._mediaQuery) this._mediaQuery.removeEventListener('change', mediaQueryHandler);
                });
            }

            const keydownHandler = (event: KeyboardEvent) => {
                const target = event.target as HTMLElement | null;
                if (
                    target?.tagName === 'INPUT' ||
                    target?.tagName === 'TEXTAREA' ||
                    target?.isContentEditable ||
                    target?.getAttribute?.('contenteditable') === 'true' ||
                    target?.getAttribute?.('contenteditable') === ''
                ) {
                    return;
                }
                if (
                    event.key.toLowerCase() === this._config.sidebarKeyboardShortcut.toLowerCase() &&
                    (event.ctrlKey || event.metaKey)
                ) {
                    event.preventDefault();
                    this.toggleSidebar();
                }
            };
            this._window.addEventListener('keydown', keydownHandler);

            let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
            const resizeHandler = () => {
                if (!this._window) return;

                if (resizeTimeout) this._window.clearTimeout(resizeTimeout);
                resizeTimeout = this._window.setTimeout(() => {
                    if (this._mediaQuery) this._isMobile.set(this._mediaQuery.matches);
                }, 100);
            };
            this._window.addEventListener('resize', resizeHandler);

            destroyRef.onDestroy(() => {
                if (!this._window) return;
                this._window.removeEventListener('keydown', keydownHandler);
                this._window.removeEventListener('resize', resizeHandler);
                if (resizeTimeout) this._window.clearTimeout(resizeTimeout);
            });
        }
    }

    public setOpen(open: boolean): void {
        this._open.set(open);
        if (isPlatformBrowser(this._platformId) && this._document) {
            this._document.cookie = `${this._config.sidebarCookieName}=${open}; path=/; max-age=${this._config.sidebarCookieMaxAge}`;
        }
    }

    public setOpenMobile(open: boolean): void {
        if (this._isMobile()) {
            this._openMobile.set(open);
        }
    }

    public setVariant(variant: SidebarVariant): void {
        this._variant.set(variant);
    }

    public toggleSidebar(): void {
        if (this._isMobile()) {
            this._openMobile.update((value) => !value);
        } else {
            this.setOpen(!this._open());
        }
    }

    private restoreStateFromCookie(): void {
        const cookieString = isPlatformServer(this._platformId)
            ? (this._request as { headers?: { get: (name: string) => string | null } } | null)?.headers?.get('cookie')
            : this._document?.cookie;

        if (!cookieString) return;

        const prefix = `${this._config.sidebarCookieName}=`;
        const cookieValue = cookieString
            .split(';')
            .map((c) => c.trim())
            .find((c) => c.startsWith(prefix))
            ?.slice(prefix.length);

        if (cookieValue !== undefined) {
            this._open.set(cookieValue === 'true');
        }
    }
}
