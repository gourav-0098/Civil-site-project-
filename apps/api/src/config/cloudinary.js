import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Generate a secure signature for direct signed uploads from the browser.
 * The API secret is NEVER exposed to the frontend.
 */
export function generateUploadSignature(folder = 'nivara/projects') {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = {
    folder,
    timestamp
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    env.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature,
    apiKey: env.CLOUDINARY_API_KEY,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    folder
  };
}

/**
 * Safely delete an asset from Cloudinary
 */
export async function deleteAsset(publicId, resourceType = 'image') {
  if (!publicId || publicId.startsWith('mock_') || publicId.startsWith('demo_')) {
    return { result: 'ok_mock' };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true
    });
    return result;
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error.message);
    throw error;
  }
}

export default cloudinary;
