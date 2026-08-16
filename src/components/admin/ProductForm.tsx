'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Loader2, Plus, Trash2 } from 'lucide-react';
import { CATEGORY_SUBCATEGORIES, getSpecFields, type ProductCategory } from '@/lib/productSpecFields';
import { PRODUCT_BRANDS, BRAND_MODELS_MAP } from '@/lib/brands';
import PhoneAutoFill, { type FetchedPhoneSpecs } from '@/components/admin/PhoneAutoFill';

const CATEGORIES = [
  { value: 'PHONE', label: 'Phone' },
  { value: 'ACCESSORY', label: 'Accessory' },
  { value: 'SPARE_PART', label: 'Spare Part' },
  { value: 'REPAIR_TOOL', label: 'Repair Tool' },
  { value: 'KIDS_TAB', label: 'Kids Tab' },
] as const;

const OTHER_BRAND = 'Other';
const OTHER_MODEL = 'Other';

const CATEGORY_PLACEHOLDERS: Record<
  (typeof CATEGORIES)[number]['value'],
  { title: string; slug: string; description: string }
> = {
  PHONE: {
    title: 'Samsung Galaxy A54 5G (128GB/8GB) - Brand New',
    slug: 'samsung-galaxy-a54-5g-128gb',
    description: 'Brand new, factory sealed, full manufacturer warranty.',
  },
  SPARE_PART: {
    title: 'Samsung Galaxy A54 5G Display Assembly',
    slug: 'samsung-galaxy-a54-5g-screen',
    description: 'Original service pack OLED display assembly with touch panel.',
  },
  ACCESSORY: {
    title: '20W Fast Charger Adapter + Type-C Cable',
    slug: '20w-fast-charger-type-c',
    description: 'Fast charging adapter with Type-C cable, compatible with most Android devices.',
  },
  REPAIR_TOOL: {
    title: '858D Hot Air Rework Soldering Station',
    slug: 'kada-858d-hot-air-station',
    description: 'Digital ESD hot air station for SMD component micro-soldering, 110V-220V.',
  },
  KIDS_TAB: {
    title: 'Kids Educational Tablet 7" (32GB)',
    slug: 'kids-tablet-7-32gb',
    description: 'Durable kids tablet with parental controls and pre-loaded learning apps.',
  },
};

