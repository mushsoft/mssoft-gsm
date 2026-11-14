import GuideListing from '@/components/learn/GuideListing';

interface SoftwareTipsPageProps {
  searchParams: Promise<{ topic?: string; q?: string }>;
}

export const metadata = {
  title: 'Software Tips',
  description:
    'Free step by step tips for iPhone, Android, Windows and Linux: settings, fixes, backups and security, plus flashing and unlocking tips for technicians.',
  alternates: { canonical: '/learn-to-repair/software-tips' },
};

export default async function SoftwareTipsPage({ searchParams }: SoftwareTipsPageProps) {
  const { topic, q } = await searchParams;
  return <GuideListing category="SOFTWARE" topic={topic} q={q} />;
}
