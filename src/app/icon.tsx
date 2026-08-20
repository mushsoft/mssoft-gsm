import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Simplified version of SiteLogo's mark for favicon scale (32px) — the
// wrench accent badge is dropped since it's illegible at this size; ImageResponse
// (Satori) also can't render arbitrary lucide-react icons, so the phone shape
// is drawn directly.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f59e0b',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 13,
            height: 19,
            border: '2.5px solid black',
            borderRadius: 3,
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
