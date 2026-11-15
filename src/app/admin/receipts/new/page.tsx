import { requireAdminPage } from '@/lib/adminAuth';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument from '@/components/admin/ReceiptDocument';
import { defaultNotesByType, isDocType } from '@/lib/receiptDocTypes';

// ?type=JOB_CARD (or any document type key) opens the form on that type.
export default async function NewReceiptPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  await requireAdminPage();
  const { type } = await searchParams;

  const profile = await getShopProfile();
  const now = new Date();
  const reference = `WALKIN-${now.getTime().toString(36).toUpperCase()}`;

  return (
    <ReceiptDocument
      initial={{
        receiptId: null,
        orderId: null,
        docType: isDocType(type) ? type : 'INVOICE',
        reference,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        deliveryAddress: '',
        documentDate: now.toISOString().slice(0, 10),
        documentTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        items: [],
        discountAmount: 0,
        paymentStatus: 'PENDING',
        paymentMethod: 'Cash',
        paymentReference: '',
        notesByType: defaultNotesByType(),
        extra: {},
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
