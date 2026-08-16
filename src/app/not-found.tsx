import Link from 'next/link';
import { MessageCircle, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
        <SearchX className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-lg font-black text-neutral-900 dark:text-white">Page not found</h1>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          Back to Home
        </Link>
        <a
          href="https://wa.me/256755754880?text=Hello%20Phone%20Hub%2C%20I%20was%20looking%20for%20something%20on%20your%20site%20but%20hit%20a%20broken%20link."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold text-neutral-600 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Ask on WhatsApp
        </a>
      </div>
    </main>
  );
}
