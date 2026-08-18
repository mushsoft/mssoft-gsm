// Shared between the signup form (src/app/account/signup/page.tsx) and its
// API route so the "how did you hear about us" options can't drift apart.
export const REFERRAL_SOURCE_OPTIONS = [
  'Google Search',
  'Facebook',
  'Instagram',
  'TikTok',
  'WhatsApp',
  'Friend / Referral',
  'Walked into the shop',
  'Other',
] as const;
