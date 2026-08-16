'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AccountLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/account/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-600 transition-colors hover:border-red-500/40 hover:text-red-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sign Out
    </button>
  );
}
