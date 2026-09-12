import { ImageResponse } from 'next/og';

export const alt = 'MS Soft GSM | Phones, Spare Parts & Technician Support Uganda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
              position: 'relative',
              display: 'flex',
              width: 160,
              height: 160,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 36,
              background: '#f59e0b',
              boxShadow: '0 20px 60px rgba(245, 158, 11, 0.35)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 88,
                border: '9px solid black',
                borderRadius: 12,
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                right: -10,
                display: 'flex',
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                background: '#0a0a0a',
                border: '4px solid white',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  border: '5px solid #f59e0b',
                  display: 'flex',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 92, fontWeight: 900, letterSpacing: -2, color: 'white' }}>
              Phone<span style={{ color: '#f59e0b' }}>Hub</span>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 6,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#a3a3a3',
              }}
            >
              MS Soft GSM
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
