// Shared between the admin video uploader and the public guide page: a
// guide's videoUrl is either a direct video file (our own Supabase Storage
// upload, or someone pasting a direct .mp4/.webm link) — rendered with a
// native <video> tag — or an external embed link (YouTube, Vimeo) — rendered
// in an <iframe>, as this app has always supported. Extension-sniffing
// generalizes to both "uploaded to our bucket" and "pasted a direct file
// link elsewhere" without this needing to know our bucket's naming.
const VIDEO_FILE_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg', '.m4v'];

export function isDirectVideoFile(url: string): boolean {
  const path = url.split(/[?#]/)[0].toLowerCase();
  return VIDEO_FILE_EXTENSIONS.some((ext) => path.endsWith(ext));
}
