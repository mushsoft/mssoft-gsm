import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument, { DOC_TYPES, type DocType } from '@/components/admin/ReceiptDocument';

export default async function OrderReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const [order, existingReceipt, shopProfile] = await Promise.all([
    prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: { select: { title: true } } } } },
    }),
    // If a receipt was already saved for this order, reopen that saved (and
    // possibly edited) version instead of rebuilding a fresh one from the
    // order every time — otherwise a saved edit would be invisible the next
    // time this page is opened.
    prisma.receipt.findFirst({ where: { orderId: id }, orderBy: { createdAt: 'desc' } }),
    getShopProfile(),
  ]);

  if (!order) {
    notFound();
  }

  const initial = existingReceipt
    ? {
        receiptId: existingReceipt.id,
        orderId: existingReceipt.orderId,
        docType: (existingReceipt.docType as DocType) ?? 'INVOICE',
        reference: existingReceipt.reference,
        customerName: existingReceipt.customerName,
        customerPhone: existingReceipt.customerPhone,
        customerEmail: existingReceipt.customerEmail,
        deliveryAddress: existingReceipt.deliveryAddress ?? '',
        documentDate: existingReceipt.documentDate.toISOString().slice(0, 10),
        documentTime: `${String(existingReceipt.documentDate.getHours()).padStart(2, '0')}:${String(existingReceipt.documentDate.getMinutes()).padStart(2, '0')}`,
        items: Array.isArray(existingReceipt.items)
          ? (existingReceipt.items as unknown as { title: string; quantity: number; price: number }[])
          : [],
        discountAmount: existingReceipt.discountAmount,
        paymentStatus: existingReceipt.paymentStatus,
        paymentMethod: existingReceipt.paymentMethod,
        paymentReference: existingReceipt.paymentReference ?? '',
        notesByType: (() => {
          const stored =
            typeof existingReceipt.notes === 'object' && existingReceipt.notes !== null && !Array.isArray(existingReceipt.notes)
              ? (existingReceipt.notes as Record<string, string>)
              : {};
          return Object.fromEntries(DOC_TYPES.map((d) => [d.key, stored[d.key] ?? d.defaultNotes])) as Record<DocType, string>;
        })(),
      }
    : {
        receiptId: null,
        orderId: order.id,
        docType: 'INVOICE' as DocType,
        reference: order.txRef,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        deliveryAddress: '',
        documentDate: order.createdAt.toISOString().slice(0, 10),
        documentTime: `${String(order.createdAt.getHours()).padStart(2, '0')}:${String(order.createdAt.getMinutes()).padStart(2, '0')}`,
        items: order.items.map((item) => ({
          title: item.product?.title ?? 'Product removed',
          quantity: item.quantity,
          price: item.price,
        })),
        discountAmount: order.discountAmount ?? 0,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        paymentReference: order.paymentReference ?? '',
        notesByType: Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.defaultNotes])) as Record<DocType, string>,
      };

  return (
    <ReceiptDocument
      initial={initial}
      shopProfile={{
        businessName: shopProfile.businessName,
        phone: shopProfile.phone,
        whatsapp: shopProfile.whatsapp,
        email: shopProfile.email,
        website: shopProfile.website,
        tiktok: shopProfile.tiktok,
        instagram: shopProfile.instagram,
        facebook: shopProfile.facebook,
        address: shopProfile.address,
        tinNumber: shopProfile.tinNumber,
      }}
    />
  );
}
