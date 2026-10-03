'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, FileUp, Loader2, Plus, Printer, Save, Smartphone, Trash2, X } from 'lucide-react';
import ProductPicker from './ProductPicker';
import { DOC_TYPES, type DocType } from '@/lib/receiptDocTypes';
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
};

const PHONE_CONDITIONS = ['Brand New', 'UK Used'];
const COLOR_OPTIONS = ['Black', 'White', 'Blue', 'Green', 'Gold', 'Silver', 'Gray', 'Purple', 'Red', 'Pink'];

type ShopProfileData = {
  businessName: string;
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

function documentNumber(prefix: string, reference: string): string {
  const short = reference.replace(/^PH-/, '').replace(/-/g, '').slice(0, 8).toUpperCase();
  return `${prefix}-${short}`;
}

export default function ReceiptDocument({ initial, shopProfile }: { initial: ReceiptInitialData; shopProfile: ShopProfileData }) {
  const router = useRouter();
  const [receiptId, setReceiptId] = useState(initial.receiptId);
  const [docType, setDocType] = useState<DocType>(initial.docType);
  const config = DOC_TYPES.find((d) => d.key === docType)!;
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

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const socials = [
    shopProfile.tiktok && `TikTok: ${shopProfile.tiktok}`,
    shopProfile.instagram && `Instagram: ${shopProfile.instagram}`,
    shopProfile.facebook && `Facebook: ${shopProfile.facebook}`,
  ].filter(Boolean);

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
      // as a saved receipt someone printed — importing shouldn't silently
      // overwrite whatever's currently saved under the old id.
      setReceiptId(null);
      setJustSaved(false);
      setIsImporting(false);
    } catch {
      setImportError('Network error. Please try again.');
      setIsImporting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .receipt-paper { border: none !important; box-shadow: none !important; padding: 0 !important; }
          .receipt-field {
            border: none !important;
            padding: 0 !important;
            background: transparent !important;
            color: #000 !important;
          }
          .receipt-field::placeholder {
            visibility: hidden !important;
          }
        }
      `}</style>

      <div className="no-print flex items-center justify-between gap-3">
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
            Save to System
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

      <div className="no-print flex flex-wrap gap-2">
        {DOC_TYPES.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setDocType(d.key)}
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

      {/* Printable area — deliberately fixed to a white/black palette
          regardless of the admin's dark-mode preference, since a printed
          receipt shouldn't come out dark. */}
      <div className="receipt-paper rounded-2xl border border-neutral-200 bg-white p-8 text-black shadow-sm dark:border-neutral-800">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-black pb-4">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- plain HTML/print document, not a Next.js route (no optimization needed here) */}
            <img src="/logo-mark.png" alt="" width={122} height={68} className="shrink-0 object-contain" />
            <div>
              <div className="text-xl font-black">{shopProfile.businessName}</div>
              {shopProfile.address && <div className="mt-1 text-xs text-neutral-700">{shopProfile.address}</div>}
              <div className="mt-1 space-y-0.5 text-xs text-neutral-700">
                {shopProfile.phone && <div>Tel: {shopProfile.phone}</div>}
                {shopProfile.whatsapp && <div>WhatsApp: {shopProfile.whatsapp}</div>}
                {shopProfile.email && <div>{shopProfile.email}</div>}
                {shopProfile.website && <div>{shopProfile.website}</div>}
                {socials.length > 0 && <div>{socials.join(' · ')}</div>}
                {shopProfile.tinNumber && <div>TIN: {shopProfile.tinNumber}</div>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black uppercase tracking-wide">{config.label}</div>
            <div className="mt-1 text-xs text-neutral-700">
              <div>No. {documentNumber(config.prefix, reference)}</div>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                <span>Date:</span>
                <input
                  type="date"
                  value={documentDate}
                  onChange={(e) => {
                    setDocumentDate(e.target.value);
                    setJustSaved(false);
                  }}
                  className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-xs"
                />
                <input
                  type="time"
                  value={documentTime}
                  onChange={(e) => {
                    setDocumentTime(e.target.value);
                    setJustSaved(false);
                  }}
                  className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-xs"
                />
              </div>
              <div className="mt-1 font-mono">Ref: {reference}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-500">
              {docType === 'DELIVERY_NOTE' ? 'Deliver To' : 'Bill To'}
            </div>
            <input
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setJustSaved(false);
              }}
              className="receipt-field w-full rounded border border-neutral-300 px-2 py-1 text-sm font-bold"
              placeholder="Customer name"
            />
            <input
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
                setJustSaved(false);
              }}
              className="receipt-field mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-xs"
              placeholder="Phone"
            />
            <input
              value={customerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
                setJustSaved(false);
              }}
              className="receipt-field mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-xs"
              placeholder="Email"
            />
          </div>
          {docType === 'DELIVERY_NOTE' && (
            <div>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                Delivery Address
              </div>
              <textarea
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  setJustSaved(false);
                }}
                rows={3}
                className="receipt-field w-full resize-none rounded border border-neutral-300 px-2 py-1 text-xs"
                placeholder="Enter the delivery address..."
              />
            </div>
          )}
        </div>

        <div className="no-print mt-6">
          <ProductPicker onSelect={addProduct} />
        </div>

        <table className="mt-3 w-full text-left text-xs">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-1.5 font-bold uppercase">Item</th>
              <th className="py-1.5 text-right font-bold uppercase">Qty</th>
              {config.showPrices && (
                <>
                  <th className="py-1.5 text-right font-bold uppercase">Unit Price</th>
                  <th className="py-1.5 text-right font-bold uppercase">Total</th>
                </>
              )}
              <th className="no-print py-1.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-neutral-200">
                <td className="py-1.5 pr-2 align-top">
                  <div className="flex items-start gap-1.5">
                    <input
                      value={item.title}
                      onChange={(e) => updateItem(i, { title: e.target.value })}
                      className="receipt-field w-full rounded border border-neutral-300 px-1.5 py-1"
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
                    <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1.5 rounded border border-dashed border-neutral-300 p-1.5 sm:grid-cols-3">
                      <label className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        Brand
                        <input
                          list={`receipt-brands-${i}`}
                          value={item.brand ?? ''}
                          onChange={(e) => updateItem(i, { brand: e.target.value })}
                          className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                          placeholder="Samsung"
                        />
                        <datalist id={`receipt-brands-${i}`}>
                          {PRODUCT_BRANDS.map((b) => (
                            <option key={b} value={b} />
                          ))}
                        </datalist>
                      </label>
                      <label className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        Color
                        <input
                          list={`receipt-colors-${i}`}
                          value={item.color ?? ''}
                          onChange={(e) => updateItem(i, { color: e.target.value })}
                          className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                          placeholder="Black"
                        />
                        <datalist id={`receipt-colors-${i}`}>
                          {COLOR_OPTIONS.map((c) => (
                            <option key={c} value={c} />
                          ))}
                        </datalist>
                      </label>
                      <label className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        Storage
                        <input
                          list={`receipt-storage-${i}`}
                          value={item.storage ?? ''}
                          onChange={(e) => updateItem(i, { storage: e.target.value })}
                          className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-[11px] font-normal normal-case text-black"
                          placeholder="128GB"
                        />
                        <datalist id={`receipt-storage-${i}`}>
                          {STORAGE_OPTIONS.map((s) => (
                            <option key={s} value={s} />
                          ))}
                        </datalist>
                      </label>
                      <label className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        Serial Number
                        <input
                          value={item.serialNumber ?? ''}
                          onChange={(e) => updateItem(i, { serialNumber: e.target.value })}
                          className="receipt-field rounded border border-neutral-300 px-1 py-0.5 font-mono text-[11px] font-normal normal-case text-black"
                          placeholder="S/N"
                        />
                      </label>
                      <label className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        IMEI
                        <input
                          value={item.imei ?? ''}
                          onChange={(e) => updateItem(i, { imei: e.target.value })}
                          className="receipt-field rounded border border-neutral-300 px-1 py-0.5 font-mono text-[11px] font-normal normal-case text-black"
                          placeholder="356938035643809"
                        />
                      </label>
                      <div className="flex flex-col gap-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">
                        Condition
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(i, {
                              condition: item.condition === PHONE_CONDITIONS[1] ? PHONE_CONDITIONS[0] : PHONE_CONDITIONS[1],
                            })
                          }
                          className="no-print w-fit rounded border border-neutral-300 px-1.5 py-0.5 text-[10px] font-bold normal-case text-black hover:border-amber-500/50"
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
                <td className="py-1.5 pr-2">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                    className="receipt-field w-16 rounded border border-neutral-300 px-1.5 py-1 text-right"
                  />
                </td>
                {config.showPrices && (
                  <>
                    <td className="py-1.5 pr-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.price}
                        onChange={(e) => updateItem(i, { price: Number(e.target.value) })}
                        className="receipt-field w-24 rounded border border-neutral-300 px-1.5 py-1 text-right"
                      />
                    </td>
                    <td className="py-1.5 text-right">UGX {(item.price * item.quantity).toLocaleString()}</td>
                  </>
                )}
                <td className="no-print py-1.5 pl-1">
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
          className="no-print mt-2 flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-500 hover:border-amber-500/40 hover:text-amber-500"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Item
        </button>

        {config.showPrices && (
          <div className="mt-3 flex justify-end">
            <div className="w-full max-w-60 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>UGX {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-600">Discount</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(Number(e.target.value));
                    setJustSaved(false);
                  }}
                  className="receipt-field w-24 rounded border border-neutral-300 px-1.5 py-0.5 text-right"
                />
              </div>
              <div className="flex justify-between border-t-2 border-black pt-1 text-sm font-black">
                <span>Total</span>
                <span>UGX {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {(docType === 'INVOICE' || docType === 'RECEIPT') && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setPaymentStatus((s) => (s === 'SUCCESSFUL' ? 'PENDING' : 'SUCCESSFUL'));
                setJustSaved(false);
              }}
              className={`no-print rounded-md px-2 py-0.5 font-black uppercase tracking-wide ${
                paymentStatus === 'SUCCESSFUL' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {paymentStatus === 'SUCCESSFUL' ? 'Paid' : 'Payment Pending'} (click to toggle)
            </button>
            <span
              className={`hidden rounded-md px-2 py-0.5 font-black uppercase tracking-wide print:inline ${
                paymentStatus === 'SUCCESSFUL' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {paymentStatus === 'SUCCESSFUL' ? 'Paid' : 'Payment Pending'}
            </span>
            <span className="text-neutral-600">via</span>
            <input
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setJustSaved(false);
              }}
              className="receipt-field w-28 rounded border border-neutral-300 px-1.5 py-0.5"
              placeholder="Cash, Mobile Money..."
            />
            <input
              value={paymentReference}
              onChange={(e) => {
                setPaymentReference(e.target.value);
                setJustSaved(false);
              }}
              className="receipt-field w-32 rounded border border-neutral-300 px-1.5 py-0.5 font-mono text-[11px]"
              placeholder="Ref (optional)"
            />
          </div>
        )}

        {docType === 'DELIVERY_NOTE' && (
          <div className="mt-8 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="border-b border-black pb-6" />
              <div className="mt-1 text-neutral-600">Received by (name &amp; signature)</div>
            </div>
            <div>
              <div className="border-b border-black pb-6" />
              <div className="mt-1 text-neutral-600">Date</div>
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-neutral-200 pt-3">
          <textarea
            value={notesByType[docType]}
            onChange={(e) => {
              setNotesByType((prev) => ({ ...prev, [docType]: e.target.value }));
              setJustSaved(false);
            }}
            rows={2}
            className="receipt-field w-full resize-none rounded border border-neutral-300 px-2 py-1 text-[11px] text-neutral-600"
            placeholder="Notes / terms (optional)"
          />
        </div>
      </div>
    </div>
  );
}