export type ProductFormValues = {
  title: string;
  slug: string;
  description: string;
  brand: string;
  modelName: string;
  category: string;
  subcategory: string;
  price: string;
  originalPrice: string;
  isHotDeal: boolean;
  stock: string;
  specs: Record<string, string>;
  extraSpecs: { key: string; value: string }[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProductForm({
  mode,
  initialValues,
  productId,
}: {
  mode: 'create' | 'edit';
  initialValues: ProductFormValues;
  productId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCustomBrand, setIsCustomBrand] = useState(
    () => !!initialValues.brand && !PRODUCT_BRANDS.includes(initialValues.brand as (typeof PRODUCT_BRANDS)[number])
  );
  const [isCustomModel, setIsCustomModel] = useState(() => {
    const models = BRAND_MODELS_MAP[initialValues.brand];
    // No list at all -> free text. A list plus a non-empty model that isn't
    // in it -> preserve as free text. An empty model just means "not picked
    // yet" and should default to showing the dropdown, not falling back.
    return !models?.length || (!!initialValues.modelName && !models.includes(initialValues.modelName));
  });

  const modelOptions = BRAND_MODELS_MAP[values.brand];
  const categoryPlaceholders = CATEGORY_PLACEHOLDERS[values.category as (typeof CATEGORIES)[number]['value']];
  const showModelName = values.category !== 'REPAIR_TOOL';

  const subcategoryOptions = CATEGORY_SUBCATEGORIES[values.category as ProductCategory];
  const specFields = getSpecFields(values.category as ProductCategory, values.subcategory);
  const detailsLabel =
    subcategoryOptions?.find((s) => s.value === values.subcategory)?.label ??
    CATEGORIES.find((c) => c.value === values.category)?.label;

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    update('title', title);
    if (!slugTouched) update('slug', slugify(title));
  }

  // Re-sort existing spec values against a new field set so nothing is
  // silently lost — values that no longer have a matching field move into
  // "Additional Info" instead of just disappearing.
  function reconcileSpecs(nextFields: { key: string }[]) {
    const nextKeys = new Set(nextFields.map((f) => f.key));
    const allEntries = { ...values.specs, ...Object.fromEntries(values.extraSpecs.map((s) => [s.key, s.value])) };

    const nextSpecs: Record<string, string> = {};
    const nextExtras: { key: string; value: string }[] = [];
    for (const [key, value] of Object.entries(allEntries)) {
      if (!key) continue;
      if (nextKeys.has(key)) nextSpecs[key] = value;
      else nextExtras.push({ key, value });
    }
    return { nextSpecs, nextExtras };
  }

  function handleSubcategoryChange(subcategory: string) {
    const nextFields = getSpecFields(values.category as ProductCategory, subcategory);
    const { nextSpecs, nextExtras } = reconcileSpecs(nextFields);
    setValues((prev) => ({ ...prev, subcategory, specs: nextSpecs, extraSpecs: nextExtras }));
  }

  function handleBrandSelect(selected: string) {
    if (selected === OTHER_BRAND) {
      setIsCustomBrand(true);
      update('brand', '');
      setIsCustomModel(true);
    } else {
      setIsCustomBrand(false);
      update('brand', selected);
      // New brand's model list may not contain the currently-typed model —
      // keep it as free text rather than silently clearing it. An empty
      // model just defaults to showing the dropdown.
      const models = BRAND_MODELS_MAP[selected];
      setIsCustomModel(!models?.length || (!!values.modelName && !models.includes(values.modelName)));
    }
  }

  function handleModelSelect(selected: string) {
    if (selected === OTHER_MODEL) {
      setIsCustomModel(true);
      update('modelName', '');
    } else {
      setIsCustomModel(false);
      update('modelName', selected);
    }
  }

  // Fills in fetched data for review, never submits — brand stays whatever
  // the admin already picked, and title/description are only filled if the
  // admin hasn't typed anything yet so we don't clobber their edits.
  function handleAutoFillApply(result: FetchedPhoneSpecs) {
    setIsCustomModel(true);
    setValues((prev) => {
      const existingExtraKeys = new Set(prev.extraSpecs.map((e) => e.key));
      const newExtras = result.extras.filter((e) => !existingExtraKeys.has(e.key));
      const suggestedTitle = [prev.brand, result.modelName].filter(Boolean).join(' ');
      return {
        ...prev,
        modelName: result.modelName || prev.modelName,
        title: prev.title || suggestedTitle,
        description: prev.description || result.description || prev.description,
        specs: { ...prev.specs, ...result.specs },
        extraSpecs: [...prev.extraSpecs, ...newExtras],
      };
    });
  }

  function updateSpecField(key: string, value: string) {
    setValues((prev) => ({ ...prev, specs: { ...prev.specs, [key]: value } }));
  }

  function updateExtra(index: number, field: 'key' | 'value', value: string) {
    setValues((prev) => ({
      ...prev,
      extraSpecs: prev.extraSpecs.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec)),
    }));
  }

  function addExtra() {
    setValues((prev) => ({ ...prev, extraSpecs: [...prev.extraSpecs, { key: '', value: '' }] }));
  }

  function removeExtra(index: number) {
    setValues((prev) => ({ ...prev, extraSpecs: prev.extraSpecs.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const extrasRecord: Record<string, string> = {};
    for (const { key, value } of values.extraSpecs) {
      const trimmedKey = key.trim();
      if (trimmedKey) extrasRecord[trimmedKey] = value.trim();
    }

    const specsRecord: Record<string, string> = {};
    for (const [key, value] of Object.entries(values.specs)) {
      if (value.trim()) specsRecord[key] = value.trim();
    }

    const payload = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      brand: values.brand,
      modelName: values.modelName || null,
      category: values.category,
      subcategory: values.subcategory || null,
      price: Number(values.price),
      originalPrice: values.originalPrice ? Number(values.originalPrice) : null,
      isHotDeal: values.isHotDeal,
      stock: Number(values.stock),
      specs: { ...specsRecord, ...extrasRecord },
    };

    try {
      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${productId}`;
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
        router.push(`/admin/products/${data.product.id}`);
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
          <label className={labelClass}>Title</label>
          <input
            required
            value={values.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder={categoryPlaceholders.title}
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            required
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update('slug', e.target.value);
            }}
            disabled={isSubmitting}
            className={inputClass}
            placeholder={categoryPlaceholders.slug}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={3}
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder={categoryPlaceholders.description}
        />
      </div>

      <div className={`grid grid-cols-1 gap-4 ${showModelName ? 'sm:grid-cols-2' : ''}`}>
        <div>
          <label className={labelClass}>Brand</label>
          {isCustomBrand ? (
            <div className="flex gap-2">
              <input
                required
                autoFocus
                value={values.brand}
                onChange={(e) => update('brand', e.target.value)}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="e.g. KADA"
              />
              <button
                type="button"
                onClick={() => handleBrandSelect(PRODUCT_BRANDS[0])}
                disabled={isSubmitting}
                className="shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 px-2.5 text-[10px] font-bold text-neutral-500 transition-colors hover:text-amber-500 disabled:opacity-60"
              >
                Pick from list
              </button>
            </div>
          ) : (
            <select
              required
              value={values.brand}
              onChange={(e) => handleBrandSelect(e.target.value)}
              disabled={isSubmitting}
              className={inputClass}
            >
              <option value="" disabled>
                Select brand&hellip;
              </option>
              {PRODUCT_BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
              <option value={OTHER_BRAND}>Other&hellip;</option>
            </select>
          )}
        </div>
        {showModelName && (
          <div>
            <label className={labelClass}>Model Name (optional)</label>
            {isCustomModel || !modelOptions?.length ? (
              <div className="flex gap-2">
                <input
                  value={values.modelName}
                  onChange={(e) => update('modelName', e.target.value)}
                  disabled={isSubmitting}
                  className={inputClass}
                  placeholder="Galaxy A54 5G"
                />
                {!!modelOptions?.length && (
                  <button
                    type="button"
                    onClick={() => handleModelSelect(modelOptions[0])}
                    disabled={isSubmitting}
                    className="shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 px-2.5 text-[10px] font-bold text-neutral-500 transition-colors hover:text-amber-500 disabled:opacity-60"
                  >
                    Pick from list
                  </button>
                )}
              </div>
            ) : (
              <select
                value={values.modelName}
                onChange={(e) => handleModelSelect(e.target.value)}
                disabled={isSubmitting}
                className={inputClass}
              >
                <option value="" disabled>
                  Select model&hellip;
                </option>
                {modelOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                <option value={OTHER_MODEL}>Other&hellip;</option>
              </select>
            )}
          </div>
        )}
      </div>

      {values.category === 'PHONE' && (
        <PhoneAutoFill brand={values.brand} disabled={isSubmitting} onApply={handleAutoFillApply} />
      )}

      {subcategoryOptions && (
        <div>
          <label className={labelClass}>Subcategory</label>
          <select
            required
            value={values.subcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          >
            <option value="" disabled>
              Select subcategory&hellip;
            </option>
            {subcategoryOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Price (UGX)</label>
          <input
            required
            type="number"
            min="0"
            step="1"
            value={values.price}
            onChange={(e) => update('price', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input
            required
            type="number"
            min="0"
            step="1"
            value={values.stock}
            onChange={(e) => update('stock', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1">
          <label className={labelClass}>Original Price (optional)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={values.originalPrice}
            onChange={(e) => update('originalPrice', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Leave blank if not discounted"
          />
        </div>
        <label className="flex shrink-0 items-center gap-2 pb-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
          <input
            type="checkbox"
            checked={values.isHotDeal}
            onChange={(e) => update('isHotDeal', e.target.checked)}
            disabled={isSubmitting}
            className="h-4 w-4 accent-amber-500"
          />
          <Flame className="h-3.5 w-3.5 fill-current text-red-500" />
          Hot Deal
        </label>
      </div>

      {specFields.length > 0 && (
        <div>
          <label className={labelClass}>{detailsLabel} Details</label>
          <div className="grid grid-cols-1 gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 sm:grid-cols-2">
            {specFields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-[10px] text-neutral-500">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={values.specs[field.key] ?? ''}
                    onChange={(e) => updateSpecField(field.key, e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {values.specs[field.key] && !field.options?.includes(values.specs[field.key]) && (
                      <option value={values.specs[field.key]}>{values.specs[field.key]}</option>
                    )}
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={values.specs[field.key] ?? ''}
                    onChange={(e) => updateSpecField(field.key, e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>Additional Info (optional)</label>
        <div className="space-y-2">
          {values.extraSpecs.map((spec, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={spec.key}
                onChange={(e) => updateExtra(index, 'key', e.target.value)}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="Label"
              />
              <input
                value={spec.value}
                onChange={(e) => updateExtra(index, 'value', e.target.value)}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => removeExtra(index)}
                disabled={isSubmitting}
                className="shrink-0 rounded-lg border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-colors hover:border-red-500/40 hover:text-red-500 disabled:opacity-60"
                aria-label="Remove field"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExtra}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-bold text-neutral-500 transition-colors hover:border-amber-500/50 hover:text-amber-500 disabled:opacity-60"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Custom Field
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
        className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : mode === 'create' ? (
          'Create Product'
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
