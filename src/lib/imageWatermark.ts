import sharp from 'sharp';
import satori from 'satori';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';

const WATERMARK_TEXT = 'mssoft-gsm.com';
const TILE_SIZE = 360;

// sharp's own SVG <text> rendering (librsvg) resolves fonts through the host
// OS's fontconfig, which Vercel's serverless runtime has none of — every
// glyph came out as a tofu box. satori is a pure-JS text layout/shaping
// engine (the same one next/og's ImageResponse uses) that takes an explicit
// font buffer and bakes each glyph directly into <path> geometry — by the
// time the SVG comes back there's no text left for a renderer to resolve a
// font for, so sharp can rasterize it like any other vector graphic.
const fontData = readFileSync(join(process.cwd(), 'src/assets/fonts/Roboto-Bold.ttf'));

let tileCache: Promise<Buffer> | null = null;

async function getWatermarkTile(): Promise<Buffer> {
  if (!tileCache) {
    tileCache = (async () => {
      const element = createElement(
        'div',
        {
          style: {
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              fontSize: 30,
              fontWeight: 700,
              fontFamily: 'Roboto',
              color: 'rgba(16,16,16,0.22)',
              whiteSpace: 'nowrap',
              transform: 'rotate(-30deg)',
            },
          },
          WATERMARK_TEXT
        )
      );

      const svg = await satori(
        element,
        {
          width: TILE_SIZE,
          height: TILE_SIZE,
          fonts: [{ name: 'Roboto', data: fontData, weight: 700, style: 'normal' }],
        }
      );
      return sharp(Buffer.from(svg)).png().toBuffer();
    })();
  }
  return tileCache;
}

export interface WatermarkedImage {
  buffer: Buffer;
  contentType: string;
  extension: string;
}

// Stamps every uploaded image (product photos, testpoint diagrams, repair
// guide thumbnails) with a repeated, semi-transparent diagonal watermark so
// it stays attributable if copied elsewhere. Re-encodes to whatever format
// sharp actually detected (not the client-supplied MIME type, which isn't
// always trustworthy) — jpeg/webp/gif all collapse to jpeg output since gif
// animation can't survive a static composite anyway.
export async function applyWatermark(input: Buffer): Promise<WatermarkedImage> {
  const masterTile = await getWatermarkTile();
  const base = sharp(input, { failOn: 'none' }).rotate();
  const metadata = await base.metadata();

  // sharp's tile:true composite refuses an overlay larger than the base
  // image — several catalog photos (small GSMArena-style icon crops) are
  // under 360px on a side, so the tile has to shrink to fit rather than
  // use one fixed size for every image.
  const width = metadata.width ?? TILE_SIZE;
  const height = metadata.height ?? TILE_SIZE;
  const effectiveTileSize = Math.max(40, Math.min(TILE_SIZE, width, height));
  const tile =
    effectiveTileSize === TILE_SIZE
      ? masterTile
      : await sharp(masterTile).resize(effectiveTileSize, effectiveTileSize).png().toBuffer();

  const composited = sharp(input, { failOn: 'none' })
    .rotate()
    .composite([{ input: tile, tile: true, blend: 'over' }]);

  if (metadata.format === 'png') {
    return { buffer: await composited.png().toBuffer(), contentType: 'image/png', extension: 'png' };
  }
  if (metadata.format === 'webp') {
    return { buffer: await composited.webp({ quality: 90 }).toBuffer(), contentType: 'image/webp', extension: 'webp' };
  }
  return { buffer: await composited.jpeg({ quality: 90 }).toBuffer(), contentType: 'image/jpeg', extension: 'jpg' };
}
