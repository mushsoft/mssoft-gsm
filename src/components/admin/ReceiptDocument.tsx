'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

type OrderData = {
  id: string;
  txRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  discountAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentReference: string | null;
  createdAt: string;
  items: { title: string; quantity: number; price: number }[];
};

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

type DocType = 'INVOICE' | 'RECEIPT' | 'DELIVERY_NOTE' | 'QUOTATION';

const DOC_TYPES: { key: DocType; label: string; prefix: string; showPrices: boolean; defaultNotes: string }[] = [
  {
    key: 'INVOICE',
    label: 'Invoice',
    prefix: 'INV',
    showPrices: true,
    defaultNotes: 'Payment due upon receipt. Thank you for your business!',
  },
  {
    key: 'RECEIPT',
    label: 'Sales Receipt',
    prefix: 'RCT',
    showPrices: true,
    defaultNotes: 'Thank you for shopping with us!',
  },
  {
    key: 'DELIVERY_NOTE',
    label: 'Delivery Note',
    prefix: 'DN',
    showPrices: false,
    defaultNotes: '',
  },
  {
    key: 'QUOTATION',
    label: 'Quotation',
    prefix: 'QT',
    showPrices: true,
    defaultNotes: 'This quotation is valid for 7 days from the date above. Prices are subject to change thereafter.',
  },
];

function documentNumber(prefix: string, txRef: string): string {
  const short = txRef.replace(/^PH-/, '').replace(/-/g, '').slice(0, 8).toUpperCase();
  return `${prefix}-${short}`;
}

export default function ReceiptDocument({ order, shopProfile }: { order: OrderData; shopProfile: ShopProfileData }) {
  const [docType, setDocType] = useState<DocType>('INVOICE');
  const config = DOC_TYPES.find((d) => d.key === docType)!;

  const [customerName, setCustomerName] = useState(order.customerName);
  const [customerPhone, setCustomerPhone] = useState(order.customerPhone);
  const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [documentDate, setDocumentDate] = useState(() => new Date(order.createdAt).toISOString().slice(0, 10));
  // Per-type so switching tabs doesn't lose edits made on another tab.
  const [notesByType, setNotesByType] = useState<Record<DocType, string>>(() =>
    Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.defaultNotes])) as Record<DocType, string>
  );

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const socials = [
    shopProfile.tiktok && `TikTok: ${shopProfile.tiktok}`,
    shopProfile.instagram && `Instagram: ${shopProfile.instagram}`,
    shopProfile.facebook && `Facebook: ${shopProfile.facebook}`,
  ].filter(Boolean);

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
        }
      `}</style>

      <div className="no-print flex items-center justify-between gap-3">
        <Link
          href={`/admin/orders/${order.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Order
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Printer className="h-3.5 w-3.5" />
          Print / Save as PDF
        </button>
      </div>

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
          <div className="text-right">
            <div className="text-lg font-black uppercase tracking-wide">{config.label}</div>
            <div className="mt-1 text-xs text-neutral-700">
              <div>No. {documentNumber(config.prefix, order.txRef)}</div>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                <span>Date:</span>
                <input
                  type="date"
                  value={documentDate}
                  onChange={(e) => setDocumentDate(e.target.value)}
                  className="receipt-field rounded border border-neutral-300 px-1 py-0.5 text-xs"
                />
              </div>
              <div className="mt-1 font-mono">Order Ref: {order.txRef}</div>
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
              onChange={(e) => setCustomerName(e.target.value)}
              className="receipt-field w-full rounded border border-neutral-300 px-2 py-1 text-sm font-bold"
              placeholder="Customer name"
            />
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="receipt-field mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-xs"
              placeholder="Phone"
            />
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
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
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
                className="receipt-field w-full resize-none rounded border border-neutral-300 px-2 py-1 text-xs"
                placeholder="Enter the delivery address..."
              />
            </div>
          )}
        </div>

        <table className="mt-6 w-full text-left text-xs">
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
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-neutral-200">
                <td className="py-1.5">{item.title}</td>
                <td className="py-1.5 text-right">{item.quantity}</td>
                {config.showPrices && (
                  <>
                    <td className="py-1.5 text-right">UGX {item.price.toLocaleString()}</td>
                    <td className="py-1.5 text-right">UGX {(item.price * item.quantity).toLocaleString()}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {config.showPrices && (
          <div className="mt-3 flex justify-end">
            <div className="w-full max-w-[220px] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>UGX {subtotal.toLocaleString()}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">Discount</span>
                  <span>-UGX {order.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t-2 border-black pt-1 text-sm font-black">
                <span>Total</span>
                <span>UGX {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {(docType === 'INVOICE' || docType === 'RECEIPT') && (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={`rounded-md px-2 py-0.5 font-black uppercase tracking-wide ${
                order.paymentStatus === 'SUCCESSFUL'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {order.paymentStatus === 'SUCCESSFUL' ? 'Paid' : 'Payment Pending'}
            </span>
            <span className="text-neutral-600">via {order.paymentMethod.replace('_', ' ')}</span>
            {order.paymentReference && <span className="font-mono text-neutral-500">({order.paymentReference})</span>}
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
            onChange={(e) => setNotesByType((prev) => ({ ...prev, [docType]: e.target.value }))}
            rows={2}
            className="receipt-field w-full resize-none rounded border border-neutral-300 px-2 py-1 text-[11px] text-neutral-600"
            placeholder="Notes / terms (optional)"
          />
        </div>
      </div>
    </div>
  );
}
