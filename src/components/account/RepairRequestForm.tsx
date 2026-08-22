'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ImagePlus, Loader2, MessageCircle, Send, Wrench, X } from 'lucide-react';

const WHATSAPP_PHONE = '256773944288';
const MAX_PROBLEM_LENGTH = 2000;

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500';
const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

export default function RepairRequestForm() {
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  const [problem, setProblem] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleFileChange(selected: File | null) {
    setFile(selected);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return selected ? URL.createObjectURL(selected) : null;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set('problem', problem);
    if (brand) formData.set('brand', brand);
    if (modelName) formData.set('modelName', modelName);
    if (file) formData.set('file', file);

    try {
      const response = await fetch('/api/repair-requests', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    const device = [brand, modelName].filter(Boolean).join(' ');
    const waMessage = `Hi! I just submitted a repair question${device ? ` about my ${device}` : ''}: ${problem}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

    return (
      <main className="flex min-h-[75vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Send className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Question Sent!</h1>
          <p className="mt-1 text-xs text-neutral-500">A technician will reply here. Want it answered faster?</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            Also Message on WhatsApp
          </a>
          <Link
            href="/account/repair-requests"
            className="mt-3 inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/50 hover:text-amber-500"
          >
            View My Requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <Link
          href="/account/repair-requests"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Wrench className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Ask a Technician</h1>
          <p className="mt-1 text-xs text-neutral-500">Describe the problem. A photo helps us diagnose it faster.</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Brand (optional)</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Samsung"
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Model (optional)</label>
              <input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Galaxy A54"
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>What&apos;s wrong?</label>
            <textarea
              required
              rows={4}
              maxLength={MAX_PROBLEM_LENGTH}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. Screen flickers and touch stopped responding after it got wet."
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Photo (optional)</label>
            {previewUrl ? (
              <div className="relative w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not worth Image's optimization pipeline */}
                <img src={previewUrl} alt="Selected photo" className="h-24 w-24 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => handleFileChange(null)}
                  disabled={isSubmitting}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                  aria-label="Remove photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs font-bold text-neutral-500 transition-colors hover:border-amber-500/50 hover:text-amber-500">
                <ImagePlus className="h-3.5 w-3.5" />
                Add Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !problem.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send to Technician'}
        </button>
      </form>
    </main>
  );
}
