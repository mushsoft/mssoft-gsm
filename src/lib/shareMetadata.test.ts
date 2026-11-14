import { describe, it, expect } from 'vitest';
import { isAllowedSharePhoto, shareCardUrl, shareDescription, shareMetadata, youtubeThumbnail } from './shareMetadata';

const SUPABASE = 'abc.supabase.co';

describe('isAllowedSharePhoto', () => {
  it('allows our own tip and og photos', () => {
    expect(isAllowedSharePhoto('/tips/windows-firewall.jpg', SUPABASE)).toBe(true);
    expect(isAllowedSharePhoto('/og/deals.jpg', SUPABASE)).toBe(true);
  });

  it('allows public Supabase storage and YouTube thumbnails', () => {
    expect(isAllowedSharePhoto(`https://${SUPABASE}/storage/v1/object/public/product-images/a/b.jpeg`, SUPABASE)).toBe(true);
    expect(isAllowedSharePhoto('https://img.youtube.com/vi/abcdefghijk/hqdefault.jpg', SUPABASE)).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isAllowedSharePhoto('/tips/../secret.jpg', SUPABASE)).toBe(false);
    expect(isAllowedSharePhoto('/api/admin/x.jpg', SUPABASE)).toBe(false);
    expect(isAllowedSharePhoto('https://evil.example/a.jpg', SUPABASE)).toBe(false);
    expect(isAllowedSharePhoto(`http://${SUPABASE}/storage/v1/object/public/a.jpg`, SUPABASE)).toBe(false);
    expect(isAllowedSharePhoto(`https://${SUPABASE}/rest/v1/orders`, SUPABASE)).toBe(false);
    expect(isAllowedSharePhoto(`https://${SUPABASE}/storage/v1/object/public/a.jpg`, null)).toBe(false);
  });
});

describe('shareCardUrl', () => {
  it('builds an /api/og link with the encoded fields', () => {
    const url = shareCardUrl({ title: 'Contact Us', subtitle: 'Call or WhatsApp', photo: '/tips/x.jpg' });
    const params = new URL(url, 'https://example.com').searchParams;
    expect(url.startsWith('/api/og?')).toBe(true);
    expect(params.get('title')).toBe('Contact Us');
    expect(params.get('subtitle')).toBe('Call or WhatsApp');
    expect(params.get('photo')).toBe('/tips/x.jpg');
  });
});

describe('youtubeThumbnail', () => {
  it('reads the video id from embed, watch and short links', () => {
    expect(youtubeThumbnail('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
    expect(youtubeThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10')).toContain('dQw4w9WgXcQ');
    expect(youtubeThumbnail('https://youtu.be/dQw4w9WgXcQ')).toContain('dQw4w9WgXcQ');
  });

  it('returns null for other videos', () => {
    expect(youtubeThumbnail('https://player.vimeo.com/video/123')).toBeNull();
    expect(youtubeThumbnail(null)).toBeNull();
  });
});

describe('shareDescription', () => {
  it('flattens whitespace and cuts long text at a word', () => {
    expect(shareDescription('1. Open\n\nSettings')).toBe('1. Open Settings');
    const long = shareDescription('word '.repeat(60), 40);
    expect(long.length).toBeLessThanOrEqual(40);
    expect(long.endsWith('…')).toBe(true);
  });
});

describe('shareMetadata', () => {
  it('sets the page title, description, url and image for previews', () => {
    const meta = shareMetadata({ title: 'Contact Us', description: 'Reach us', path: '/contact', image: '/api/og?title=x' });
    expect(meta.openGraph).toMatchObject({ title: 'Contact Us | MS Soft GSM', description: 'Reach us', url: '/contact' });
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', images: ['/api/og?title=x'] });
    expect(meta.alternates).toEqual({ canonical: '/contact' });
  });
});
