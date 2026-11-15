'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, FileUp, Loader2, Plus, Printer, Save, Smartphone, Trash2, X } from 'lucide-react';
import ProductPicker from './ProductPicker';
import {
  DOC_TYPES,
  docTypeConfig,
  documentNumber,
  warrantyEndDate,
  type DocType,
  type ExtraField,
} from '@/lib/receiptDocTypes';
import { STORAGE_OPTIONS } from '@/lib/productSpecFields';
import { PRODUCT_BRANDS } from '@/lib/brands';

export type ReceiptItemData = {
  title: string;
  quantity: number;
  price: number;
  isPhone?: boolean;
  brand?: string;
  condition?: string;
  color?: string;
  storage?: string;
  serialNumber?: string;
  imei?: string;
};

export type ReceiptInitialData = {
  receiptId: string | null; // null = not yet saved
  orderId: string | null; // set when this document was generated from (or is linked to) a real order
  docType: DocType;
  reference: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  documentDate: string; // YYYY-MM-DD
  documentTime: string; // HH:mm
  items: ReceiptItemData[];
  discountAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentReference: string;
  notesByType: Record<DocType, string>;
  extra: Record<string, string>; // type-specific fields, see receiptDocTypes.ts
};

const PHONE_CONDITIONS = ['Brand New', 'UK Used'];
const COLOR_OPTIONS = ['Black', 'White', 'Blue', 'Green', 'Gold', 'Silver', 'Gray', 'Purple', 'Red', 'Pink'];
const GROUPS = ['Sales', 'Repairs', 'Other'] as const;

type ShopProfileData = {
  businessName: string;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  tiktok: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  tinNumber: string | null;
};

const money = (n: number) => `UGX ${n.toLocaleString('en-US')}`;

