'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface ModelOption {
  id: number;
  name: string;
}

export interface FetchedPhoneSpecs {
  modelName: string;
  description: string | null;
  specs: Record<string, string>;
  extras: { key: string; value: string }[];
}

export default function PhoneAutoFill({
  brand,
  disabled,
  onApply,
}: {
  brand: string;
  disabled?: boolean;
  onApply: (result: FetchedPhoneSpecs) => void;
}) {
  const [query, setQuery] = useState('');
  const [models, setModels] = useState<ModelOption[] | null>(null);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingSpecs, setIsLoadingSpecs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  async function loadModels() {
    if (!brand) {
      setError('Select a brand first');
      return;
    }
    if (query.trim().length < 2) {
      setError('Type at least 2 characters of the model name');
      return;
    }
    setError(null);
    setApplied(false);
    setIsLoadingModels(true);
    setModels(null);
    setSelectedModelId('');
    try {
      const response = await fetch(
        `/api/admin/phone-lookup/models?brand=${encodeURIComponent(brand)}&q=${encodeURIComponent(query.trim())}`
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to fetch models');
        return;
      }
      if (data.models.length === 0) {
        setError(`No "${query}" models found for "${brand}" on MobileAPI.dev`);
        return;
      }
      setModels(data.models);
    } catch {
      setError('Network error while fetching models');
    } finally {
      setIsLoadingModels(false);
    }
  }

  async function fetchSpecs() {
    if (!selectedModelId) return;
    setError(null);
    setApplied(false);
    setIsLoadingSpecs(true);
    try {
      const response = await fetch(`/api/admin/phone-lookup/specs?id=${selectedModelId}`);
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to fetch specifications');
        return;
      }
      onApply({
        modelName: data.modelName,
        description: data.description,
        specs: data.specs,
        extras: data.extras,
      });
      setApplied(true);
    } catch {
      setError('Network error while fetching specifications');
    } finally {
      setIsLoadingSpecs(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 outline-none focus:border-amber-500/50 disabled:opacity-60';

  return (
    <div className="space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
        <Sparkles className="h-3.5 w-3.5" />
        Auto-Fill from Web
      </div>
      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
        Sourced from MobileAPI.dev — review everything below before saving. RAM comes back as a list of
        variants (e.g. &quot;128GB 4GB RAM, 128GB 8GB RAM&quot;) in Additional Info since devices ship in more
        than one configuration — pick the exact one you&apos;re stocking.
      </p>

      <div className="flex flex-wrap items-end gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              loadModels();
            }
          }}
          disabled={disabled || !brand}
          className={`${inputClass} max-w-55`}
          placeholder={brand ? `e.g. Galaxy A54` : 'Select a brand first'}
        />
        <button
          type="button"
          onClick={loadModels}
          disabled={disabled || isLoadingModels || !brand}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-500 disabled:opacity-60"
        >
          {isLoadingModels && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Search Models
        </button>

        {models && (
          <>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              disabled={disabled}
              className={`${inputClass} max-w-55`}
            >
              <option value="" disabled>
                Select model&hellip;
              </option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={fetchSpecs}
              disabled={disabled || isLoadingSpecs || !selectedModelId}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingSpecs && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Fetch Specifications
            </button>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {applied && !error && (
        <p className="text-xs font-bold text-emerald-500">Specifications filled in below — review before saving.</p>
      )}
    </div>
  );
}
