import { defaultLocale } from '../site.config';

const modules = import.meta.glob('./*.json', { eager: true, import: 'default' }) as Record<string, any>;

export const locales: string[] = Object.keys(modules)
  .map((path) => path.match(/\.\/(.+)\.json$/)![1])
  .sort();

function lookup(dict: any, key: string): any {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

export function useTranslations(lang: string) {
  const dict = modules[`./${lang}.json`];
  const fallback = modules[`./${defaultLocale}.json`];
  return function t(key: string): any {
    let value = lookup(dict, key);
    if (value === undefined) {
      value = lookup(fallback, key);
      if (value !== undefined) console.warn(`[i18n] "${key}" missing in ${lang}, using ${defaultLocale}`);
    }
    if (value === undefined) throw new Error(`[i18n] missing key "${key}"`);
    return value;
  };
}
