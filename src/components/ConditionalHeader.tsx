'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) {
    return null;
  }

  return <Header />;
}
