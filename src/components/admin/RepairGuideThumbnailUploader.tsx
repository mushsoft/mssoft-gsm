'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GraduationCap, Loader2, Trash2, Upload } from 'lucide-react';

export default function RepairGuideThumbnailUploader({
  guideId,
  thumbnail,
}: {
  guideId: string;
  thumbnail: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/repair-guides/${guideId}/thumbnail`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Upload failed');
      } else {
        router.refresh();
      }
    } catch {
      setError('Network error during upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDelete() {
    setError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/repair-guides/${guideId}/thumbnail`, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Delete failed');
      } else {
        router.refresh();
      }
    } catch {
      setError('Network error while deleting');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {thumbnail ? (
          <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
            <Image src={thumbnail} alt="" fill className="object-cover" />
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
              aria-label="Remove thumbnail"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Trash2 className="h-4 w-4 text-red-400" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700">
            <GraduationCap className="h-6 w-6" />
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs font-bold text-neutral-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-60"
        >
          {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {isUploading ? 'Uploading' : thumbnail ? 'Replace Photo' : 'Add Photo'}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}
