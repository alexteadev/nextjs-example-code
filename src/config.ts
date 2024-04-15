import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'es', 'de', 'pt', 'it', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'pl', 'uk', 'be', 'et', 'lv', 'lt', 'ro', 'kk', 'ru', 'tr', 'he', 'ko', 'ja', 'zh', 'hi', 'ar', 'id', 'bg', 'ka', 'el'];

export const pathnames = {
    '/': '/',
    '/about-us': '/about-us',
    '/my-lists': '/my-lists',
    '/my-profile': '/my-profile',
    "/terms-of-use": "/terms-of-use",
    "/privacy-policy": "/privacy-policy",
    "/cookies-policy": "/cookies-policy",
    "/contact-us": "/contact-us",
    // ...
    '/actors': '/actors',
    '/actors/[idname]': '/actors/[idname]',
    '/directors': '/directors',
    '/directors/[idname]': '/directors/[idname]',
    '/films/[idname]': '/films/[idname]',
    '/series/[idname]': '/series/[idname]'
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;