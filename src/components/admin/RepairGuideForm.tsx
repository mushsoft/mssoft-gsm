'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2 } from 'lucide-react';

export type RepairGuideFormValues = {
  title: string;
  brand: string;
  modelName: string;
  content: string;
  toolsUsed: string[];
};

export default function RepairGuideForm({
  mode,
  initialValues,
  guideId,
}: {
  mode: 'create' | 'edit';
  initialValues: RepairGuideFormValues;
  guideId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof RepairGuideFormValues>(key: K, value: RepairGuideFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function updateTool(index: number, value: string) {
    setValues((prev) => ({ ...prev, toolsUsed: prev.toolsUsed.map((t, i) => (i === index ? value : t)) }));
  }

  function addTool() {
    setValues((prev) => ({ ...prev, toolsUsed: [...prev.toolsUsed, ''] }));
  }

  function removeTool(index: number) {
    setValues((prev) => ({ ...prev, toolsUsed: prev.toolsUsed.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // thumbnail/videoUrl are intentionally omitted — they're managed
    // exclusively by the dedicated uploaders on the edit page (see
    // RepairGuideThumbnailUploader/RepairGuideVideoUploader), which write
    // directly to their own endpoints. Sending them here would risk
    // overwriting an already-uploaded photo/video with a stale value.
    const payload = {
      title: values.title,
      brand: values.brand,
      modelName: values.modelName,
      content: values.content,
      toolsUsed: values.toolsUsed,
    };

    try {
      const url = mode === 'create' ? '/api/admin/repair-guides' : `/api/admin/repair-guides/${guideId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      if (mode === 'create') {
        router.push(`/admin/repair-guides/${data.guide.id}`);
      } else {
        router.refresh();
      }
      setIsSubmitting(false);
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-emerald-500/50 disabled:opacity-60';
  const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="How to Replace a Samsung Galaxy A54 5G Screen"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Brand</label>
          <input
            required
            value={values.brand}
            onChange={(e) => update('brand', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Samsung"
          />
        </div>
        <div>
          <label className={labelClass}>Model Name</label>
          <input
            required
            value={values.modelName}
            onChange={(e) => update('modelName', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Galaxy A54 5G"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Content</label>
        <textarea
          required
          rows={10}
          value={values.content}
          onChange={(e) => update('content', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="1. Power off the phone...&#10;2. Remove the screws..."
        />
      </div>

      <div>
        <label className={labelClass}>Tools Used</label>
        <div className="space-y-2">
          {values.toolsUsed.map((tool, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={tool}
                onChange={(e) => updateTool(index, e.target.value)}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="Heat Gun"
              />
              <button
                type="button"
                onClick={() => removeTool(index)}
                disabled={isSubmitting}
                className="shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-colors hover:border-red-500/40 hover:text-red-500 disabled:opacity-60"
                aria-label="Remove tool"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTool}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-bold text-neutral-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-500 disabled:opacity-60"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Tool
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : mode === 'create' ? (
          'Create Guide'
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
