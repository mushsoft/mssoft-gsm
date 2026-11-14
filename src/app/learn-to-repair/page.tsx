import GuideListing from '@/components/learn/GuideListing';

interface LearnToRepairPageProps {
  searchParams: Promise<{ brand?: string; q?: string }>;
}

export const metadata = {
  title: 'Learn to Repair',
  description:
    'Free step-by-step phone repair guides and video tutorials: screen replacement, charging port fixes, battery swaps, and more.',
};

export default async function LearnToRepairPage({ searchParams }: LearnToRepairPageProps) {
  const { brand, q } = await searchParams;
  return <GuideListing category="REPAIR" brand={brand} q={q} />;
}
