import { requireAdminPage } from '@/lib/adminAuth';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument, { DOC_TYPES, type DocType } from '@/components/admin/ReceiptDocument';

export default async function NewReceiptPage() {
  await requireAdminPage();

  const profile = await getShopProfile();
  const now = new Date();
  const reference = `WALKIN-${now.getTime().toString(36).toUpperCase()}`;

  return (
    <ReceiptDocument
      initial={{
        receiptId: null,
        orderId: null,
        docType: 'INVOICE',
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
        notesByType: Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.defaultNotes])) as Record<DocType, string>,
      }}
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
}
