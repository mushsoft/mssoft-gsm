'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, CircuitBoard, ClipboardList, GraduationCap, LayoutDashboard, Package, Percent, Users, Wrench } from 'lucide-react';

const TABS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Percent },
  { href: '/admin/repair-guides', label: 'Repair Guides', icon: GraduationCap },
  { href: '/admin/repair-requests', label: 'Ask a Tech', icon: Wrench },
  { href: '/admin/testpoints', label: 'Test Points', icon: CircuitBoard },
  { href: '/admin/analytics', label: 'Analytics', icon: Activity },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === href : pathname?.startsWith(href);
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
