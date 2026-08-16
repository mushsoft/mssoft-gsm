import { UserCircle } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import AccountLogoutButton from '@/components/account/AccountLogoutButton';
import AccountNav from '@/components/account/AccountNav';

export default async function AccountPage() {
  const customer = await requireCustomerPage();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <UserCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">
              {customer.name ? `Welcome, ${customer.name}` : 'My Account'}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{customer.email}</p>
          </div>
        </div>
        <AccountLogoutButton />
      </div>

      <AccountNav />

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 text-sm text-neutral-600 dark:text-neutral-300">
        <p>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">Name:</span> {customer.name ?? '—'}
        </p>
        <p className="mt-1">
          <span className="font-bold text-neutral-800 dark:text-neutral-200">Email:</span> {customer.email}
        </p>
        <p className="mt-1">
          <span className="font-bold text-neutral-800 dark:text-neutral-200">Member since:</span>{' '}
          {customer.createdAt.toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
