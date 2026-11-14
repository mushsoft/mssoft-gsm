'use client';

import { useEffect } from 'react';

// Rendered on the Messages page: whenever it shows unread messages (on open,
// or when AutoRefresh brings in a new one), mark them read and tell the
// account menu badge to update straight away.
export default function MarkMessagesRead({ unread }: { unread: number }) {
  useEffect(() => {
    if (unread === 0) return;
    fetch('/api/account/notifications', { method: 'POST' })
      .then(() => window.dispatchEvent(new Event('notifications:read')))
      .catch(() => {});
  }, [unread]);

  return null;
}
