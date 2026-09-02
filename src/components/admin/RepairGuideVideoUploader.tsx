'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Film, Link2, Loader2, PlayCircle, Trash2, Upload } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { isDirectVideoFile } from '@/lib/repairGuideMedia';

// Must match REPAIR_GUIDE_MEDIA_BUCKET in src/lib/supabaseAdmin.ts — not
// imported directly since that module is server-only and this is a client
// component (the upload itself happens straight from the browser to
// Supabase Storage; see /video/sign for why).
const REPAIR_GUIDE_MEDIA_BUCKET = 'repair-guide-media';

export default function RepairGuideVideoUploader({ guideId, videoUrl }: { guideId: string; videoUrl: string | null }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkInput, setLinkInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingLink, setIsSavingLink] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const busy = isUploading || isSavingLink || isDeleting;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);

    try {
      const signResponse = await fetch(`/api/admin/repair-guides/${guideId}/video/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
      });
      const signData = await signResponse.json();
      if (!signResponse.ok || !signData.success) {
        setError(signData.error || 'Could not start upload');
        return;
      }

      // Uploads straight to Supabase Storage — the file itself never passes
      // through our own server (see /video/sign/route.ts).
      const { error: uploadError } = await createSupabaseBrowserClient()
        .storage.from(REPAIR_GUIDE_MEDIA_BUCKET)
        .uploadToSignedUrl(signData.path, signData.token, file);
      if (uploadError) {
        setError(uploadError.message || 'Upload failed');
        return;
      }

      const confirmResponse = await fetch(`/api/admin/repair-guides/${guideId}/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: signData.path }),
      });
      const confirmData = await confirmResponse.json();
      if (!confirmResponse.ok || !confirmData.success) {
        setError(confirmData.error || 'Could not save the uploaded video');
        return;
      }

      router.refresh();
    } catch {
      setError('Network error during upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleSaveLink(e: FormEvent) {
    e.preventDefault();
    const url = linkInput.trim();
    if (!url) return;
    setError(null);
    setIsSavingLink(true);

    try {
      const response = await fetch(`/api/admin/repair-guides/${guideId}/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Could not save link');
        return;
      }
      setLinkInput('');
      router.refresh();
    } catch {
      setError('Network error');
    } finally {
      setIsSavingLink(false);
    }
  }

  async function handleDelete() {
    setError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/repair-guides/${guideId}/video`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Delete failed');
        return;
      }
      router.refresh();
    } catch {
      setError('Network error while deleting');
    } finally {
      setIsDeleting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-emerald-500/50 disabled:opacity-60';

  return (
    <div className="space-y-3">
      {videoUrl ? (
        <div className="space-y-2">
          {isDirectVideoFile(videoUrl) ? (
            <video controls src={videoUrl} className="h-32 w-full max-w-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-black" />
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-xs text-neutral-600 dark:text-neutral-300">
              <PlayCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                {videoUrl}
              </a>
            </div>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-500 transition-colors hover:border-red-500/40 hover:text-red-500 disabled:opacity-60"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Remove Video
          </button>
        </div>
      ) : (
        <div className="flex h-16 items-center gap-2 rounded-lg border border-dashed border-neutral-300 px-3 text-xs text-neutral-400 dark:border-neutral-700">
          <Film className="h-4 w-4" />
          No video yet — optional
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs font-bold text-neutral-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-60"
        >
          {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {isUploading ? 'Uploading' : 'Upload Video File'}
        </button>
        <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />

        <form onSubmit={handleSaveLink} className="flex items-center gap-1.5">
          <input
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            disabled={busy}
            placeholder="Or paste a YouTube link..."
            className={inputClass}
          />
          <button
            type="submit"
            disabled={busy || !linkInput.trim()}
            className="shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-colors hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-60"
            aria-label="Save video link"
          >
            {isSavingLink ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Link2 className="h-3.5 w-3.5" />}
          </button>
        </form>
      </div>

      <p className="text-[10px] text-neutral-400">Video files up to 50MB, or paste a YouTube/Vimeo embed link instead.</p>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}
