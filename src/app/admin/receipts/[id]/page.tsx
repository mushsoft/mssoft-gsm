import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument from '@/components/admin/ReceiptDocument';
import { DOC_TYPES, type DocType } from '@/lib/receiptDocTypes';

export default async function EditReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const [receipt, profile] = await Promise.all([prisma.receipt.findUnique({ where: { id } }), getShopProfile()]);

  if (!receipt) {
    notFound();
  }

  // TEMPORARY diagnostic — production hides real error messages behind an
  // opaque digest, so this surfaces exactly what throws instead of guessing.
  // Remove once the real cause is found.
  try {
    const items = Array.isArray(receipt.items)
      ? (receipt.items as unknown as { title: string; quantity: number; price: number }[])
      : [];
    const storedNotes =
      typeof receipt.notes === 'object' && receipt.notes !== null && !Array.isArray(receipt.notes)
        ? (receipt.notes as Record<string, string>)
        : {};
    const notesByType = Object.fromEntries(
      DOC_TYPES.map((d) => [d.key, storedNotes[d.key] ?? d.defaultNotes])
    ) as Record<DocType, string>;

    const initial = {
      receiptId: receipt.id,
      orderId: receipt.orderId,
      docType: (receipt.docType as DocType) ?? 'INVOICE',
      reference: receipt.reference,
      customerName: receipt.customerName,
      customerPhone: receipt.customerPhone,
      customerEmail: receipt.customerEmail,
      deliveryAddress: receipt.deliveryAddress ?? '',
      documentDate: receipt.documentDate.toISOString().slice(0, 10),
      documentTime: `${String(receipt.documentDate.getHours()).padStart(2, '0')}:${String(receipt.documentDate.getMinutes()).padStart(2, '0')}`,
      items,
      discountAmount: receipt.discountAmount,
      paymentStatus: receipt.paymentStatus,
      paymentMethod: receipt.paymentMethod,
      paymentReference: receipt.paymentReference ?? '',
      notesByType,
    };

    return (
      <ReceiptDocument
        initial={initial}
        shopProfile={{
          businessName: profile.businessName,
          phone: profile.phone,
          whatsapp: profile.whatsapp,
          email: profile.email,
          website: profile.website,
          tiktok: profile.tiktok,
          instagram: profile.instagram,
          facebook: profile.facebook,
          address: profile.address,
          tinNumber: profile.tinNumber,
        }}
      />
    );
  } catch (error) {
    return (
      <pre style={{ whiteSpace: 'pre-wrap', color: 'red', padding: 20 }}>
        DIAGNOSTIC ERROR: {error instanceof Error ? `${error.name}: ${error.message}\n${error.stack}` : String(error)}
      </pre>
    );
  }
}
