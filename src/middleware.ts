import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './config';

export default createMiddleware({
    defaultLocale: 'en',
    locales,
    pathnames,
    localePrefix,
    localeDetection: true
});

export const config = {
    matcher: ['/', '/(en|fr|es|de|pt|it|nl|sv|no|da|fi|cs|pl|uk|be|et|lv|lt|ro|kk|ru|tr|he|ko|ja|zh|hi|ar|id|bg|ka|el)/:path*']
};