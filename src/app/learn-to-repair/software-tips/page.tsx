import GuideListing from '@/components/learn/GuideListing';
import type { Metadata } from 'next';
import { shareCardUrl, shareMetadata } from '@/lib/shareMetadata';

interface SoftwareTipsPageProps {
  searchParams: Promise<{ topic?: string; q?: string; show?: string }>;
}

export const metadata: Metadata = shareMetadata({
  title: "Software Tips",
  description:
    "Free step by step tips for iPhone, Android, Windows and Linux: settings, fixes, backups and security, plus flashing and unlocking tips for technicians.",
  path: "/learn-to-repair/software-tips",
  image: shareCardUrl({ title: "Software Tips", subtitle: "iPhone, Android, Windows and Linux", photo: "/tips/laptop-and-phone.jpg" }),
});

export default async function SoftwareTipsPage({ searchParams }: SoftwareTipsPageProps) {
  const { topic, q, show } = await searchParams;
  return <GuideListing category="SOFTWARE" topic={topic} q={q} show={show} />;
}
