'use client';

import { Moon, Sun } from 'lucide-react';

export const THEME_STORAGE_KEY = 'theme';

// Kept in sync with the inline script in layout.tsx that runs before paint.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (stored === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch (e) {}
})();
`;

export default function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.classList.toggle('light', !next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist.
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-amber-500/40 hover:text-amber-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-amber-400"
    >
      {/* Icon reflects theme purely via the `dark:` CSS variant — no JS state,
          so there's no hydration mismatch against the inline init script. */}
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}
