import { requireAdminApi } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

// The payment screenshot for one top-up, for admins only.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { id } = await params;
  const proof = await prisma.paymentProof.findUnique({ where: { walletTransactionId: id } });
  if (!proof) return new Response('Not found', { status: 404 });

  return new Response(Buffer.from(proof.data), {
    headers: {
      'Content-Type': proof.mimeType,
      'Content-Length': String(proof.sizeBytes),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
    },
  });
}
