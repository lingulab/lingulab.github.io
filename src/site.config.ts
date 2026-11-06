export const brandParts = ['Lingu', 'Lab'] as const;
export const brand: string = brandParts.join('');

// Leave empty until an address exists. The contact section then shows text only.
export const contactEmail = 'lingulab.hello@gmail.com';

// Absolute origin, for example 'https://example.github.io' or 'https://lingulab.app'.
// Empty means canonical and hreflang links are not emitted.
export const siteUrl = 'https://lingulab.github.io';

// '/' for a custom domain, '/repo-name' for a GitHub Pages project site.
export const base = '/';

export const defaultLocale = 'tr';

// Order and native names for the language menu. A locale appears once its src/i18n/<code>.json exists.
export const localeNames: Record<string, string> = {
  tr: 'Türkçe',
  nl: 'Nederlands',
  en: 'English',
  ar: 'العربية',
  uk: 'Українська',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  fr: 'Français',
};
