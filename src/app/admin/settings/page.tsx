import { Settings as SettingsIcon } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { getShopProfile } from '@/lib/shopProfile';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import ShopProfileForm from '@/components/admin/ShopProfileForm';

export default async function AdminSettingsPage() {
  await requireAdminPage();

  const profile = await getShopProfile();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <SettingsIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Settings</h1>
            <p className="text-xs text-neutral-500">Shop details shown on invoices, receipts, and delivery notes</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <ShopProfileForm
          initialValues={{
            businessName: profile.businessName,
            tagline: profile.tagline ?? '',
            phone: profile.phone ?? '',
            whatsapp: profile.whatsapp ?? '',
            email: profile.email ?? '',
            website: profile.website ?? '',
            tiktok: profile.tiktok ?? '',
            instagram: profile.instagram ?? '',
            facebook: profile.facebook ?? '',
            address: profile.address ?? '',
            tinNumber: profile.tinNumber ?? '',
          }}
        />
      </div>
    </main>
  );
}
