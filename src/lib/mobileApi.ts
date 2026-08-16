import 'server-only';

// Thin server-side client for MobileAPI.dev, used by the admin "Auto-Fill
// from Web" action on the Phone product form. Deliberately not shared with
// prisma/import-phones.ts (a standalone bulk-import script with its own
// image-upload/throttling concerns) — this is a single on-demand lookup per
// admin action, a different enough shape that sharing code would add
// coupling for little benefit.
//
// Note: /devices/by-manufacturer/ always returns 10 devices per page (the
// `page_size` param is accepted but ignored) and manufacturers can have
// 1000+ devices sorted alphabetically — paging through that to find one
// model would blow the free tier's 200/month quota in a single click. Use
// /devices/search/?name=X&manufacturer=Y instead, which does real fuzzy
// matching server-side and costs one request.

const MOBILEAPI_BASE = 'https://api.mobileapi.dev';

export interface DeviceSearchResult {
  id: number;
  name: string;
  manufacturer_name: string;
  match_type?: string;
}

interface DeviceSubobjects {
  network?: { technology?: string; bands_5g?: string };
  display?: { type?: string; size?: string };
  platform?: { chipset?: string; cpu?: string; gpu?: string };
  memory?: { internal?: string };
  main_camera?: { modules?: string };
  selfie_camera?: { modules?: string };
  battery?: { charging?: string };
  misc?: { model_numbers?: string };
}

export interface DeviceDetail extends DeviceSubobjects {
  id: number;
  name: string;
  manufacturer_name: string;
  description?: string;
  colors?: string;
  storage?: string;
  screen_resolution?: string;
  weight?: string;
  thickness?: string;
  release_date?: string;
  camera?: string;
  battery_capacity?: string;
  hardware?: string;
}

export class MobileApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export function isMobileApiConfigured(): boolean {
  return Boolean(process.env.MOBILEAPI_DEV_KEY);
}

async function mobileApiRequest<T>(path: string, params: Record<string, string>): Promise<T> {
  const apiKey = process.env.MOBILEAPI_DEV_KEY;
  if (!apiKey) {
    throw new MobileApiError('MOBILEAPI_DEV_KEY is not configured', 500);
  }

  const url = new URL(MOBILEAPI_BASE + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url, { headers: { Authorization: `Token ${apiKey}` } });

  if (response.status === 429) {
    throw new MobileApiError('MobileAPI.dev rate limit reached — wait a minute and try again', 429);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new MobileApiError(`MobileAPI.dev request failed (${response.status}): ${body.slice(0, 200)}`, response.status);
  }

  return response.json() as Promise<T>;
}

export async function searchDevicesByName(name: string, manufacturer: string, limit = 10): Promise<DeviceSearchResult[]> {
  const result = await mobileApiRequest<{ devices?: DeviceSearchResult[] }>('/devices/search/', {
    name,
    manufacturer,
    limit: String(limit),
  });
  return result.devices ?? [];
}

export async function getDeviceDetail(id: number): Promise<DeviceDetail> {
  return mobileApiRequest<DeviceDetail>(`/devices/${id}/`, {});
}
