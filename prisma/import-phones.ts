/**
 * Imports recent phone models from the MobileAPI.dev spec database into the
 * Product table (category=PHONE), with images re-uploaded to this project's
 * own Supabase Storage bucket rather than hotlinked.
 *
 * Usage:
 *   npx tsx prisma/import-phones.ts
 *
 * Requires in .env.local:
 *   MOBILEAPI_DEV_KEY              — from https://mobileapi.dev/signup/
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Price and stock are intentionally left at 0 — MobileAPI.dev doesn't carry
 * regional pricing, so nothing here should be treated as sellable until you
 * set a real price/stock for it in /admin/products.
 *
 * Safe to re-run: products are upserted by slug, so running this again just
 * refreshes existing entries and adds any new ones.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// --- Configuration -----------------------------------------------------

// Keep this list short on the free tier (200 requests/month, 5/min). Add
// brands as needed — these match the ones already listed in sanity.config.ts.
// Override for a smaller test run: IMPORT_BRANDS="Samsung" npx tsx prisma/import-phones.ts
const BRANDS = process.env.IMPORT_BRANDS
  ? process.env.IMPORT_BRANDS.split(",").map((b) => b.trim()).filter(Boolean)
  : ["Samsung", "Apple", "Tecno", "Infinix", "itel", "Xiaomi"];

// Only import models released in this year or later.
const MIN_RELEASE_YEAR = new Date().getUTCFullYear() - 2;

// Stop after this many matching devices per brand — keeps a first run cheap.
// Override: IMPORT_MAX_PER_BRAND=2
const MAX_PER_BRAND = Number(process.env.IMPORT_MAX_PER_BRAND ?? 8);

// Delay between MobileAPI.dev requests. Free tier allows 5/min; 13s keeps
// us safely under that. Lower this (e.g. 150) if you're on the Pro plan.
const REQUEST_DELAY_MS = Number(process.env.MOBILEAPI_DELAY_MS ?? 13000);

const MOBILEAPI_BASE = "https://api.mobileapi.dev";
const PRODUCT_IMAGES_BUCKET = "product-images";

// --- Clients -------------------------------------------------------------

const apiKey = process.env.MOBILEAPI_DEV_KEY;
if (!apiKey) {
  console.error("MOBILEAPI_DEV_KEY is not set in .env.local — sign up at https://mobileapi.dev/signup/");
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set in .env.local");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// --- MobileAPI.dev types (only the fields we use) -------------------------

interface DeviceSummary {
  id: number;
  name: string;
  manufacturer_name: string;
}

interface DeviceDetail extends DeviceSummary {
  device_type?: string;
  image_b64?: string;
  screen_resolution?: string;
  camera?: string;
  battery_capacity?: string;
  hardware?: string;
  storage?: string;
  colors?: string;
  weight?: string;
  thickness?: string;
  release_date?: string;
  model_numbers?: string;
  description?: string;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mobileApiRequest<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(MOBILEAPI_BASE + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url, {
    headers: { Authorization: `Token ${apiKey}` },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`MobileAPI.dev request failed (${response.status}): ${path} — ${body.slice(0, 200)}`);
  }

  return response.json() as Promise<T>;
}

function extractReleaseYear(releaseDate: string | undefined): number | null {
  if (!releaseDate) return null;
  const match = releaseDate.match(/(\d{4})/);
  return match ? Number(match[1]) : null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectImageType(buffer: Buffer): { ext: string; contentType: string } {
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return { ext: "png", contentType: "image/png" };
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return { ext: "jpg", contentType: "image/jpeg" };
  if (buffer.slice(0, 4).toString("ascii") === "RIFF") return { ext: "webp", contentType: "image/webp" };
  return { ext: "bin", contentType: "application/octet-stream" };
}

async function uploadImage(productId: string, base64: string): Promise<string | null> {
  try {
    const raw = base64.includes(",") ? base64.split(",")[1] : base64;
    const buffer = Buffer.from(raw, "base64");
    const { ext, contentType } = detectImageType(buffer);
    if (contentType === "application/octet-stream") return null;

    const path = `${productId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, buffer, { contentType });
    if (error) {
      console.error(`  ⚠ image upload failed: ${error.message}`);
      return null;
    }
    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("  ⚠ image processing failed:", error);
    return null;
  }
}

async function importBrand(brand: string, stats: { created: number; updated: number; skipped: number; errors: number }) {
  console.log(`\n=== ${brand} ===`);

  let list: DeviceSummary[];
  try {
    const result = await mobileApiRequest<{ results?: DeviceSummary[] } | DeviceSummary[]>(
      "/devices/by-manufacturer/",
      { manufacturer: brand, page: "1" }
    );
    list = Array.isArray(result) ? result : (result.results ?? []);
  } catch (error) {
    console.error(`Failed to list devices for ${brand}:`, error);
    stats.errors++;
    return;
  }
  await sleep(REQUEST_DELAY_MS);

  let imported = 0;
  for (const summary of list) {
    if (imported >= MAX_PER_BRAND) break;

    let detail: DeviceDetail;
    try {
      detail = await mobileApiRequest<DeviceDetail>(`/devices/${summary.id}/`, {});
    } catch (error) {
      console.error(`  ⚠ failed to fetch details for ${summary.name}:`, error);
      stats.errors++;
      await sleep(REQUEST_DELAY_MS);
      continue;
    }
    await sleep(REQUEST_DELAY_MS);

    const year = extractReleaseYear(detail.release_date);
    if (year !== null && year < MIN_RELEASE_YEAR) {
      continue; // too old — don't count against MAX_PER_BRAND
    }

    const title = `${detail.manufacturer_name} ${detail.name}`.trim();
    const slug = slugify(title);

    const specs: Record<string, string> = {};
    if (detail.screen_resolution) specs.display = detail.screen_resolution;
    if (detail.camera) specs.camera = detail.camera;
    if (detail.battery_capacity) specs.battery = detail.battery_capacity;
    if (detail.hardware) specs.hardware = detail.hardware;
    if (detail.storage) specs.storage = detail.storage;
    if (detail.colors) specs.colors = detail.colors;
    if (detail.weight) specs.weight = detail.weight;
    if (detail.release_date) specs.released = detail.release_date;

    try {
      const existing = await prisma.product.findUnique({ where: { slug }, select: { id: true, images: true } });

      const productId =
        existing?.id ??
        (
          await prisma.product.create({
            data: {
              title,
              slug,
              description: detail.description?.slice(0, 2000) || `${title} specifications.`,
              price: 0,
              stock: 0,
              category: "PHONE",
              brand: detail.manufacturer_name,
              modelName: detail.name,
              images: [],
              specs,
            },
          })
        ).id;

      if (existing) {
        await prisma.product.update({
          where: { id: existing.id },
          data: {
            description: detail.description?.slice(0, 2000) || undefined,
            modelName: detail.name,
            specs,
          },
        });
      }

      let imageUrl: string | null = null;
      const hasImage = existing ? existing.images.length > 0 : false;
      if (!hasImage && detail.image_b64) {
        imageUrl = await uploadImage(productId, detail.image_b64);
        if (imageUrl) {
          await prisma.product.update({ where: { id: productId }, data: { images: { push: imageUrl } } });
        }
      }

      if (existing) {
        stats.updated++;
        console.log(`  ↻ updated: ${title}`);
      } else {
        stats.created++;
        console.log(`  ✓ created: ${title}${imageUrl ? " (with image)" : ""}`);
      }
      imported++;
    } catch (error) {
      console.error(`  ⚠ failed to save ${title}:`, error);
      stats.errors++;
    }
  }

  if (imported === 0) {
    console.log(`  (no models from ${MIN_RELEASE_YEAR}+ found in the first page of results)`);
    stats.skipped++;
  }
}

async function main() {
  console.log(`Importing phones released ${MIN_RELEASE_YEAR}+ for: ${BRANDS.join(", ")}`);
  console.log(`(up to ${MAX_PER_BRAND} per brand, ${REQUEST_DELAY_MS}ms between requests)\n`);

  const stats = { created: 0, updated: 0, skipped: 0, errors: 0 };
  for (const brand of BRANDS) {
    await importBrand(brand, stats);
  }

  console.log("\n=== Done ===");
  console.log(`Created: ${stats.created}  Updated: ${stats.updated}  Errors: ${stats.errors}`);
  console.log("\nAll imported products have price=0, stock=0 — set real pricing in /admin/products before they go live.");

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
