import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDeviceDetail, MobileApiError } from '@/lib/mobileApi';

// MobileAPI.dev doesn't expose a single-value RAM field — a device usually
// ships in several RAM/storage combos (e.g. "128GB 4GB RAM, 128GB 8GB
// RAM..."), so picking one automatically would just be a guess. That full
// variant string goes into "extras" instead so the admin can read it and
// pick the exact one they're stocking, rather than silently forcing a
// possibly-wrong RAM value into the structured field.
export async function GET(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const idParam = new URL(req.url).searchParams.get('id');
  const id = idParam ? Number(idParam) : NaN;
  if (!Number.isInteger(id)) {
    return NextResponse.json({ success: false, error: 'A valid id query param is required' }, { status: 400 });
  }

  try {
    const detail = await getDeviceDetail(id);

    const specs: Record<string, string> = {};
    if (detail.platform?.chipset) specs.chipset = detail.platform.chipset;
    else if (detail.hardware) specs.chipset = detail.hardware;

    if (detail.storage) specs.storage = detail.storage;
    if (detail.camera) specs.camera = detail.camera;
    if (detail.battery_capacity) specs.battery = detail.battery_capacity;
    if (detail.network?.technology) specs.network = detail.network.technology;

    const screenMatch = detail.screen_resolution?.match(/^(\d+(?:\.\d+)?)"/);
    if (screenMatch) specs.screenSize = `${screenMatch[1]}"`;

    const extras: { key: string; value: string }[] = [];
    if (detail.memory?.internal) extras.push({ key: 'memoryVariants', value: detail.memory.internal });
    if (detail.display?.type) extras.push({ key: 'displayType', value: detail.display.type });
    if (detail.platform?.cpu) extras.push({ key: 'cpu', value: detail.platform.cpu });
    if (detail.platform?.gpu) extras.push({ key: 'gpu', value: detail.platform.gpu });
    if (detail.battery?.charging) extras.push({ key: 'chargingSpeed', value: detail.battery.charging });
    if (detail.main_camera?.modules) extras.push({ key: 'cameraDetail', value: detail.main_camera.modules });
    if (detail.selfie_camera?.modules) extras.push({ key: 'selfieCamera', value: detail.selfie_camera.modules });
    if (detail.colors) extras.push({ key: 'colors', value: detail.colors });
    if (detail.weight) extras.push({ key: 'weight', value: detail.weight });
    if (detail.thickness) extras.push({ key: 'thickness', value: detail.thickness });
    if (detail.release_date) extras.push({ key: 'released', value: detail.release_date });
    if (detail.misc?.model_numbers) extras.push({ key: 'modelNumbers', value: detail.misc.model_numbers });

    return NextResponse.json({
      success: true,
      modelName: detail.name,
      brand: detail.manufacturer_name,
      description: detail.description?.slice(0, 2000) || null,
      specs,
      extras,
    });
  } catch (error) {
    if (error instanceof MobileApiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status === 429 ? 429 : 502 });
    }
    console.error('Phone spec lookup failed', { id, error });
    return NextResponse.json({ success: false, error: 'Unable to fetch specifications right now' }, { status: 500 });
  }
}
