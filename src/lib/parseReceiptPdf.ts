// Import the internal lib file directly, NOT the package root — pdf-parse's
// index.js runs a `!module.parent` debug-mode check at import time that
// reads a bundled test fixture (test/data/05-versions-space.pdf); bundlers
// (Turbopack/webpack) don't preserve `module.parent`, so that check trips
// true in any bundled build and crashes with ENOENT for a file that isn't
// deployed. lib/pdf-parse.js is the actual implementation, with none of that.
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { DOC_TYPES, type DocType } from './receiptDocTypes';

export interface ParsedReceipt {
  docType: DocType;
  reference: string;
  documentDate: string; // YYYY-MM-DD, best-effort
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: { title: string; quantity: number; price: number }[];
  discountAmount: number;
  paymentStatus: 'PENDING' | 'SUCCESSFUL';
  paymentMethod: string;
  paymentReference: string;
  notes: string;
}

const DOC_TYPE_LABELS: Record<DocType, string> = {
  INVOICE: 'INVOICE',
  RECEIPT: 'SALES RECEIPT',
  DELIVERY_NOTE: 'DELIVERY NOTE',
  QUOTATION: 'QUOTATION',
};

function toNumber(raw: string): number {
  return Number(raw.replace(/[^\d.]/g, '')) || 0;
}

/**
 * Best-effort reconstruction of a receipt from the PDF this app itself
 * generates (ReceiptDocument's print output) — not a general invoice/OCR
 * parser. Relies on the exact labels/layout our own template uses ("BILL
 * TO", "Ref:", "ITEM QTY UNIT PRICE TOTAL", etc.), so it only reliably
 * round-trips a PDF that was exported from this same system. Anything it
 * can't confidently find is left blank for the admin to fill in — this is
 * meant to save re-typing, not to be trusted blindly.
 *
 * Chrome's print-to-PDF text layer drops whitespace between adjacent table
 * cells that have no literal space character between them (padding/margin
 * only), so a row like "Screen Assembly | 2 | 45000 | UGX 90,000" comes out
 * as "Screen Assembly245000UGX 90,000". Quantity and unit price end up as
 * one undivided digit run; the only way to split it correctly is to try
 * each split point and keep the one whose qty * price equals the row's own
 * total (which IS delimited, by the literal "UGX").
 */