// "16 Nov 2026" from YYYY-MM-DD. Built from the date parts (not UTC), so the
// server and the browser print the same day.
function longDate(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// The paper is one A4 page wide; on screen it scrolls sideways on phones.
// In print, form controls lose their borders so the page reads as a finished
// document, and long text prints from a plain copy (a textarea would cut it
// off at its visible rows).
const PRINT_CSS = `
  @page { size: A4; margin: 0; }
  @media print {
    html, body { background: #fff !important; }
    .no-print { display: none !important; }
    .receipt-shell { max-width: none !important; margin: 0 !important; padding: 0 !important; }
    .receipt-scroll { overflow: visible !important; padding: 0 !important; }
    .receipt-paper {
      border: 0 !important; border-radius: 0 !important; box-shadow: none !important;
      min-width: 0 !important; min-height: 297mm; display: flex !important; flex-direction: column;
    }
    .receipt-paper, .receipt-paper * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .receipt-field {
      border: none !important; padding: 0 !important; background: transparent !important;
      color: inherit !important; box-shadow: none !important; appearance: none; -webkit-appearance: none;
    }
    .receipt-field::placeholder { color: transparent !important; }
    /* Empty boxes print nothing at all (not even their hint text). */
    .receipt-field:placeholder-shown { display: none !important; }
    .receipt-field::-webkit-calendar-picker-indicator { display: none; }
    .screen-only { display: none !important; }
    /* Totals, signatures and notes never split across two pages. */
    .receipt-keep { break-inside: avoid; page-break-inside: avoid; }
    .receipt-paper tr { break-inside: avoid; page-break-inside: avoid; }
    .print-only { display: block !important; }
  }
`;

const fieldClass =
  'receipt-field w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-900 outline-none transition-colors focus:border-amber-500';

export default function ReceiptDocument({ initial, shopProfile }: { initial: ReceiptInitialData; shopProfile: ShopProfileData }) {
  const router = useRouter();
  const [receiptId, setReceiptId] = useState(initial.receiptId);
  const [docType, setDocType] = useState<DocType>(initial.docType);
  const config = docTypeConfig(docType);
  const [reference, setReference] = useState(initial.reference);

  const [customerName, setCustomerName] = useState(initial.customerName);
  const [customerPhone, setCustomerPhone] = useState(initial.customerPhone);
  const [customerEmail, setCustomerEmail] = useState(initial.customerEmail);
  const [deliveryAddress, setDeliveryAddress] = useState(initial.deliveryAddress);
  const [documentDate, setDocumentDate] = useState(initial.documentDate);
  const [documentTime, setDocumentTime] = useState(initial.documentTime);
  const [items, setItems] = useState(() => initial.items.map((item) => ({ ...item })));
  const [discountAmount, setDiscountAmount] = useState(initial.discountAmount);
  const [paymentStatus, setPaymentStatus] = useState(initial.paymentStatus);
  const [paymentMethod, setPaymentMethod] = useState(initial.paymentMethod);
  const [paymentReference, setPaymentReference] = useState(initial.paymentReference);
  const [notesByType, setNotesByType] = useState<Record<DocType, string>>(initial.notesByType);
  const [extra, setExtraState] = useState<Record<string, string>>(initial.extra);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Every edit marks the document as unsaved.
  function changed<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setJustSaved(false);
    };
  }
  function setExtra(key: string, value: string) {
    setExtraState((prev) => ({ ...prev, [key]: value }));
    setJustSaved(false);
  }

  function updateItem(index: number, patch: Partial<ReceiptItemData>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    setJustSaved(false);
  }
  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setJustSaved(false);
  }
  function addItem() {
    setItems((prev) => [...prev, { title: '', quantity: 1, price: 0 }]);
    setJustSaved(false);
  }
  function addProduct(product: { title: string; price: number; brand: string; category: string }) {
    setItems((prev) => [
      ...prev,
      {
        title: product.title,
        quantity: 1,
        price: product.price,
        ...(product.category === 'PHONE' ? { isPhone: true, brand: product.brand } : {}),
      },
    ]);
    setJustSaved(false);
  }
  // Toggling off clears the phone-only fields instead of just hiding them,
  // so an accidental toggle doesn't ship stale IMEI/serial data on an item
  // that's no longer marked as a phone.
  function togglePhone(index: number) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        if (item.isPhone) {
          return { title: item.title, quantity: item.quantity, price: item.price };
        }
        return { ...item, isPhone: true };
      })
    );
    setJustSaved(false);
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const deposit = docType === 'JOB_CARD' ? Math.max(0, Number(extra.deposit) || 0) : 0;
  const pieces = items.reduce((sum, item) => sum + item.quantity, 0);
  const isPaid = paymentStatus === 'SUCCESSFUL';
  const isRefund = config.payment === 'refund';
  const warrantyEnd = docType === 'WARRANTY' && extra.period ? warrantyEndDate(documentDate, extra.period) : null;

  const contactLine = [shopProfile.phone && `Tel ${shopProfile.phone}`, shopProfile.whatsapp && `WhatsApp ${shopProfile.whatsapp}`]
    .filter(Boolean)
    .join('  ·  ');
  const webLine = [shopProfile.email, shopProfile.website].filter(Boolean).join('  ·  ');
  const socials = [
    shopProfile.tiktok && `TikTok ${shopProfile.tiktok}`,
    shopProfile.instagram && `Instagram ${shopProfile.instagram}`,
    shopProfile.facebook && `Facebook ${shopProfile.facebook}`,
  ]
    .filter(Boolean)
    .join('  ·  ');

  // Job cards have many fields: they get their own full-width section.
  const wideExtras = config.extras.length > 3 || !config.partyLabel;

  async function handleSave() {
    setIsSaving(true);
    setSaveError(null);

    const payload = {
      docType,
      reference,
      orderId: initial.orderId,
      documentDate: new Date(`${documentDate}T${documentTime || '00:00'}`).toISOString(),
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress: deliveryAddress || null,
      items,
      discountAmount,
      paymentStatus,
      paymentMethod,
      paymentReference: paymentReference || null,
      notes: notesByType,
      extra,
    };

    try {
      const url = receiptId ? `/api/admin/receipts/${receiptId}` : '/api/admin/receipts';
      const method = receiptId ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setSaveError(data.error || 'Something went wrong. Please try again.');
        setIsSaving(false);
        return;
      }

      if (!receiptId) {
        setReceiptId(data.receipt.id);
        router.replace(`/admin/receipts/${data.receipt.id}`);
      }
      setJustSaved(true);
      setIsSaving(false);
    } catch {
      setSaveError('Network error. Please try again.');
      setIsSaving(false);
    }
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file next time
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/admin/receipts/parse-pdf', { method: 'POST', body: form });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setImportError(data.error || 'Could not read that PDF.');
        setIsImporting(false);
        return;
      }

      const parsed = data.parsed as {
        docType: DocType;
        reference: string;
        documentDate: string;
        customerName: string;
        customerPhone: string;
        customerEmail: string;
        items: { title: string; quantity: number; price: number }[];
        discountAmount: number;
        paymentStatus: string;
        paymentMethod: string;
        paymentReference: string;
        notes: string;
      };

      setDocType(parsed.docType);
      setReference(parsed.reference);
      setDocumentDate(parsed.documentDate);
      setCustomerName(parsed.customerName);
      setCustomerPhone(parsed.customerPhone);
      setCustomerEmail(parsed.customerEmail);
      setItems(parsed.items.length > 0 ? parsed.items : [{ title: '', quantity: 1, price: 0 }]);
      setDiscountAmount(parsed.discountAmount);
      setPaymentStatus(parsed.paymentStatus);
      setPaymentMethod(parsed.paymentMethod);
      setPaymentReference(parsed.paymentReference);
      if (parsed.notes) {
        setNotesByType((prev) => ({ ...prev, [parsed.docType]: parsed.notes }));
      }
      // This is a freshly-parsed, unsaved document even if it started life
      // as a saved receipt someone printed: importing shouldn't silently
      // overwrite whatever's currently saved under the old id.
      setReceiptId(null);
      setJustSaved(false);
      setIsImporting(false);
    } catch {
      setImportError('Network error. Please try again.');
      setIsImporting(false);
    }
  }

  function renderExtraField(field: ExtraField) {
    const value = extra[field.key] ?? '';
    const label = (
      <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-neutral-500">{field.label}</span>
    );
    if (field.kind === 'textarea') {
      return (
        <label key={field.key} className={field.wide ? 'col-span-2 block' : 'block'}>
          {label}
          <textarea
            value={value}
            onChange={(e) => setExtra(field.key, e.target.value)}
            rows={2}
            placeholder={field.placeholder}
            className={`${fieldClass} screen-only resize-y text-xs`}
          />
          <span className="print-only hidden whitespace-pre-wrap text-xs text-neutral-900">{value}</span>
        </label>
      );
    }
    if (field.kind === 'select') {
      return (
        <label key={field.key} className={field.wide ? 'col-span-2 block' : 'block'}>
          {label}
          <select
            value={value}
            onChange={(e) => setExtra(field.key, e.target.value)}
            className={`${fieldClass} screen-only text-xs font-semibold`}
          >
            <option value="">Choose...</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span className="print-only hidden text-sm font-bold text-neutral-900">{value}</span>
        </label>
      );
    }
    if (field.kind === 'date') {
      return (
        <label key={field.key} className={field.wide ? 'col-span-2 block' : 'block'}>
          {label}
          <input
            type="date"
            value={value}
            onChange={(e) => setExtra(field.key, e.target.value)}
            className={`${fieldClass} screen-only text-xs`}
          />
          <span className="print-only hidden text-xs font-semibold text-neutral-900">{value ? longDate(value) : ''}</span>
        </label>
      );
    }
    return (
      <label key={field.key} className={field.wide ? 'col-span-2 block' : 'block'}>
        {label}
        <input
          type={field.kind === 'number' ? 'number' : 'text'}
          min={field.kind === 'number' ? 0 : undefined}
          value={value}
          onChange={(e) => setExtra(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={`${fieldClass} text-xs ${field.key === 'imei' ? 'font-mono' : ''} ${field.kind === 'number' ? 'screen-only' : ''}`}
        />
        {field.kind === 'number' && (
          <span className="print-only hidden text-xs font-semibold text-neutral-900">{money(Number(value) || 0)}</span>
        )}
      </label>
    );
  }

  // Job cards: the short fields sit in a card beside the customer, and the
  // long ones (fault, condition) side by side in a row below, so the whole
  // card fits on one A4 page.
  const splitExtras = wideExtras && !!config.partyLabel;
  const longExtras = splitExtras ? config.extras.filter((f) => f.wide) : [];
  const cardExtras = splitExtras ? config.extras.filter((f) => !f.wide) : config.extras;

  const extrasCard = config.extras.length > 0 && (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">{config.extrasTitle}</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        {cardExtras.map((field) => renderExtraField(field))}
        {warrantyEnd && (
          <div className="col-span-2 rounded-lg bg-amber-500 px-3 py-2 text-black">
            <span className="block text-[9px] font-bold uppercase tracking-widest">Valid Until</span>
            <span className="text-base font-black">
              {warrantyEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const longExtrasRow = longExtras.length > 0 && (
    <section className="mt-4 grid grid-cols-2 gap-4">
      {longExtras.map((field) => (
        <div key={field.key} className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          {renderExtraField({ ...field, wide: false })}
        </div>
      ))}
    </section>
  );

  // Second card next to the customer for types without their own fields: a
  // quick read of what the document is worth.
  const countsPieces = docType === 'DELIVERY_NOTE' || docType === 'WARRANTY';
  const summaryLabels: Partial<Record<DocType, string>> = {
    DELIVERY_NOTE: 'Items Delivered',
    WARRANTY: 'Items Covered',
    QUOTATION: 'Quoted Amount',
    PROFORMA: 'Quoted Amount',
    JOB_CARD: 'Estimated Cost',
    CREDIT_NOTE: 'Credit Amount',
  };
  const summaryCard = (
    <div className="flex flex-col justify-between rounded-xl bg-neutral-900 p-4 text-white">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
        {summaryLabels[docType] ?? (isPaid ? 'Amount Received' : 'Amount Due')}
      </div>
      <div className="mt-2 text-2xl font-black tracking-tight">
        {countsPieces ? `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` : money(grandTotal)}
      </div>
      <div className="mt-1 text-[11px] text-neutral-400">
        {items.length} {items.length === 1 ? 'line' : 'lines'}
      </div>
    </div>
  );

  return (
    <div className="receipt-shell mx-auto max-w-4xl space-y-4 px-4 py-8">
      <style>{PRINT_CSS}</style>

      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Link
          href={initial.orderId ? `/admin/orders/${initial.orderId}` : '/admin/receipts'}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          {initial.orderId ? 'Back to Order' : 'Back to Receipts'}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleImportFile} className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isImporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileUp className="h-3.5 w-3.5" />}
            Import from PDF
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : justSaved ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            {justSaved ? 'Saved' : 'Save to System'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
          >
            <Printer className="h-3.5 w-3.5" />
            Export to PDF / Print
          </button>
        </div>
      </div>

      {saveError && (
        <div className="no-print rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {saveError}
        </div>
      )}
      {importError && (
        <div className="no-print rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {importError}
        </div>
      )}

      <div className="no-print space-y-2 rounded-2xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
        {GROUPS.map((group) => (
          <div key={group} className="flex flex-wrap items-center gap-2">
            <span className="w-16 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{group}</span>
            {DOC_TYPES.filter((d) => d.group === group).map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setDocType(d.key);
                  setJustSaved(false);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  docType === d.key
                    ? 'bg-amber-500 text-black'
                    : 'border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="receipt-scroll overflow-x-auto pb-2">
        {/* The printable page: always white and black, whatever the admin's
            dark mode, because a printed receipt shouldn't come out dark. */}
        <article className="receipt-paper relative mx-auto flex min-w-[680px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-xl shadow-black/5 dark:border-neutral-800">
          <div className="flex h-2.5 shrink-0">
            <div className="w-1/3 bg-amber-500" />
            <div className="flex-1 bg-neutral-900" />
          </div>

          <div className="flex flex-1 flex-col px-10 pb-5 pt-6">
            {/* Header: business on the left, document title and number on the right. */}
            <header className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element -- plain HTML/print document, not a Next.js route (no optimization needed here) */}
                  <img src="/logo-mark.png" alt="" width={122} height={68} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-black leading-none tracking-tight">{shopProfile.businessName}</div>
                  {shopProfile.tagline && (
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">{shopProfile.tagline}</div>
                  )}
                  <div className="mt-2 space-y-0.5 text-[11px] leading-snug text-neutral-600">
                    {shopProfile.address && <div>{shopProfile.address}</div>}
                    {contactLine && <div>{contactLine}</div>}
                    {webLine && <div>{webLine}</div>}
                    {socials && <div>{socials}</div>}
                    {shopProfile.tinNumber && <div className="font-semibold text-neutral-800">TIN: {shopProfile.tinNumber}</div>}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-3xl font-black uppercase leading-none tracking-tight">{config.label}</div>
                <div className="mt-3 inline-block rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-left text-[11px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-500">No.</span>
                    <span className="font-black">{documentNumber(config.prefix, reference)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-neutral-500">Date:</span>
                    <span className="flex items-center gap-1">
                      <input
                        type="date"
                        value={documentDate}
                        onChange={(e) => changed(setDocumentDate)(e.target.value)}
                        className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 text-[11px] font-semibold"
                      />
                      <input
                        type="time"
                        value={documentTime}
                        onChange={(e) => changed(setDocumentTime)(e.target.value)}
                        className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 text-[11px]"
                      />
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-4">
                    <span className="text-neutral-500">Ref:</span>
                    <span className="font-mono text-[10px]">{reference}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Customer, plus either this type's own fields or a summary. */}
            <section className={`mt-5 grid gap-4 ${config.partyLabel ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {config.partyLabel && (
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">{config.partyLabel}</div>
                  <input
                    value={customerName}
                    onChange={(e) => changed(setCustomerName)(e.target.value)}
                    className={`${fieldClass} text-sm font-bold`}
                    placeholder={docType === 'PAYMENT_VOUCHER' ? 'Supplier or person paid' : 'Customer name'}
                  />
                  <input
                    value={customerPhone}
                    onChange={(e) => changed(setCustomerPhone)(e.target.value)}
                    className={`${fieldClass} mt-1 text-xs`}
                    placeholder="Phone"
                  />
                  <input
                    value={customerEmail}
                    onChange={(e) => changed(setCustomerEmail)(e.target.value)}
                    className={`${fieldClass} mt-1 text-xs`}
                    placeholder="Email (optional)"
                  />
                  {docType === 'DELIVERY_NOTE' && (
                    <>
                      <div className="mb-1 mt-3 text-[9px] font-bold uppercase tracking-widest text-neutral-500">Delivery Address</div>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => changed(setDeliveryAddress)(e.target.value)}
                        rows={2}
                        className={`${fieldClass} screen-only resize-y text-xs`}
                        placeholder="Enter the delivery address..."
                      />
                      <span className="print-only hidden whitespace-pre-wrap text-xs">{deliveryAddress}</span>
                    </>
                  )}
                </div>
              )}
              {config.partyLabel && (config.extras.length > 0 ? extrasCard : summaryCard)}
              {docType === 'PRICE_LIST' && (
                <div className="rounded-xl bg-neutral-900 px-5 py-4 text-white">
                  <div className="no-print mb-1 text-[9px] font-bold uppercase tracking-widest text-amber-400">Price List Title</div>
                  <input
                    value={extra.listTitle ?? ''}
                    onChange={(e) => setExtra('listTitle', e.target.value)}
                    placeholder="Screen Replacement Prices"
                    className="receipt-field w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-2xl font-black tracking-tight text-white outline-none focus:border-amber-500"
                  />
                  <div className="mt-1 text-[11px] text-neutral-400">Prices as of {longDate(documentDate)}</div>
                </div>
              )}
            </section>
            {longExtrasRow}

            <div className="no-print mt-6">
              <ProductPicker onSelect={addProduct} />
            </div>

            {/* Line items. */}
            <table className="mt-4 w-full overflow-hidden rounded-xl text-left text-xs">
              <thead>
                <tr className="bg-neutral-900 text-[10px] uppercase tracking-wider text-white">
                  <th className="rounded-l-lg px-3 py-2.5 font-bold">Item</th>
                  {config.showQty && <th className="px-3 py-2.5 text-right font-bold">Qty</th>}
                  {config.showPrices && <th className="px-3 py-2.5 text-right font-bold">{config.showQty ? 'Unit Price' : 'Price'}</th>}
                  {config.showPrices && config.showQty && <th className="rounded-r-lg px-3 py-2.5 text-right font-bold">Total</th>}
                  <th className="no-print w-8"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-neutral-200 even:bg-neutral-50">
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-start gap-1.5">
                        <input
                          value={item.title}
                          onChange={(e) => updateItem(i, { title: e.target.value })}
                          className={`${fieldClass} font-semibold`}
                          placeholder="Item name"
                        />
                        <button
                          type="button"
                          onClick={() => togglePhone(i)}
                          title={item.isPhone ? 'Not a phone' : 'Mark as phone'}
                          className={`no-print flex shrink-0 items-center gap-1 rounded border px-1.5 py-1 text-[10px] font-bold transition-colors ${
                            item.isPhone
                              ? 'border-amber-500/50 bg-amber-500/10 text-amber-600'
                              : 'border-neutral-300 text-neutral-400 hover:border-amber-500/40 hover:text-amber-500'
                          }`}
                        >
                          {item.isPhone ? <X className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
                        </button>
                      </div>

                      {item.isPhone && (
                        <div className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-1.5 rounded-lg border border-dashed border-neutral-300 bg-white/60 p-2">
                          <label className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.brand ? '' : 'print:hidden'}`}>
                            Brand
                            <input
                              list={`receipt-brands-${i}`}
                              value={item.brand ?? ''}
                              onChange={(e) => updateItem(i, { brand: e.target.value })}
                              className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                              placeholder="Samsung"
                            />
                            <datalist id={`receipt-brands-${i}`}>
                              {PRODUCT_BRANDS.map((b) => (
                                <option key={b} value={b} />
                              ))}
                            </datalist>
                          </label>
                          <label className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.color ? '' : 'print:hidden'}`}>
                            Color
                            <input
                              list={`receipt-colors-${i}`}
                              value={item.color ?? ''}
                              onChange={(e) => updateItem(i, { color: e.target.value })}
                              className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                              placeholder="Black"
                            />
                            <datalist id={`receipt-colors-${i}`}>
                              {COLOR_OPTIONS.map((c) => (
                                <option key={c} value={c} />
                              ))}
                            </datalist>
                          </label>
                          <label className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.storage ? '' : 'print:hidden'}`}>
                            Storage
                            <input
                              list={`receipt-storage-${i}`}
                              value={item.storage ?? ''}
                              onChange={(e) => updateItem(i, { storage: e.target.value })}
                              className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                              placeholder="128GB"
                            />
                            <datalist id={`receipt-storage-${i}`}>
                              {STORAGE_OPTIONS.map((s) => (
                                <option key={s} value={s} />
                              ))}
                            </datalist>
                          </label>
                          <label className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.serialNumber ? '' : 'print:hidden'}`}>
                            Serial Number
                            <input
                              value={item.serialNumber ?? ''}
                              onChange={(e) => updateItem(i, { serialNumber: e.target.value })}
                              className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 font-mono text-[11px] font-normal normal-case text-black"
                              placeholder="S/N"
                            />
                          </label>
                          <label className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.imei ? '' : 'print:hidden'}`}>
                            IMEI
                            <input
                              value={item.imei ?? ''}
                              onChange={(e) => updateItem(i, { imei: e.target.value })}
                              className="receipt-field rounded border border-neutral-300 bg-white px-1 py-0.5 font-mono text-[11px] font-normal normal-case text-black"
                              placeholder="356938035643809"
                            />
                          </label>
                          <div className={`flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 ${item.condition ? '' : 'print:hidden'}`}>
                            Condition
                            <button
                              type="button"
                              onClick={() =>
                                updateItem(i, {
                                  condition: item.condition === PHONE_CONDITIONS[1] ? PHONE_CONDITIONS[0] : PHONE_CONDITIONS[1],
                                })
                              }
                              className="no-print w-fit rounded border border-neutral-300 bg-white px-1.5 py-0.5 text-[10px] font-bold normal-case text-black hover:border-amber-500/50"
                            >
                              {item.condition || 'Set Condition'}
                            </button>
                            {item.condition && (
                              <span className="hidden text-[11px] font-normal normal-case text-black print:inline">
                                {item.condition}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    {config.showQty && (
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                          className={`${fieldClass} w-16 text-right`}
                        />
                      </td>
                    )}
                    {config.showPrices && (
                      <td className="px-3 py-2 align-top">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={item.price}
                          onChange={(e) => updateItem(i, { price: Number(e.target.value) })}
                          className={`${fieldClass} screen-only w-28 text-right`}
                        />
                        <span className="print-only hidden whitespace-nowrap text-right">{money(item.price)}</span>
                      </td>
                    )}
                    {config.showPrices && config.showQty && (
                      <td className="whitespace-nowrap px-3 py-2 text-right align-top font-bold">
                        {money(item.price * item.quantity)}
                      </td>
                    )}
                    <td className="no-print py-2 pl-1 align-top">
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        aria-label="Remove item"
                        className="rounded p-1 text-neutral-400 hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={addItem}
              className="no-print mt-2 flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-500 hover:border-amber-500/40 hover:text-amber-500"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Item
            </button>

            {/* Totals, with a PAID / UNPAID stamp beside them. */}
            {config.showTotals && (
              <section className="receipt-keep mt-5 flex items-end justify-between gap-6">
                <div className="pb-2 pl-2">
                  {config.stamp && (
                    <div
                      className={`inline-block -rotate-6 select-none rounded-lg border-[3px] px-4 py-1 text-2xl font-black uppercase tracking-[0.2em] ${
                        isPaid ? 'border-emerald-600 text-emerald-600' : 'border-red-500 text-red-500'
                      }`}
                    >
                      {isRefund ? (isPaid ? 'Refunded' : 'Pending') : isPaid ? 'Paid' : 'Unpaid'}
                    </div>
                  )}
                </div>
                <div className="w-72 overflow-hidden rounded-xl border border-neutral-200 text-xs">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold">{money(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-neutral-200 px-4 py-2">
                    <span className="text-neutral-600">Discount</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={discountAmount}
                      onChange={(e) => changed(setDiscountAmount)(Number(e.target.value))}
                      className="receipt-field screen-only w-24 rounded border border-neutral-300 bg-white px-1.5 py-0.5 text-right font-semibold"
                    />
                    <span className="print-only hidden font-semibold">{discountAmount > 0 ? `- ${money(discountAmount)}` : money(0)}</span>
                  </div>
                  <div className="flex items-center justify-between bg-amber-500 px-4 py-3 text-sm font-black text-black">
                    <span>{config.totalLabel}</span>
                    <span>{money(grandTotal)}</span>
                  </div>
                  {docType === 'JOB_CARD' && (
                    <>
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-neutral-600">Deposit paid</span>
                        <span className="font-semibold">{money(deposit)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 text-sm font-black">
                        <span>Balance due</span>
                        <span>{money(Math.max(0, grandTotal - deposit))}</span>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Payment (or refund) line. Kept as one line starting with the
                status: the PDF import reads it as "PAID via <method>". */}
            {config.payment !== 'none' && (
              <section className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => changed(setPaymentStatus)(isPaid ? 'PENDING' : 'SUCCESSFUL')}
                  className={`no-print rounded-md px-2 py-0.5 font-black uppercase tracking-wide ${
                    isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {isRefund ? (isPaid ? 'Refunded' : 'Refund Pending') : isPaid ? 'Paid' : 'Payment Pending'} (click to toggle)
                </button>
                <span
                  className={`hidden rounded-md px-2 py-0.5 font-black uppercase tracking-wide print:inline ${
                    isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {isRefund ? (isPaid ? 'Refunded' : 'Refund Pending') : isPaid ? 'Paid' : 'Payment Pending'}
                </span>
                <span className="text-neutral-500">via</span>
                <input
                  value={paymentMethod}
                  onChange={(e) => changed(setPaymentMethod)(e.target.value)}
                  className="receipt-field w-36 rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-semibold"
                  placeholder="Cash, Mobile Money..."
                />
                <span className={`text-neutral-500 ${paymentReference ? '' : 'print:hidden'}`}>Ref no.</span>
                <input
                  value={paymentReference}
                  onChange={(e) => changed(setPaymentReference)(e.target.value)}
                  className="receipt-field w-40 rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-mono text-[11px]"
                  placeholder="Ref (optional)"
                />
              </section>
            )}

            {config.signatures.length > 0 && (
              <section
                className="receipt-keep mt-6 grid gap-8 text-[10px]"
                style={{ gridTemplateColumns: `repeat(${config.signatures.length}, minmax(0, 1fr))` }}
              >
                {config.signatures.map((label) => (
                  <div key={label}>
                    <div className="h-8 border-b border-neutral-400" />
                    <div className="mt-1.5 font-semibold uppercase tracking-wide text-neutral-500">{label}</div>
                  </div>
                ))}
              </section>
            )}

            <section className={`receipt-keep mt-4 rounded-xl border-l-4 border-amber-500 bg-neutral-50 px-4 py-3 ${notesByType[docType].trim() ? '' : 'print:hidden'}`}>
              <div className="no-print mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">Notes &amp; Terms</div>
              <textarea
                value={notesByType[docType]}
                onChange={(e) => {
                  setNotesByType((prev) => ({ ...prev, [docType]: e.target.value }));
                  setJustSaved(false);
                }}
                rows={2}
                className={`${fieldClass} screen-only resize-y text-[11px] text-neutral-700`}
                placeholder="Notes / terms (optional)"
              />
              <p className="print-only hidden whitespace-pre-wrap text-[11px] leading-relaxed text-neutral-700">{notesByType[docType]}</p>
            </section>

            <footer className="receipt-keep mt-auto flex items-end justify-between gap-4 pt-4 text-[10px] text-neutral-500">
              <div>
                <div className="font-bold text-neutral-800">Thank you for your business.</div>
                <div>{[shopProfile.website, shopProfile.whatsapp && `WhatsApp ${shopProfile.whatsapp}`].filter(Boolean).join('  ·  ')}</div>
              </div>
              <div className="text-right font-mono text-[9px] text-neutral-400">
                {documentNumber(config.prefix, reference)}
              </div>
            </footer>
          </div>

          <div className="flex h-2.5 shrink-0">
            <div className="flex-1 bg-neutral-900" />
            <div className="w-1/3 bg-amber-500" />
          </div>
        </article>
      </div>
    </div>
  );
}
