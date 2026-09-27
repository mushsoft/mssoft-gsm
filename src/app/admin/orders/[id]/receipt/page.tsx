import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument from '@/components/admin/ReceiptDocument';

export default async function OrderReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const [order, shopProfile] = await Promise.all([
    prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: { select: { title: true } } } } },
    }),
    getShopProfile(),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <ReceiptDocument
      order={{
        id: order.id,
        txRef: order.txRef,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        totalAmount: order.totalAmount,
        discountAmount: order.discountAmount ?? 0,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        paymentReference: order.paymentReference,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          title: item.product?.title ?? 'Product removed',
          quantity: item.quantity,
          price: item.price,
        })),
      }}
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
