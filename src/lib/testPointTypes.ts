// Matches the ?sub= slugs Header.tsx's TESTPOINTS dropdown already emits
// (qualcomm, mediatek, samsung-isp, iphone-tp) — see TESTPOINT_SLUG_MAP below.
export const TESTPOINT_TYPES = [
  { value: 'EDL', label: 'Qualcomm EDL' },
  { value: 'BROM', label: 'MediaTek BROM' },
  { value: 'ISP', label: 'Hardware ISP' },
  { value: 'SCHEMATIC', label: 'Board Schematic' },
] as const;

export type TestPointType = (typeof TESTPOINT_TYPES)[number]['value'];

export const TESTPOINT_SLUG_MAP: Record<string, TestPointType> = {
  qualcomm: 'EDL',
  mediatek: 'BROM',
  'samsung-isp': 'ISP',
  'iphone-tp': 'SCHEMATIC',
};
