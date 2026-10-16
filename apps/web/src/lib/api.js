const API_BASE_URL = process.env.API_INTERNAL_URL || (
  process.env.NODE_ENV === 'production'
    ? 'https://api-chi-six-63.vercel.app'
    : 'http://127.0.0.1:5000'
);

/**
 * Server-side direct fetch helper to Express API
 */
export async function fetchServerApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-internal-proxy-key': process.env.REVALIDATION_SECRET || 'nivara_infra_revalidation_secret_key_2026'
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      signal: controller.signal,
      next: { revalidate: options.revalidate !== undefined ? options.revalidate : 300 }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const error = new Error(errorData.error || `HTTP ${res.status}`);
      error.status = res.status;
      error.details = errorData;
      throw error;
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function getPublicProjects(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page);
  if (params.limit) searchParams.set('limit', params.limit);
  if (params.category && params.category !== 'All') searchParams.set('category', params.category);
  if (params.status && params.status !== 'All') searchParams.set('status', params.status);
  if (params.search) searchParams.set('search', params.search);

  const queryStr = searchParams.toString();
  const endpoint = `/api/v1/projects${queryStr ? `?${queryStr}` : ''}`;
  return fetchServerApi(endpoint, { revalidate: 60 });
}

export async function getFeaturedProjects() {
  return fetchServerApi('/api/v1/projects/featured', { revalidate: 60 });
}

export async function getProjectBySlug(slug, preview = false) {
  const endpoint = `/api/v1/projects/${encodeURIComponent(slug)}${preview ? '?preview=true' : ''}`;
  return fetchServerApi(endpoint, { revalidate: preview ? 0 : 300 });
}

export async function getCategories() {
  return fetchServerApi('/api/v1/categories', { revalidate: 300 });
}
