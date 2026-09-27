// Shared between the client ReceiptDocument component and the server pages
// that build its `initial` prop (new/[id]/order-linked). Kept in its own
// plain module — not re-exported from ReceiptDocument.tsx, which is a
// 'use client' file — so server components importing this never pull in
// any client-boundary bundling ambiguity.
export type DocType = 'INVOICE' | 'RECEIPT' | 'DELIVERY_NOTE' | 'QUOTATION';

export const DOC_TYPES: { key: DocType; label: string; prefix: string; showPrices: boolean; defaultNotes: string }[] = [
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

export function defaultNotesByType(): Record<DocType, string> {
  return Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.defaultNotes])) as Record<DocType, string>;
}
