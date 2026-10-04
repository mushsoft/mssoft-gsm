'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Trash2, Upload, X } from 'lucide-react';

export default function ProductImageUploader({
  productId,
  images,
}: {
  productId: string;
  images: string[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!previewUrl) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPreviewUrl(null);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [previewUrl]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/products/${productId}/image`, {
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

  async function handleDelete(imageUrl: string) {
    setError(null);
    setDeletingUrl(imageUrl);

    try {
      const response = await fetch(`/api/admin/products/${productId}/image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Delete failed');
      } else {
        router.refresh();
      }
    } catch {
      setError('Network error while deleting');
    } finally {
      setDeletingUrl(null);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {images.map((url) => (
          <div key={url} className="group relative h-16 w-16 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
            <button
              type="button"
              onClick={() => setPreviewUrl(url)}
              className="absolute inset-0"
              aria-label="Preview image"
            >
              <Image src={url} alt="" fill className="object-cover" />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(url)}
              disabled={deletingUrl === url}
              className="absolute right-0.5 top-0.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
              aria-label="Delete image"
            >
              {deletingUrl === url ? (
                <Loader2 className="h-3 w-3 animate-spin text-white" />
              ) : (
                <Trash2 className="h-3 w-3 text-red-400" />
              )}
            </button>
          </div>
        ))}

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 text-neutral-500 transition-colors hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-60 dark:border-neutral-700"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="text-[9px] font-bold">{isUploading ? 'Uploading' : 'Add'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewUrl(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={previewUrl} alt="" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}
