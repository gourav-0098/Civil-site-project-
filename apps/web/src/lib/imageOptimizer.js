/**
 * Unified Image Optimization & Compression Utility
 * Supports dynamic CDN transformations for both Unsplash and Cloudinary
 */

export const IMAGE_PRESETS = {
  // Low Quality Image Placeholder for instant blur-up (~2 KB)
  blur: { width: 40, quality: 30 },
  // Cards, directory grid items, and gallery grid thumbnails (~45-75 KB)
  thumbnail: { width: 640, quality: 72 },
  // Large project cards & medium banners (~120-180 KB)
  medium: { width: 1024, quality: 75 },
  // Detail page hero cover and landing page hero banner (~250-380 KB)
  hero: { width: 1920, quality: 80 },
  // High-resolution Lightbox viewer for detailed zoom (~350-500 KB)
  lightbox: { width: 2048, quality: 85 }
};

/**
 * Returns a dynamically resized, compressed, and auto-formatted URL (WebP/AVIF)
 * for Unsplash and Cloudinary assets.
 *
 * @param {string} url - Original image URL
 * @param {Object} options - { width, quality, format }
 * @returns {string} - Optimized CDN URL
 */
export function getOptimizedImageUrl(url, options = IMAGE_PRESETS.thumbnail) {
  if (!url || typeof url !== 'string') return '';

  const { width = 640, quality = 75, format = 'auto' } = options;

  // 1. Unsplash URL Optimization
  if (url.includes('images.unsplash.com')) {
    // Strip any existing query params to avoid duplicate flags
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }

  // 2. Cloudinary URL Optimization
  if (url.includes('res.cloudinary.com')) {
    // If the URL already has transformations, don't duplicate
    if (url.includes('/upload/f_auto') || url.includes('/upload/w_')) {
      return url;
    }
    // Inject dynamic transformation directly after '/upload/'
    const transformation = `f_auto,q_auto:eco,w_${width},c_fill`;
    return url.replace('/upload/', `/upload/${transformation}/`);
  }

  // 3. Fallback for other external URLs
  return url;
}
