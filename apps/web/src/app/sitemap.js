import { getPublicProjects } from '../lib/api';

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/projects',
    '/services',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  let projectRoutes = [];
  try {
    const res = await getPublicProjects({ limit: 100 });
    if (res?.success && Array.isArray(res.data)) {
      projectRoutes = res.data.map(p => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9
      }));
    }
  } catch (err) {
    console.warn('Note: Could not fetch projects for sitemap:', err.message);
  }

  return [...staticRoutes, ...projectRoutes];
}
