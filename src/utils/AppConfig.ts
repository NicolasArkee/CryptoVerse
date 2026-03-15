import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'CryptoVerse',
  tagline: "L'encyclopédie ultime des cryptomonnaies",
  i18n: {
    locales: ['fr', 'en', 'es', 'de', 'it'] as const,
    defaultLocale: 'fr' as const,
    localePrefix,
    localeNames: {
      fr: 'Français',
      en: 'English',
      es: 'Español',
      de: 'Deutsch',
      it: 'Italiano',
    } as Record<string, string>,
  },
};

export type Locale = (typeof AppConfig.i18n.locales)[number];
