/**
 * Client-Side In-Browser Image Compressor
 *
 * Compresses large high-resolution photos (often 5MB - 25MB from modern smartphone
 * or DSLR cameras) directly inside the browser using native Canvas APIs before
 * uploading to Cloudinary.
 *
 * Benefits:
 * - Drastically reduces upload time and latency for the admin.
 * - Saves mobile data and avoids browser network timeouts.
 * - Bypasses any payload size restrictions.
 * - Conserves Cloudinary storage and transformation credits.
 */

export async function compressImageBeforeUpload(file, options = {}) {
  // If not running in a browser or file is not an image, return original
  if (typeof window === 'undefined' || !file || !(file instanceof File)) {
    return { file, originalSize: file?.size || 0, compressedSize: file?.size || 0, wasCompressed: false };
  }

  // Skip compression for SVGs, GIFs (which have animations), or non-image types
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return { file, originalSize: file.size, compressedSize: file.size, wasCompressed: false };
  }

  const {
    maxWidth = 2560,
    maxHeight = 2560,
    quality = 0.82,
    maxSizeBytes = 750 * 1024 // 750 KB threshold
  } = options;

  const originalSize = file.size;

  // If already under size threshold (e.g. < 750 KB), no heavy compression needed
  if (originalSize <= maxSizeBytes) {
    return { file, originalSize, compressedSize: originalSize, wasCompressed: false };
  }

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Calculate proportional dimensions
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback to original file if canvas context fails
        return resolve({ file, originalSize, compressedSize: originalSize, wasCompressed: false });
      }

      // High quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format (prefer WebP if supported, fallback to JPEG)
      const outputType = 'image/jpeg';

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return resolve({ file, originalSize, compressedSize: originalSize, wasCompressed: false });
          }

          // If compression somehow produced a larger file, keep original
          if (blob.size >= originalSize) {
            return resolve({ file, originalSize, compressedSize: originalSize, wasCompressed: false });
          }

          // Convert blob back to a File instance
          const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
            type: outputType,
            lastModified: Date.now()
          });

          const compressedSize = compressedFile.size;
          const savedBytes = originalSize - compressedSize;
          const ratioPercent = Math.round((savedBytes / originalSize) * 100);

          resolve({
            file: compressedFile,
            originalSize,
            compressedSize,
            wasCompressed: true,
            reductionPercent: ratioPercent
          });
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback to original file on error
      resolve({ file, originalSize, compressedSize: originalSize, wasCompressed: false });
    };

    img.src = objectUrl;
  });
}

/**
 * Format bytes into human-readable string (e.g., 2.4 MB, 450 KB)
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
