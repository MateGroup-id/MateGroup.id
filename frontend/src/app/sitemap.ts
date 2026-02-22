import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mategroup.id';

  const routes = [
    { path: '/',         priority: 1.0, changeFrequency: 'weekly'  as const },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly'  as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly'  as const },
    { path: '/about',    priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact',  priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/payment',  priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/terms',    priority: 0.5, changeFrequency: 'yearly'  as const },
    { path: '/privacy',  priority: 0.5, changeFrequency: 'yearly'  as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
  }));
}
