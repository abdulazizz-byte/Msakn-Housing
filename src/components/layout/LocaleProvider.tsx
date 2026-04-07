/**
 * Re-exports NextIntlClientProvider for convenience.
 *
 * Usage in a server layout:
 *   import { NextIntlClientProvider } from 'next-intl';
 *   // or
 *   import { LocaleProvider } from '@/components/layout/LocaleProvider';
 *
 * Both are equivalent -- this file exists so layout imports stay consistent
 * with the rest of the components/layout barrel.
 */
export { NextIntlClientProvider as LocaleProvider } from 'next-intl';
