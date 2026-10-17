'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Goes back in browser history (so the list page is restored at the exact
// scroll position / tab / sub-tab the admin left it at) instead of a fresh
// Link navigation to `href`, which would always land back at the top of the
// list. `href` is only used as a fallback for the rare case this page was
// opened directly (no history to go back to, e.g. a bookmarked/shared link).
export default function AdminBackLink({
  href,
  label,
  accent = 'amber',
}: {
  href: string;
  label: string;
  accent?: 'amber' | 'emerald';
}) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(href);
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors ${
        accent === 'emerald' ? 'hover:text-emerald-500' : 'hover:text-amber-500'
      }`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
