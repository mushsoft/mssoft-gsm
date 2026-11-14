'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ClipboardList, Heart, KeyRound, UserCircle, Wallet, Wrench } from 'lucide-react';

const TABS = [
  { href: '/account', label: 'Profile', icon: UserCircle },
  { href: '/account/messages', label: 'Messages', icon: Bell },
  { href: '/account/wallet', label: 'Wallet', icon: Wallet },
  { href: '/account/tool-orders', label: 'Tool Orders', icon: KeyRound },
  { href: '/account/orders', label: 'Orders', icon: ClipboardList },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/account/repair-requests', label: 'Ask a Tech', icon: Wrench },
];

// How often the unread badge checks for new messages.
const UNREAD_POLL_MS = 10_000;

export default function AccountNav() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch('/api/account/notifications', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled && typeof data.unread === 'number') setUnread(data.unread);
      } catch {
        // Offline / transient — keep the last known count.
      }
    }
    check();
    const id = setInterval(check, UNREAD_POLL_MS);
    function onVisible() {
      if (document.visibilityState === 'visible') check();
    }
    document.addEventListener('visibilitychange', onVisible);
    // Fired by the Messages page once it has marked messages read.
    window.addEventListener('notifications:read', check);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('notifications:read', check);
    };
  }, []);

  return (
    <nav className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = href === '/account' ? pathname === href : pathname?.startsWith(href);
        const badge = href === '/account/messages' && unread > 0 ? unread : 0;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              active
                ? 'bg-amber-500/10 text-amber-500'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            {badge > 0 && (
              <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-black leading-4 text-white" aria-label={`${badge} unread`}>
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
