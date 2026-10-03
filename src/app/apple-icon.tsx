import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Separate from icon.tsx (32px browser-tab favicon, kept as a simplified
// shape — the real mark's gradient linework turns to mush that small). At
// 180px, used for iOS/Android home-screen icons, the real logo holds up fine.
const logoDataUri = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/logo-mark.png')).toString('base64')}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) only accepts a raw <img>, not next/image */}
        <img src={logoDataUri} width={148} height={148} alt="" />
      </div>
    ),
    { ...size }
  );
}
