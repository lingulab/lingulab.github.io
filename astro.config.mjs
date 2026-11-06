import { defineConfig } from 'astro/config';
import { siteUrl, base } from './src/site.config.ts';

export default defineConfig({
  site: siteUrl || undefined,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
