import { base } from './site.config';

export function href(path = ''): string {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
