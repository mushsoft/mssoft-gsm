'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Trash2, Upload } from 'lucide-react';

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
            <Image src={url} alt="" fill className="object-cover" />
            <button
              onClick={() => handleDelete(url)}
              disabled={deletingUrl === url}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
              aria-label="Delete image"
            >
              {deletingUrl === url ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Trash2 className="h-4 w-4 text-red-400" />
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
    </div>
  );
}
