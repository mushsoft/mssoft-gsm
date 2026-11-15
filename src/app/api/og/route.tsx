import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import sharp from 'sharp';
import { SHARE_IMAGE_SIZE, isAllowedSharePhoto, supabaseHostname } from '@/lib/shareMetadata';

// Branded link-preview card: the page title over a photo, with the logo.
// Built with ImageResponse (PNG), then re-encoded as JPEG because WhatsApp
// often skips preview images that are too large, and a photo card as PNG
// easily passes half a megabyte. Only photos allowed by isAllowedSharePhoto()
// are fetched (our own folders, our Supabase bucket, YouTube thumbnails).

const { width, height } = SHARE_IMAGE_SIZE;

// Geist (the site's font) in bold weights: the built-in font only has a
// regular weight, so titles came out thin. Loaded once per server instance;
// included in the deployment via outputFileTracingIncludes in next.config.
// The logo file has wide empty margins, so they're trimmed off to make the
// mark readable at card size.
const LOGO_HEIGHT = 64;
const assets = Promise.all([
  readFile(join(process.cwd(), 'src/app/api/og/fonts/Geist-Bold.ttf')),
  readFile(join(process.cwd(), 'src/app/api/og/fonts/Geist-Black.ttf')),
  readFile(join(process.cwd(), 'public/logo-mark.png')).then(async (file) => {
    const { data, info } = await sharp(file).trim().resize({ height: LOGO_HEIGHT * 2 }).png().toBuffer({ resolveWithObject: true });
    return {
      uri: `data:image/png;base64,${data.toString('base64')}`,
      width: Math.round((info.width / info.height) * LOGO_HEIGHT),
    };
  }),
]);

// "cover" fills the box (background photos). "contain" keeps the whole
// photo on white (product photos: often tall, and a crop would cut off the
// product). Transparent PNGs are put on white first.
async function fetchAsJpegDataUri(
  url: URL,
  resize: { width: number; height: number; fit: 'cover' | 'contain' }
): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null;
    const jpeg = await sharp(Buffer.from(await res.arrayBuffer()))
      .rotate()
      .flatten({ background: '#ffffff' })
      .resize(resize.width, resize.height, {
        fit: resize.fit,
        position: resize.fit === 'cover' ? 'attention' : 'centre',
        background: '#ffffff',
      })
      .jpeg({ quality: 82 })
      .toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
  } catch {
    return null;
  }
}

// Product cards: name and price on the left, the whole product photo on a
// white panel on the right.
const PRODUCT_PANEL = 480;
const PRODUCT_PHOTO = { width: 440, height: 560 };

function productTitleFontSize(title: string): number {
  if (title.length <= 30) return 58;
  if (title.length <= 55) return 48;
  if (title.length <= 80) return 40;
  return 34;
}

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function titleFontSize(title: string): number {
  if (title.length <= 28) return 72;
  if (title.length <= 48) return 60;
  if (title.length <= 75) return 50;
  return 42;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const title = (params.get('title') || 'MS Soft GSM').slice(0, 120);
  const subtitle = (params.get('subtitle') || '').slice(0, 90);
  const photo = params.get('photo') || '';
  const isProduct = params.get('layout') === 'product';
  const origin = request.nextUrl.origin;

  const photoUrl =
    photo && isAllowedSharePhoto(photo, supabaseHostname())
      ? photo.startsWith('/')
        ? new URL(photo, origin)
        : new URL(photo)
      : null;

  const [photoUri, [geistBold, geistBlack, logo]] = await Promise.all([
    photoUrl
      ? fetchAsJpegDataUri(photoUrl, isProduct ? { ...PRODUCT_PHOTO, fit: 'contain' } : { width, height, fit: 'cover' })
      : Promise.resolve(null),
    assets,
  ]);

  const brand = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', padding: '14px 18px', borderRadius: 18, background: 'white' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img> */}
        <img src={logo.uri} width={logo.width} height={LOGO_HEIGHT} alt="" />
      </div>
      <div style={{ display: 'flex', fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: -1 }}>
        MS Soft&nbsp;<span style={{ color: '#f59e0b' }}>GSM</span>
      </div>
    </div>
  );

  const productTitle = shorten(title, 95);
  const productCard = (
    <div style={{ width, height, display: 'flex', background: '#0a0a0a', fontFamily: 'Geist' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: width - PRODUCT_PANEL,
          height,
          padding: '56px 56px 52px 64px',
          backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)',
        }}
      >
        {brand}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: productTitleFontSize(productTitle),
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'white',
              letterSpacing: -1,
            }}
          >
            {productTitle}
          </div>
          {subtitle && (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                marginTop: 26,
                padding: '10px 22px',
                borderRadius: 14,
                background: '#f59e0b',
                fontSize: 38,
                fontWeight: 900,
                color: '#0a0a0a',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#a3a3a3' }}>
          Order on WhatsApp · www.mssoft-gsm.com
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: PRODUCT_PANEL,
          height,
          background: '#ffffff',
        }}
      >
        {photoUri ? (
          // eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img>
          <img src={photoUri} width={PRODUCT_PHOTO.width} height={PRODUCT_PHOTO.height} alt="" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img>
          <img src={logo.uri} width={logo.width * 2} height={LOGO_HEIGHT * 2} alt="" />
        )}
      </div>
    </div>
  );

  const png = new ImageResponse(
    isProduct ? productCard : (
      <div style={{ width, height, display: 'flex', position: 'relative', background: '#0a0a0a', fontFamily: 'Geist' }}>
        {photoUri && (
          // eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img>
          <img src={photoUri} width={width} height={height} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            display: 'flex',
            backgroundImage: photoUri
              ? 'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.15) 100%)'
              : 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 820,
            height,
            padding: '56px 64px',
          }}
        >
          {brand}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {subtitle && (
              <div
                style={{
                  display: 'flex',
                  marginBottom: 18,
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#34d399',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}
              >
                {subtitle}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                fontSize: titleFontSize(title),
                fontWeight: 900,
                lineHeight: 1.1,
                color: 'white',
                letterSpacing: -1,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#a3a3a3' }}>www.mssoft-gsm.com</div>
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: [
        { name: 'Geist', data: geistBold, weight: 700, style: 'normal' },
        { name: 'Geist', data: geistBlack, weight: 900, style: 'normal' },
      ],
    }
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
      // The URL carries the title and photo, so a changed page gets a new URL.
      'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
