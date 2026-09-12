// One-off uploader for static site banner images (not tied to a product row).
// Reuses the product-images bucket under a _site/ prefix so no new bucket/RLS
// policy setup is needed.
//
// Usage: node scripts/upload-banner-image.mjs <local-file-path> <storage-path>
// Example: node scripts/upload-banner-image.mjs "D:/my page/photo.jpeg" _site/shop-phones-banner.jpg

import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const [, , localPath, storagePath] = process.argv;
if (!localPath || !storagePath) {
  console.error('Usage: node scripts/upload-banner-image.mjs <local-file-path> <storage-path>');
  process.exit(1);
}

const BUCKET = 'product-images';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const buffer = await readFile(localPath);
const contentType = localPath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

const { error: uploadError } = await supabase.storage
  .from(BUCKET)
  .upload(storagePath, buffer, { contentType, upsert: true });

if (uploadError) {
  console.error('Upload failed:', uploadError.message);
  process.exit(1);
}

const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
console.log(data.publicUrl);
