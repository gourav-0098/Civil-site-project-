import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from monorepo root or process cwd
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config(); // fallback to current dir

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/nivara_infrastructure'),
  SESSION_SECRET: z.string().min(16).default('nivara_infra_dev_session_secret_at_least_32_characters_long_2026'),
  ALLOWED_ORIGIN: z.string().default('https://web-mu-nine-46.vercel.app'),
  REVALIDATION_SECRET: z.string().default('nivara_infra_revalidation_secret_key_2026'),
  CLOUDINARY_CLOUD_NAME: z.string().default('demo_cloud'),
  CLOUDINARY_API_KEY: z.string().default('demo_api_key'),
  CLOUDINARY_API_SECRET: z.string().default('demo_api_secret'),
  NEXT_PUBLIC_SITE_URL: z.string().default('https://web-mu-nine-46.vercel.app'),
  ADMIN_EMAIL: z.string().email().default('admin@nivarainfra.com'),
  ADMIN_PASSWORD: z.string().min(8).default('NivaraAdmin2026!'),
  ADMIN_NAME: z.string().default('Nivara Superadmin')
});


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn('⚠️ Environment validation notice:', parsed.error.format());
}

export const env = parsed.success ? parsed.data : envSchema.parse({});

