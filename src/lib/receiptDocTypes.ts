// Shared between the client ReceiptDocument component and the server pages
// that build its `initial` prop (new/[id]/order-linked). Kept in its own
// plain module (not re-exported from ReceiptDocument.tsx, which is a
// 'use client' file) so server components importing this never pull in
// any client-boundary bundling ambiguity.

export type DocType =
  | 'INVOICE'
  | 'RECEIPT'
  | 'PROFORMA'
  | 'QUOTATION'
  | 'DELIVERY_NOTE'
  | 'JOB_CARD'
  | 'WARRANTY'
  | 'CREDIT_NOTE'
  | 'PRICE_LIST'
  | 'PAYMENT_VOUCHER';

// A type-specific field, saved in the receipt's `extra` JSON by key.
export type ExtraField = {
  key: string;
  label: string;
  placeholder?: string;
  kind?: 'text' | 'textarea' | 'date' | 'number' | 'select';
  options?: string[];
  wide?: boolean; // spans both columns of the details grid
};

export type DocTypeConfig = {
  key: DocType;
  label: string; // printed as the document title; the PDF import matches it in capitals
  prefix: string; // document number prefix, e.g. INV-1A2B3C4D
  group: 'Sales' | 'Repairs' | 'Other';
  showPrices: boolean;
  showQty: boolean;
  showTotals: boolean;
  totalLabel: string;
  partyLabel: string | null; // heading over the customer block; null hides it (price list)
  payment: 'payment' | 'refund' | 'none';
  stamp: boolean; // big PAID / UNPAID style stamp near the totals
  extras: ExtraField[];
  extrasTitle?: string;
  signatures: string[];
  defaultNotes: string;
};

export const WARRANTY_PERIODS = ['7 days', '14 days', '30 days', '3 months', '6 months', '1 year'];

export const DOC_TYPES: DocTypeConfig[] = [
  {
    key: 'INVOICE',
    label: 'Invoice',
    prefix: 'INV',
    group: 'Sales',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Total',
    partyLabel: 'Bill To',
    payment: 'payment',
    stamp: true,
    extras: [],
    signatures: [],
    defaultNotes: 'Payment due upon receipt. Thank you for your business!',
  },
  {
    key: 'RECEIPT',
    label: 'Sales Receipt',
    prefix: 'RCT',
    group: 'Sales',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Total',
    partyLabel: 'Bill To',
    payment: 'payment',
    stamp: true,
    extras: [],
    signatures: [],
    defaultNotes: 'Thank you for shopping with us! Goods once sold are only returnable under our returns policy.',
  },
  {
    key: 'PROFORMA',
    label: 'Proforma Invoice',
    prefix: 'PI',
    group: 'Sales',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Total',
    partyLabel: 'Bill To',
    payment: 'none',
    stamp: false,
    extrasTitle: 'Offer Details',
    extras: [
      { key: 'validUntil', label: 'Valid Until', kind: 'date' },
      { key: 'deliveryTerms', label: 'Delivery', placeholder: 'Within 2 days after payment' },
    ],
    signatures: ['Authorised signature'],
    defaultNotes:
      'This is a proforma invoice, not a receipt. Goods are supplied once payment is received. Prices are valid until the date above.',
  },
  {
    key: 'QUOTATION',
    label: 'Quotation',
    prefix: 'QT',
    group: 'Sales',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Total',
    partyLabel: 'Bill To',
    payment: 'none',
    stamp: false,
    extras: [],
    signatures: [],
    defaultNotes: 'This quotation is valid for 7 days from the date above. Prices are subject to change thereafter.',
  },
  {
    key: 'DELIVERY_NOTE',
    label: 'Delivery Note',
    prefix: 'DN',
    group: 'Sales',
    showPrices: false,
    showQty: true,
    showTotals: false,
    totalLabel: 'Total',
    partyLabel: 'Deliver To',
    payment: 'none',
    stamp: false,
    extras: [],
    signatures: ['Delivered by', 'Received by (name & signature)'],
    defaultNotes: '',
  },
  {
    key: 'JOB_CARD',
    label: 'Repair Job Card',
    prefix: 'JC',
    group: 'Repairs',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Estimated Total',
    partyLabel: 'Customer',
    payment: 'none',
    stamp: false,
    extrasTitle: 'Device and Fault',
    extras: [
      { key: 'device', label: 'Phone / Device', placeholder: 'Samsung Galaxy A14' },
      { key: 'imei', label: 'IMEI / Serial', placeholder: '356938035643809' },
      { key: 'fault', label: 'Fault Reported', kind: 'textarea', wide: true, placeholder: 'Screen cracked, touch not working' },
      { key: 'condition', label: 'Condition on Arrival', kind: 'textarea', wide: true, placeholder: 'Back cracked, scratches on frame, powers on' },
      { key: 'itemsLeft', label: 'Items Left With Us', placeholder: 'Phone only / SIM / case / charger' },
      { key: 'collectionDate', label: 'Expected Collection', kind: 'date' },
      { key: 'technician', label: 'Technician', placeholder: 'Name' },
      { key: 'deposit', label: 'Deposit Paid (UGX)', kind: 'number', placeholder: '0' },
    ],
    signatures: ['Customer signature', 'Received by (shop)'],
    defaultNotes:
      'Please back up your data before repair: we are not responsible for data loss. Bring this job card when collecting. Devices not collected within 60 days of completion will attract a storage fee.',
  },
  {
    key: 'WARRANTY',
    label: 'Warranty Card',
    prefix: 'WC',
    group: 'Repairs',
    showPrices: false,
    showQty: true,
    showTotals: false,
    totalLabel: 'Total',
    partyLabel: 'Customer',
    payment: 'none',
    stamp: false,
    extrasTitle: 'Warranty',
    extras: [
      { key: 'period', label: 'Warranty Period', kind: 'select', options: WARRANTY_PERIODS },
      { key: 'covers', label: 'Covers', placeholder: 'Screen replacement / phone sale' },
      { key: 'linkedDoc', label: 'Receipt / Job Card No.', placeholder: 'RCT-1A2B3C4D' },
    ],
    signatures: ['Authorised signature'],
    defaultNotes:
      'This warranty covers faults in the item or repair listed above under normal use. It does not cover physical or liquid damage, broken seals, software problems, or repairs by anyone else. Bring this card and the item for any claim.',
  },
  {
    key: 'CREDIT_NOTE',
    label: 'Credit Note',
    prefix: 'CN',
    group: 'Other',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Credit Amount',
    partyLabel: 'Credited To',
    payment: 'refund',
    stamp: true,
    extrasTitle: 'Refund Details',
    extras: [
      { key: 'originalDoc', label: 'Original Receipt / Invoice No.', placeholder: 'RCT-1A2B3C4D' },
      { key: 'reason', label: 'Reason', kind: 'textarea', wide: true, placeholder: 'Item returned faulty within warranty' },
    ],
    signatures: ['Authorised by', 'Customer signature'],
    defaultNotes: 'This credit note confirms the refund or store credit above for the items returned.',
  },
  {
    key: 'PRICE_LIST',
    label: 'Price List',
    prefix: 'PL',
    group: 'Other',
    showPrices: true,
    showQty: false,
    showTotals: false,
    totalLabel: 'Total',
    partyLabel: null,
    payment: 'none',
    stamp: false,
    extrasTitle: 'List',
    extras: [{ key: 'listTitle', label: 'Price List Title', wide: true, placeholder: 'Screen Replacement Prices' }],
    signatures: [],
    defaultNotes: 'Prices are in UGX and may change without notice. Message us on WhatsApp to confirm stock before visiting.',
  },
  {
    key: 'PAYMENT_VOUCHER',
    label: 'Payment Voucher',
    prefix: 'PV',
    group: 'Other',
    showPrices: true,
    showQty: true,
    showTotals: true,
    totalLabel: 'Amount Paid',
    partyLabel: 'Paid To',
    payment: 'payment',
    stamp: false,
    extrasTitle: 'Voucher',
    extras: [{ key: 'purpose', label: 'Purpose', kind: 'textarea', wide: true, placeholder: 'Payment for screen stock' }],
    signatures: ['Prepared by', 'Approved by', 'Received by'],
    defaultNotes: '',
  },
];

