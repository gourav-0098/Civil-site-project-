import { NextResponse } from 'next/server';

const API_INTERNAL_URL = process.env.API_INTERNAL_URL || (
  process.env.NODE_ENV === 'production'
    ? 'https://api-chi-six-63.vercel.app'
    : 'http://127.0.0.1:5000'
);

// Explicitly permitted API prefixes
const ALLOWED_PATH_PREFIXES = [
  'auth/',
  'inquiries',
  'admin/',
  'projects',
  'categories',
  'health'
];

async function handleProxy(req, { params }) {
  const pathSegments = params.path || [];
  const joinedPath = pathSegments.join('/');

  // Reject path traversal attempts
  if (joinedPath.includes('..') || joinedPath.includes('\\') || joinedPath.includes('//')) {
    return NextResponse.json(
      { success: false, error: 'Path traversal attempt blocked' },
      { status: 400 }
    );
  }

  // Check allowlist
  const isAllowed = ALLOWED_PATH_PREFIXES.some(prefix => joinedPath.startsWith(prefix));
  if (!isAllowed) {
    return NextResponse.json(
      { success: false, error: 'Target API endpoint is not permitted via proxy' },
      { status: 403 }
    );
  }

  // Build target URL
  const { search } = new URL(req.url);
  const targetUrl = `${API_INTERNAL_URL}/api/v1/${joinedPath}${search}`;

  // Forward select safe headers
  const headers = new Headers();
  const forwardHeaders = ['content-type', 'cookie', 'authorization', 'x-requested-with'];
  forwardHeaders.forEach(h => {
    const val = req.headers.get(h);
    if (val) headers.set(h, val);
  });

  // Attach internal proxy secret
  const internalSecret = process.env.REVALIDATION_SECRET || 'nivara_infra_revalidation_secret_key_2026';
  headers.set('x-internal-proxy-key', internalSecret);

  // Upstream timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const requestOptions = {
      method: req.method,
      headers,
      signal: controller.signal,
      cache: 'no-store'
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const bodyText = await req.text();
      if (bodyText) {
        requestOptions.body = bodyText;
      }
    }

    const upstreamResponse = await fetch(targetUrl, requestOptions);
    clearTimeout(timeoutId);

    const responseData = await upstreamResponse.text();

    const responseHeaders = new Headers();
    responseHeaders.set('content-type', upstreamResponse.headers.get('content-type') || 'application/json');

    // Forward Set-Cookie headers correctly (handling comma separation in fetch)
    const setCookie = upstreamResponse.headers.get('set-cookie');
    if (setCookie) {
      responseHeaders.set('set-cookie', setCookie);
    }

    return new NextResponse(responseData, {
      status: upstreamResponse.status,
      headers: responseHeaders
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[Proxy Error] Error proxying ${req.method} to ${targetUrl}:`, error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.name === 'AbortError' ? 'Upstream API request timed out' : 'API service unavailable'
      },
      { status: error.name === 'AbortError' ? 504 : 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
