import GuideListing from '@/components/learn/GuideListing';
import type { Metadata } from 'next';
import { shareCardUrl, shareMetadata } from '@/lib/shareMetadata';

interface LearnToRepairPageProps {
  searchParams: Promise<{ brand?: string; q?: string }>;
}

export const metadata: Metadata = shareMetadata({
  title: "Learn to Repair",
  description:
    "Free step-by-step phone repair guides and video tutorials: screen replacement, charging port fixes, battery swaps, and more.",
  path: "/learn-to-repair",
  image: shareCardUrl({ title: "Learn to Repair", subtitle: "Free step by step repair guides", photo: "/tips/android-touch-problems.jpg" }),
});

export default async function LearnToRepairPage({ searchParams }: LearnToRepairPageProps) {
  const { brand, q } = await searchParams;
  return <GuideListing category="REPAIR" brand={brand} q={q} />;
}
