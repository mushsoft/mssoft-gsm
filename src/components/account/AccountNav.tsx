'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Heart, UserCircle } from 'lucide-react';

const TABS = [
  { href: '/account', label: 'Profile', icon: UserCircle },
  { href: '/account/orders', label: 'Orders', icon: ClipboardList },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = href === '/account' ? pathname === href : pathname?.startsWith(href);
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
          </Link>
        );
      })}
    </nav>
  );
}
