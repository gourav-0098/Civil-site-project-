import { env } from '../config/env.js';

/**
 * Triggers Next.js on-demand cache revalidation for affected routes.
 */
export async function triggerRevalidation(paths = []) {
  if (!paths || paths.length === 0) return;

  const targetUrl = `${env.NEXT_PUBLIC_SITE_URL}/api/revalidate`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        secret: env.REVALIDATION_SECRET,
        paths
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`[Revalidation] Warning: Next.js returned ${response.status} for paths:`, paths);
    } else {
      console.log(`[Revalidation] Successfully revalidated paths:`, paths);
    }
  } catch (error) {
    // Non-blocking in local dev/tests if Next.js is not yet running
    console.warn(`[Revalidation] Note: Could not reach Next.js revalidation at ${targetUrl} (${error.message})`);
  }
}
