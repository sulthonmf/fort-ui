import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'fort-ui';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// GitHub repository used for navbar links and "Edit on GitHub".
export const gitConfig = {
  user: 'sulthonmf',
  repo: 'fort-ui',
  branch: 'main',
};

// Configure your Saweria or donation URL (e.g. https://saweria.co/username).
export const donateConfig = {
  url: process.env.NEXT_PUBLIC_DONATE_URL ?? 'https://saweria.co/sulthonmf',
  label: 'Buy Me a Coffee',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
