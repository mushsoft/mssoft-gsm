# MS Soft GSM

Phone spares, devices, testpoint diagrams, and repair tools storefront for Uganda — built with Next.js (App Router), Prisma/Postgres, Sanity CMS, and Flutterwave.

## Stack

- **Next.js 16** (App Router, Turbopack) — this project pins a version ahead of most published docs; check `node_modules/next/dist/docs/` for behavior that differs from what you may expect.
- **Prisma 7** + `@prisma/adapter-pg` — product catalog, orders, checkout.
- **Sanity** — testpoint diagrams, device specs, banners, hot deals (`/studio`).
- **Flutterwave** — mobile money / card checkout, confirmed via webhook.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` (and set `DATABASE_URL` in `.env`) and fill in real values. See the comments in `.env.example` for what each variable is for — in particular, `DATABASE_URL` must be a plain `postgres://` connection string, not the `prisma+postgres://` proxy URL Prisma's local dev server prints by default.

3. Start a local database and apply migrations:
   ```bash
   npx prisma dev start default   # starts a local Postgres instance
   npx prisma migrate dev         # applies prisma/migrations
   npm run db:seed                # seeds a handful of sample products
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Content Editing (Sanity Studio)

Product listings, testpoint diagrams, devices, and banners are managed at [`/studio`](http://localhost:3000/studio). The schema lives inline in `sanity.config.ts` — it's the single source of truth for the `category` enum (`PHONE`, `SCREEN`, `ACCESSORY`, `REPAIR_TOOL`, `TESTPOINT`); keep any GROQ queries in `src/lib/sanityQueries.ts` in sync with it.

## Product Images (Supabase Storage)

Product images are uploaded through an internal admin page at [`/admin/products`](http://localhost:3000/admin/products), gated by a single shared password (`ADMIN_PASSWORD` — not full user accounts; see `src/lib/adminAuth.ts` for the tradeoffs).

To set this up:
1. In your Supabase project, go to **Storage** and create a new bucket named exactly `product-images`, set to **public** (so uploaded images are readable via a public URL — write access is still restricted, since only the server-side admin route can upload, using the service role key).
2. From **Project Settings > API**, copy the Project URL and both the `anon` and `service_role` keys into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. The service role key must stay server-only — never prefix it with `NEXT_PUBLIC_`.
3. Set `ADMIN_PASSWORD` in `.env.local` to whatever password should gate `/admin/products`.
4. Sign in at `/admin/login`, then manage images per product at `/admin/products`.

## Importing Phone Data

`prisma/import-phones.ts` bulk-imports recent phone models (specs + images) into the `Product` table via [MobileAPI.dev](https://mobileapi.dev) — a paid third-party specs API, not a scraper. (GSMArena itself has no public API and explicitly disallows AI/automated crawlers in its `robots.txt`, so this project does not scrape it directly or indirectly.)

1. Sign up at [mobileapi.dev/signup](https://mobileapi.dev/signup/) and set `MOBILEAPI_DEV_KEY` in `.env.local`. The free tier (200 requests/month, 5/min) is enough for a small test batch; the $15/mo Pro tier (10,000/month) is more realistic for importing many brands.
2. Edit the `BRANDS` / `MIN_RELEASE_YEAR` / `MAX_PER_BRAND` constants at the top of the script to fit what you actually stock, or override per-run:
   ```bash
   IMPORT_BRANDS="Samsung" IMPORT_MAX_PER_BRAND=2 npm run import:phones
   ```
3. Run it: `npm run import:phones`. It's safe to re-run — products are upserted by slug, and images are only uploaded once per product (re-running won't re-download them).

Imported products always have `price: 0, stock: 0` — there's no reliable regional pricing in the source data, so nothing imported is sellable until you set a real price and stock in [`/admin/products`](http://localhost:3000/admin/products).

## Checkout & Payments

`/api/checkout` creates a `PENDING` order (price/stock always computed server-side from the database, never trusted from the client) and starts a Flutterwave payment. Orders only move to `SUCCESSFUL` once `/api/checkout/webhook` independently re-verifies the transaction with Flutterwave's API — the payment redirect alone is never treated as proof of payment. To receive webhooks locally, point a tunnel (e.g. `ngrok`) at `/api/checkout/webhook` and configure the same URL + secret hash in the Flutterwave dashboard.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Lint the codebase |
| `npm run db:seed` | Seed sample products into Postgres |
| `npm run import:phones` | Bulk-import phone specs/images from MobileAPI.dev |

## Project Structure

- `src/app/` — routes (App Router)
- `src/components/` — shared UI components
- `src/lib/` — Prisma client, Sanity clients/queries, formatters
- `prisma/` — schema, migrations, seed script
- `sanity.config.ts` — Sanity Studio schema and config
