import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const docsEntries: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified,
    changeFrequency: page.url === '/docs' ? 'weekly' : 'monthly',
    priority: page.url === '/docs' ? 0.9 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docsEntries,
  ];
}

