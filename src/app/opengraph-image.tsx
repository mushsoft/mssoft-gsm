import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const alt = 'MS Soft GSM | Phones, Spare Parts & Technician Support Uganda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoDataUri = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/logo-mark.png')).toString('base64')}`;

// Default social-share preview for every route that doesn't set its own
// openGraph.images (e.g. product pages use the product photo instead — see
// shop/product/[slug]/page.tsx). Without this, crawlers that can't find an
// og:image tag fall back to whatever image they can scrape (the Next.js
// scaffold favicon), which is what was showing up in shared links.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div
            style={{
              display: 'flex',
              width: 220,
              height: 220,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 36,
              background: 'white',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img>, not next/image */}
            <img src={logoDataUri} width={176} height={176} alt="" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, letterSpacing: -2, color: 'white' }}>
              MS Soft <span style={{ color: '#f59e0b' }}>GSM</span>
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 26, fontWeight: 600, color: '#d4d4d4' }}>
              Phones &middot; Spare Parts &middot; Technician Support
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
