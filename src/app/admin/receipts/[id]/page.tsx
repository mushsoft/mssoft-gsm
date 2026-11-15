import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument, { type ReceiptItemData } from '@/components/admin/ReceiptDocument';
import { extraFrom, isDocType, notesByTypeFrom } from '@/lib/receiptDocTypes';

export default async function EditReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const [receipt, profile] = await Promise.all([prisma.receipt.findUnique({ where: { id } }), getShopProfile()]);

  if (!receipt) {
    notFound();
  }

  const items = Array.isArray(receipt.items) ? (receipt.items as unknown as ReceiptItemData[]) : [];

  return (
    <ReceiptDocument
      initial={{
        receiptId: receipt.id,
        orderId: receipt.orderId,
        docType: isDocType(receipt.docType) ? receipt.docType : 'INVOICE',
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
        notesByType: notesByTypeFrom(receipt.notes),
        extra: extraFrom(receipt.extra),
      }}
      shopProfile={{
        businessName: profile.businessName,
        tagline: profile.tagline,
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
}
