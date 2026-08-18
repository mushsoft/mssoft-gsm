import { NextResponse } from 'next/server';
import { requireCustomerApi } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { REPAIR_REQUEST_IMAGES_BUCKET, getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseAdmin';
import { sendRepairRequestNotification } from '@/lib/email/repairRequestEmails';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PROBLEM_LENGTH = 2000;

export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Please sign in to ask a technician' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`repair-request:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many requests. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ success: false, error: 'Malformed request body' }, { status: 400 });
  }

  const problem = String(formData.get('problem') ?? '').trim();
  const brand = String(formData.get('brand') ?? '').trim() || null;
  const modelName = String(formData.get('modelName') ?? '').trim() || null;
  const file = formData.get('file');

  if (!problem) {
    return NextResponse.json({ success: false, error: 'Please describe the problem' }, { status: 400 });
  }
  if (problem.length > MAX_PROBLEM_LENGTH) {
    return NextResponse.json({ success: false, error: `Description must be under ${MAX_PROBLEM_LENGTH} characters` }, { status: 400 });
  }

  let imageUrl: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: false, error: 'Photo upload is not configured' }, { status: 500 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Image must be under 5MB' }, { status: 400 });
    }

    const extension = file.name.includes('.') ? file.name.split('.').pop() : file.type.split('/')[1];
    const storagePath = `${customer.id}/${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabaseAdmin = getSupabaseAdmin();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(REPAIR_REQUEST_IMAGES_BUCKET)
      .upload(storagePath, buffer, { contentType: file.type });

    if (uploadError) {
      console.error('Repair request photo upload failed', uploadError);
      return NextResponse.json({ success: false, error: 'Photo upload failed. Please try again.' }, { status: 502 });
    }

    imageUrl = supabaseAdmin.storage.from(REPAIR_REQUEST_IMAGES_BUCKET).getPublicUrl(storagePath).data.publicUrl;
  }

  const request = await prisma.repairRequest.create({
    data: { customerId: customer.id, brand, modelName, problem, imageUrl },
  });

  await sendRepairRequestNotification({
    requestId: request.id,
    customerName: customer.name || customer.email,
    customerPhone: customer.phone || 'No phone on file',
    brand,
    modelName,
    problem,
    imageUrl,
  }).catch((error) => console.error('Failed to send repair request notification (request already created)', { requestId: request.id, error }));

  return NextResponse.json({ success: true, requestId: request.id });
}
