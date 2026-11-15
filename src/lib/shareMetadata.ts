// Link previews (WhatsApp, Facebook, X, Telegram...) for every public page.
//
// Next.js replaces a parent's whole `openGraph` object as soon as a page sets
// its own (shallow merge), so a page that only sets `title` shares the site's
// generic title and logo. shareMetadata() builds the complete set for a page:
// its own title, description, URL and image.
//
// Pages without a real photo of their own (About, Contact, tips...) use a
// branded card from /api/og: the page title on top of a fitting photo.

import type { Metadata } from 'next';

export const SITE_NAME = 'MS Soft GSM';
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

// Photos the card generator may fetch: our own public photo folders, product
// images in our Supabase bucket or on Sanity's CDN, and YouTube video
// thumbnails. Anything else is ignored, so the endpoint can't be used to
// fetch arbitrary URLs.
const LOCAL_PHOTO = /^\/(tips|og)\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/;
const IMAGE_HOSTS = new Set(['img.youtube.com', 'i.ytimg.com', 'cdn.sanity.io']);

export function isAllowedSharePhoto(photo: string, supabaseHost?: string | null): boolean {
  if (LOCAL_PHOTO.test(photo)) return true;
  let url: URL;
  try {
    url = new URL(photo);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:') return false;
  if (IMAGE_HOSTS.has(url.hostname)) return true;
  return !!supabaseHost && url.hostname === supabaseHost && url.pathname.startsWith('/storage/v1/object/public/');
}

export function supabaseHostname(): string | null {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : null;
  } catch {
    return null;
  }
}

// Root-relative URL of a branded share card. Relative is fine: metadataBase
// (set in the root layout) turns it into an absolute URL in the page head.
export function shareCardUrl({ title, subtitle, photo }: { title: string; subtitle?: string; photo?: string | null }): string {
  const params = new URLSearchParams({ title: title.slice(0, 120) });
  if (subtitle) params.set('subtitle', subtitle.slice(0, 90));
  if (photo) params.set('photo', photo);
  return `/api/og?${params.toString()}`;
}

// YouTube embed/watch/short links → the video's large thumbnail.
export function youtubeThumbnail(videoUrl: string | null | undefined): string | null {
  if (!videoUrl) return null;
  const match = videoUrl.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

// Plain-text summary for previews: collapses whitespace and cuts at a word.
export function shareDescription(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

// Page <title>: normally "Title | MS Soft GSM" (the root layout's template),
// but Google cuts titles at about 60 characters, so long ones drop the
// suffix and keep the words that matter.
const MAX_TITLE_WITH_SUFFIX = 62;
export function pageTitle(title: string): Metadata['title'] {
  return `${title} | ${SITE_NAME}`.length > MAX_TITLE_WITH_SUFFIX ? { absolute: title } : title;
}

export function shareMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageSize = SHARE_IMAGE_SIZE,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
  imageSize?: { width: number; height: number } | null;
}): Metadata {
  const shareTitle = `${title} | ${SITE_NAME}`;
  return {
    title: pageTitle(title),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_UG',
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [{ url: image, alt: imageAlt ?? title, ...(imageSize ?? {}) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