export async function parseReceiptPdf(buffer: Buffer): Promise<ParsedReceipt> {
  const result = await pdfParse(buffer);
  const text = result.text.replace(/\r\n/g, '\n');
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  let docType: DocType = 'INVOICE';
  for (const d of DOC_TYPES) {
    if (lines.some((l) => l.toUpperCase() === DOC_TYPE_LABELS[d.key])) {
      docType = d.key;
      break;
    }
  }

  const refMatch = text.match(/Ref:\s*(\S+)/i);
  const reference = refMatch ? refMatch[1] : `IMPORTED-${Date.now().toString(36).toUpperCase()}`;

  const dateMatch = text.match(/Date:\s*(\d{2})\/(\d{2})\/(\d{4})/);
  const documentDate = dateMatch ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}` : new Date().toISOString().slice(0, 10);

  // "BILL TO" / "DELIVER TO" is followed by name, then phone, then email (or
  // nothing, when those fields were blank at export time).
  let customerName = '';
  let customerPhone = '';
  let customerEmail = '';
  const billToIndex = lines.findIndex((l) => /^(BILL TO|DELIVER TO)$/i.test(l));
  if (billToIndex !== -1) {
    customerName = lines[billToIndex + 1] ?? '';
    const maybePhone = lines[billToIndex + 2] ?? '';
    const maybeEmail = lines[billToIndex + 3] ?? '';
    customerPhone = /^\+?\d[\d\s-]{5,}$/.test(maybePhone) ? maybePhone : '';
    customerEmail = /@/.test(maybeEmail) ? maybeEmail : '';
  }

  // Item rows sit between the table header and whatever comes next
  // ("Subtotal" for priced doc types, the signature block for Delivery
  // Note). Invoice/Receipt/Quotation rows are "<name><qty><price>UGX
  // <total>" (no spaces between the name/qty/price cells — see note
  // above); Delivery Note rows have no price columns, just "<name><qty>".
  const subtotalIndex = lines.findIndex((l) => /^Subtotal/i.test(l));
  const totalIndex = lines.findIndex((l) => /^Total/i.test(l));
  const signatureIndex = lines.findIndex((l) => /Received by/i.test(l));
  const itemsEndCandidates = [subtotalIndex, signatureIndex, totalIndex].filter((i) => i !== -1);
  const itemsEnd = itemsEndCandidates.length ? Math.min(...itemsEndCandidates) : lines.length;

  const items: { title: string; quantity: number; price: number }[] = [];
  const headerIndex = lines.findIndex((l) => /^ITEM\s*QTY/i.test(l));
  if (headerIndex !== -1) {
    for (const line of lines.slice(headerIndex + 1, itemsEnd)) {
      const withPrice = line.match(/^(.+?)(\d+)UGX\s*([\d,]+)$/i);
      if (withPrice) {
        const title = withPrice[1].trim();
        const digits = withPrice[2];
        const total = toNumber(withPrice[3]);
        let quantity = Number(digits[0]) || 1;
        let price = Number(digits.slice(1)) || total;
        for (let split = 1; split < digits.length; split++) {
          const q = Number(digits.slice(0, split));
          const p = Number(digits.slice(split));
          if (q > 0 && q * p === total) {
            quantity = q;
            price = p;
            break;
          }
        }
        items.push({ title, quantity, price });
        continue;
      }
      const qtyOnly = line.match(/^(.+?)(\d+)$/);
      if (qtyOnly) {
        items.push({ title: qtyOnly[1].trim(), quantity: toNumber(qtyOnly[2]), price: 0 });
      }
    }
  }

  const discountMatch = text.match(/Discount\s*(?:UGX\s*)?([\d,]+)/i);
  const discountAmount = discountMatch ? toNumber(discountMatch[1]) : 0;

  const paymentLineIndex = lines.findIndex((l) => /PAID|PAYMENT PENDING/i.test(l));
  const paymentLine = paymentLineIndex !== -1 ? lines[paymentLineIndex] : '';
  const paidMatch = paymentLine.match(/PAID|PAYMENT PENDING/i);
  const paymentStatus: 'PENDING' | 'SUCCESSFUL' = paidMatch && /^PAID$/i.test(paidMatch[0]) ? 'SUCCESSFUL' : 'PENDING';
  const methodMatch = paymentLine.match(/via([A-Za-z][A-Za-z\s]*)$/i);
  const paymentMethod = methodMatch ? methodMatch[1].trim() : 'Cash';

  // The reference field (Invoice/Receipt only) prints as its own line right
  // after the payment status/method line — a transaction code or phone
  // number, so always a single token with no spaces, unlike the free-text
  // notes that may follow it. Quotation/Delivery Note have no payment
  // section at all, so notes there start right after the totals ("Total")
  // or the signature block, whichever this document has.
  let paymentReference = '';
  let notesStartIndex = -1;
  if (paymentLineIndex !== -1) {
    const refCandidate = lines[paymentLineIndex + 1];
    if (refCandidate && /^[A-Za-z0-9-]+$/.test(refCandidate)) {
      paymentReference = refCandidate;
      notesStartIndex = paymentLineIndex + 2;
    } else {
      notesStartIndex = paymentLineIndex + 1;
    }
  } else if (totalIndex !== -1) {
    notesStartIndex = totalIndex + 1;
  } else if (signatureIndex !== -1) {
    notesStartIndex = signatureIndex + 1;
  }
  const notes = notesStartIndex !== -1 ? lines.slice(notesStartIndex).join(' ').trim() : '';

  return {
    docType,
    reference,
    documentDate,
    customerName,
    customerPhone,
    customerEmail,
    items,
    discountAmount,
    paymentStatus,
    paymentMethod,
    paymentReference,
    notes,
  };
}
