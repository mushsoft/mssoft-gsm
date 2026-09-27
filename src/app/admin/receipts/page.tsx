import { requireAdminPage } from '@/lib/adminAuth';
import { getShopProfile } from '@/lib/shopProfile';
import ReceiptDocument from '@/components/admin/ReceiptDocument';

// Ad-hoc invoice/receipt/delivery-note/quotation — not tied to a website
// order (e.g. a walk-in sale). Nothing here is persisted; it exists only to
// be filled in and printed. Per-order receipts (pre-filled from a real
// order) live at /admin/orders/[id]/receipt instead.
export default async function AdminReceiptsPage() {
  await requireAdminPage();

  const profile = await getShopProfile();

  return (
    <ReceiptDocument
      order={null}
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
