import sharp from 'sharp';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';

const WATERMARK_TEXT = 'mssoft-gsm.com';
const TILE_SIZE = 360;

// sharp's own SVG <text> rendering (librsvg) resolves fonts through the host
// OS's fontconfig, which Vercel's serverless runtime has none of — every
// glyph came out as a tofu box. satori is a pure-JS text layout/shaping
// engine (the same one next/og's ImageResponse uses) that takes an explicit
// font buffer, so it renders correctly with zero system font dependency.
const fontData = readFileSync(join(process.cwd(), 'src/assets/fonts/Roboto-Bold.woff'));

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
      const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: TILE_SIZE } });
      return Buffer.from(resvg.render().asPng());
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
  const tile = await getWatermarkTile();
  const base = sharp(input, { failOn: 'none' }).rotate();
  const metadata = await base.metadata();

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
