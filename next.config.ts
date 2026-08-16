import type { NextConfig } from "next";

// A static (non-nonce) CSP — this app's inline theme-init script and Next's
// own RSC-hydration scripts need 'unsafe-inline' for script-src, since a
// nonce-based policy requires per-request middleware that would force every
// page into dynamic rendering (losing static generation on the homepage,
// category pages, etc. — a real cost this pass isn't trading away for a
// belt-and-suspenders XSS mitigation). The other directives below don't
// have that trade-off and carry real weight on their own: frame-ancestors
// blocks clickjacking entirely, object-src/base-uri close two classic
// injection vectors, and form-action stops a compromised page from
// exfiltrating via form submission to another origin.
// React dev mode calls eval() for its debugging tools (reconstructing call
// stacks across environments) — never in production, per React's own
// warning text, so 'unsafe-eval' is scoped to dev only rather than
// weakening the production policy for something prod never needs.
const isDev = process.env.NODE_ENV !== "production";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io https://*.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://*.sanity.io wss://*.sanity.io",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Sanity Studio is a large third-party admin bundle with its own dynamic
// eval / worker / websocket needs that the CSP above would break — it's
// neither customer- nor payment-facing, so it's excluded rather than
// weakening the policy for the rest of the site.
const studioSafeHeaders = securityHeaders.filter(
  (h) => h.key !== "Content-Security-Policy" && h.key !== "X-Frame-Options"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: studioSafeHeaders,
      },
      {
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
