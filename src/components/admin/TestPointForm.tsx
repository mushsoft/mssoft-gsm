'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { TESTPOINT_TYPES } from '@/lib/testPointTypes';

export type TestPointFormValues = {
  brand: string;
  modelName: string;
  chipset: string;
  pointType: string;
  title: string;
  notes: string;
};

export default function TestPointForm({
  mode,
  initialValues,
  testPointId,
}: {
  mode: 'create' | 'edit';
  initialValues: TestPointFormValues;
  testPointId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof TestPointFormValues>(key: K, value: TestPointFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      brand: values.brand,
      modelName: values.modelName,
      chipset: values.chipset,
      pointType: values.pointType,
      title: values.title,
      notes: values.notes || null,
    };

    try {
      const url = mode === 'create' ? '/api/admin/testpoints' : `/api/admin/testpoints/${testPointId}`;
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
        router.push(`/admin/testpoints/${data.testPoint.id}`);
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
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60';
  const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Brand</label>
          <input
            required
            value={values.brand}
            onChange={(e) => update('brand', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Tecno"
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
            placeholder="Spark 8 Pro"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Chipset</label>
          <input
            required
            value={values.chipset}
            onChange={(e) => update('chipset', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="MediaTek MT6769"
          />
        </div>
        <div>
          <label className={labelClass}>Point Type</label>
          <select
            required
            value={values.pointType}
            onChange={(e) => update('pointType', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          >
            {TESTPOINT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Tecno Spark 8 Pro EDL Testpoint"
        />
      </div>

      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea
          rows={4}
          value={values.notes}
          onChange={(e) => update('notes', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Voltages, CLK/CMD instructions, short-to-ground point, etc."
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : mode === 'create' ? (
          'Create Test Point'
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
