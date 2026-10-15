import sharp from 'sharp';

const WATERMARK_TEXT = 'mssoft-gsm.com';

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
  const base = sharp(input, { failOn: 'none' }).rotate();
  const metadata = await base.metadata();
  const width = metadata.width ?? 800;
  const height = metadata.height ?? 800;

  const tileSize = Math.max(120, Math.round(Math.min(width, height) / 5));
  const fontSize = Math.max(14, Math.round(tileSize / 6));

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wm" width="${tileSize}" height="${tileSize}" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <text x="0" y="${Math.round(tileSize / 2)}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#101010" fill-opacity="0.22">${WATERMARK_TEXT}</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wm)" />
    </svg>
  `;

  const composited = sharp(input, { failOn: 'none' })
    .rotate()
    .composite([{ input: Buffer.from(svg), blend: 'over' }]);

  if (metadata.format === 'png') {
    return { buffer: await composited.png().toBuffer(), contentType: 'image/png', extension: 'png' };
  }
  if (metadata.format === 'webp') {
    return { buffer: await composited.webp({ quality: 90 }).toBuffer(), contentType: 'image/webp', extension: 'webp' };
  }
  return { buffer: await composited.jpeg({ quality: 90 }).toBuffer(), contentType: 'image/jpeg', extension: 'jpg' };
}
