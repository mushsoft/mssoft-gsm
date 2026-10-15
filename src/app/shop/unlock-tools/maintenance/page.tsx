import Link from 'next/link';
import { ArrowLeft, Clock, PhoneCall } from 'lucide-react';

export const metadata = {
  title: 'Ordering Temporarily Unavailable',
};

export default function UnlockToolsMaintenancePage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-16 min-h-[75vh] flex items-center justify-center">
      <div className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
          <Clock className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-black text-neutral-900 dark:text-white">
          Ordering Is Under Maintenance
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Unlock &amp; Flash Tool ordering is paused for about 24 hours while we update things. Please
          check back soon &mdash; the tool list is still here to browse in the meantime.
        </p>
        <p className="text-xs text-neutral-400">
          Need something urgently?{' '}
          <a href="tel:+256755754880" className="inline-flex items-center gap-1 font-bold text-amber-500 hover:underline">
            <PhoneCall className="h-3 w-3" />
            Call +256 755 754 880
          </a>
        </p>
        <Link
          href="/shop/unlock-tools"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Unlock &amp; Flash Tools</span>
        </Link>
      </div>
    </main>
  );
}
