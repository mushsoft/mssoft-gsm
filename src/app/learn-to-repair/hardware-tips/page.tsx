import GuideListing from '@/components/learn/GuideListing';
import type { Metadata } from 'next';
import { shareCardUrl, shareMetadata } from '@/lib/shareMetadata';

interface HardwareTipsPageProps {
  searchParams: Promise<{ topic?: string; q?: string; show?: string }>;
}

export const metadata: Metadata = shareMetadata({
  title: "Hardware Tips",
  description:
    "Free hardware tips for phones, laptops, tablets and earbuds: screens, batteries, charging, water damage, board repair and tools, step by step.",
  path: "/learn-to-repair/hardware-tips",
  image: shareCardUrl({
    title: "Hardware Tips",
    subtitle: "Screens, batteries, charging and board repair",
    photo: "/tips/hw-microscope-setup.jpg",
  }),
});

export default async function HardwareTipsPage({ searchParams }: HardwareTipsPageProps) {
  const { topic, q, show } = await searchParams;
  return <GuideListing category="HARDWARE" topic={topic} q={q} show={show} />;
}
