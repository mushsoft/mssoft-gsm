import GuideListing from '@/components/learn/GuideListing';

interface SoftwareTipsPageProps {
  searchParams: Promise<{ brand?: string; q?: string }>;
}

export const metadata = {
  title: 'Software Tips',
  description:
    'Free phone software tips for technicians: flashing, FRP removal, unlocking and firmware, step by step with the tools to use.',
  alternates: { canonical: '/learn-to-repair/software-tips' },
};

export default async function SoftwareTipsPage({ searchParams }: SoftwareTipsPageProps) {
  const { brand, q } = await searchParams;
  return <GuideListing category="SOFTWARE" brand={brand} q={q} />;
}