export const DOC_TYPE_KEYS = DOC_TYPES.map((d) => d.key);

export function docTypeConfig(key: string): DocTypeConfig {
  return DOC_TYPES.find((d) => d.key === key) ?? DOC_TYPES[0];
}

export function isDocType(value: unknown): value is DocType {
  return typeof value === 'string' && (DOC_TYPE_KEYS as string[]).includes(value);
}

export function defaultNotesByType(): Record<DocType, string> {
  return Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.defaultNotes])) as Record<DocType, string>;
}

// Saved notes merged over the defaults, so new types get their default text.
export function notesByTypeFrom(stored: unknown): Record<DocType, string> {
  const saved =
    typeof stored === 'object' && stored !== null && !Array.isArray(stored) ? (stored as Record<string, unknown>) : {};
  return Object.fromEntries(
    DOC_TYPES.map((d) => [d.key, typeof saved[d.key] === 'string' ? (saved[d.key] as string) : d.defaultNotes])
  ) as Record<DocType, string>;
}

export function extraFrom(stored: unknown): Record<string, string> {
  if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) return {};
  return Object.fromEntries(
    Object.entries(stored as Record<string, unknown>).filter(([, v]) => typeof v === 'string')
  ) as Record<string, string>;
}

// "30 days" / "3 months" / "1 year" after the document date (YYYY-MM-DD).
export function warrantyEndDate(documentDate: string, period: string): Date | null {
  const match = period.match(/^(\d+)\s*(day|days|month|months|year|years)$/i);
  const start = new Date(`${documentDate}T00:00:00`);
  if (!match || Number.isNaN(start.getTime())) return null;
  const n = Number(match[1]);
  const unit = match[2].toLowerCase();
  const end = new Date(start);
  if (unit.startsWith('day')) end.setDate(end.getDate() + n);
  else if (unit.startsWith('month')) end.setMonth(end.getMonth() + n);
  else end.setFullYear(end.getFullYear() + n);
  return end;
}

// Shown in the document number, e.g. RCT-1A2B3C4D.
export function documentNumber(prefix: string, reference: string): string {
  const short = reference.replace(/^PH-/, '').replace(/-/g, '').slice(0, 8).toUpperCase();
  return `${prefix}-${short}`;
}

// Total of the line items after the discount (never below zero).
export function documentTotal(items: { quantity: number; price: number }[], discountAmount: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.max(0, subtotal - discountAmount);
}
