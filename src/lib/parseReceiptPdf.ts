// Import the internal lib file directly, NOT the package root: pdf-parse's
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

// The printed title of each type, in capitals ("SALES RECEIPT", "REPAIR JOB CARD"...).
const DOC_TYPE_LABELS = Object.fromEntries(DOC_TYPES.map((d) => [d.key, d.label.toUpperCase()])) as Record<DocType, string>;

// Headings over the customer block, for every type that has one.
const PARTY_HEADINGS = new Set(DOC_TYPES.map((d) => d.partyLabel?.toUpperCase()).filter(Boolean) as string[]);

// Signature line labels, which print between the totals and the notes.
const SIGNATURE_LABELS = [...new Set(DOC_TYPES.flatMap((d) => d.signatures.map((s) => s.toUpperCase())))];

// Labels of the phone details box under a phone line item; each is followed
// by its value on the next line.
const PHONE_DETAIL_LABELS = new Set(['BRAND', 'COLOR', 'STORAGE', 'SERIAL NUMBER', 'IMEI', 'CONDITION']);

const PAYMENT_STATUS = /^(PAID|PAYMENT PENDING|REFUNDED|REFUND PENDING)\s*via\s*/i;

function toNumber(raw: string): number {
  return Number(raw.replace(/[^\d.]/g, '')) || 0;
}

// Splits "<name><qty>" where the quantity is the trailing digits. A name
// can end in digits too ("Power bank 20000"), so when a price and total are
// known, the shortest trailing run with qty x price = total wins.
function splitQuantity(head: string, price?: number, total?: number): { title: string; quantity: number } {
  const digits = head.match(/(\d+)$/)?.[1] ?? '';
  if (!digits) return { title: head.trim(), quantity: 1 };
  let length = 1;
  if (price !== undefined && total !== undefined) {
    for (let len = 1; len <= digits.length; len++) {
      const q = Number(digits.slice(-len));
      if (q > 0 && q * price === total) {
        length = len;
        break;
      }
    }
  }
  return { title: head.slice(0, head.length - length).trim(), quantity: Number(digits.slice(-length)) || 1 };
}

/**
 * Best-effort reconstruction of a receipt from the PDF this app itself
 * generates (ReceiptDocument's print output), not a general invoice/OCR
 * parser. Relies on the labels our own template prints ("BILL TO", "Ref:",
 * "ITEM QTY UNIT PRICE TOTAL", "PAID via ...", the footer line), so it only
 * reliably round-trips a PDF exported from this same system. Anything it
 * can't confidently find is left blank for the admin to fill in: this is
 * meant to save re-typing, not to be trusted blindly.
 *
 * Chrome's print-to-PDF text layer drops whitespace between adjacent table
 * cells, so an item row comes out as one run like
 * "Screen Assembly2UGX 45,000UGX 90,000" (name, qty, unit price, total).
 * A phone item prints its name on one line, then its details box
 * (BRAND / Samsung / IMEI / ...), then the qty and prices.
 */
export async function parseReceiptPdf(buffer: Buffer): Promise<ParsedReceipt> {
  const result = await pdfParse(buffer);
  const text = result.text.replace(/\r\n/g, '\n');
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // Longest titles first, so "PROFORMA INVOICE" isn't read as "INVOICE".
  let docType: DocType = 'INVOICE';
  const byLength = [...DOC_TYPES].sort((a, b) => DOC_TYPE_LABELS[b.key].length - DOC_TYPE_LABELS[a.key].length);
  for (const d of byLength) {
    if (lines.some((l) => l.toUpperCase() === DOC_TYPE_LABELS[d.key])) {
      docType = d.key;
      break;
    }
  }

  const refMatch = text.match(/Ref:\s*(\S+)/i);
  const reference = refMatch ? refMatch[1] : `IMPORTED-${Date.now().toString(36).toUpperCase()}`;

  const dateMatch = text.match(/Date:\s*(\d{2})\/(\d{2})\/(\d{4})/);
  const documentDate = dateMatch ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}` : new Date().toISOString().slice(0, 10);

  // The customer heading ("BILL TO", "CUSTOMER", ...) is followed by name,
  // then phone, then email (or nothing, when those fields were blank).
  let customerName = '';
  let customerPhone = '';
  let customerEmail = '';
  const billToIndex = lines.findIndex((l) => PARTY_HEADINGS.has(l.toUpperCase()));
  if (billToIndex !== -1) {
    customerName = lines[billToIndex + 1] ?? '';
    const maybePhone = lines[billToIndex + 2] ?? '';
    const maybeEmail = lines[billToIndex + 3] ?? '';
    customerPhone = /^\+?\d[\d\s-]{5,}$/.test(maybePhone) ? maybePhone : '';
    customerEmail = /@/.test(maybeEmail) ? maybeEmail : '';
  }

  // Item rows run from the table header to the totals, the signature lines
  // or the payment line, whichever comes first.
  const subtotalIndex = lines.findIndex((l) => /^Subtotal/i.test(l));
  const signatureIndex = lines.findIndex((l) => SIGNATURE_LABELS.some((s) => l.toUpperCase().startsWith(s)));
  const paymentIndex = lines.findIndex((l) => PAYMENT_STATUS.test(l));
  const footerIndex = lines.findIndex((l) => /^Thank you for your business\./i.test(l));
  const headerIndex = lines.findIndex((l) => /^ITEM\s*(QTY|PRICE)/i.test(l));
  const itemsEndCandidates = [subtotalIndex, signatureIndex, paymentIndex, footerIndex].filter((i) => i > headerIndex);
  const itemsEnd = itemsEndCandidates.length ? Math.min(...itemsEndCandidates) : lines.length;

  const items: { title: string; quantity: number; price: number }[] = [];
  let lastItemLineIndex = -1;
  if (headerIndex !== -1) {
    const priceOnlyList = /^ITEM\s*PRICE$/i.test(lines[headerIndex]); // price list: no qty column
    let pendingTitle = ''; // a phone's name, printed on its own line above its details
    const pushItem = (item: { title: string; quantity: number; price: number }, rowIndex: number) => {
      items.push(item);
      lastItemLineIndex = headerIndex + 1 + rowIndex;
      pendingTitle = '';
    };
    const rows = lines.slice(headerIndex + 1, itemsEnd);
    for (let i = 0; i < rows.length; i++) {
      const line = rows[i];
      if (PHONE_DETAIL_LABELS.has(line.toUpperCase())) {
        i++; // skip the label and its value
        continue;
      }
      const titleOr = (title: string) => (title || pendingTitle).trim();

      const priced = line.match(/^(.*?)UGX\s*([\d,]+)\s*UGX\s*([\d,]+)$/i);
      if (priced) {
        const price = toNumber(priced[2]);
        const split = splitQuantity(priced[1], price, toNumber(priced[3]));
        pushItem({ title: titleOr(split.title), quantity: split.quantity, price }, i);
        continue;
      }
      const single = line.match(/^(.*?)UGX\s*([\d,]+)$/i);
      if (single) {
        // Price list "<name>UGX <price>", or an older layout "<name><qty><price>UGX <total>".
        if (priceOnlyList) {
          pushItem({ title: titleOr(single[1]), quantity: 1, price: toNumber(single[2]) }, i);
        } else {
          const total = toNumber(single[2]);
          const digits = single[1].match(/(\d+)$/)?.[1] ?? '';
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
          pushItem({ title: titleOr(single[1].slice(0, single[1].length - digits.length)), quantity, price }, i);
        }
        continue;
      }
      // No prices (delivery note, warranty card): "<name><qty>", or just "<qty>" under a phone name.
      if (/^\d{1,4}$/.test(line) && pendingTitle) {
        pushItem({ title: pendingTitle, quantity: Number(line), price: 0 }, i);
        continue;
      }
      const qtyOnly = line.match(/^(.*\D)(\d+)$/);
      if (qtyOnly) {
        const split = splitQuantity(line);
        pushItem({ title: titleOr(split.title), quantity: split.quantity, price: 0 }, i);
        continue;
      }
      pendingTitle = line;
    }
  }

  const discountMatch = text.match(/Discount\s*-?\s*(?:UGX\s*)?([\d,]+)/i);
  const discountAmount = discountMatch ? toNumber(discountMatch[1]) : 0;

  // "PAID via Mobile Money Ref no. MP24..." (or "REFUNDED via ..."). The big
  // PAID / UNPAID stamp is a separate line and isn't mistaken for it.
  const paymentLine = paymentIndex !== -1 ? lines[paymentIndex] : '';
  const statusMatch = paymentLine.match(PAYMENT_STATUS);
  const paymentStatus: 'PENDING' | 'SUCCESSFUL' =
    statusMatch && /^(PAID|REFUNDED)$/i.test(statusMatch[1]) ? 'SUCCESSFUL' : 'PENDING';
  const [methodPart, refPart] = paymentLine.replace(PAYMENT_STATUS, '').split(/Ref no\.\s*/i);
  const paymentMethod = (methodPart ?? '').trim() || 'Cash';
  // A long line wraps: "Ref no. MP24..." or just the "MP24..." value can land
  // on the next line.
  const nextLine = lines[paymentIndex + 1] ?? '';
  const nextLineRef =
    nextLine.match(/^Ref no\.\s*(\S+)$/i)?.[1] ??
    (refPart !== undefined && !refPart.trim() && /^[A-Za-z0-9-]+$/.test(nextLine) ? nextLine : '');
  const paymentReference = (refPart ?? '').trim() || (paymentIndex !== -1 ? nextLineRef : '');

  // Notes sit after the payment line (or the totals / signatures when there
  // is none) and end at the printed footer.
  const totalIndex = lines.findIndex((l, i) => i > subtotalIndex && subtotalIndex !== -1 && /^(Total|Estimated Total|Credit Amount|Amount Paid)/i.test(l));
  const lastSignatureIndex = lines.reduce(
    (last, l, i) => (SIGNATURE_LABELS.some((s) => l.toUpperCase().includes(s)) ? i : last),
    -1
  );
  const balanceIndex = lines.findIndex((l) => /^Balance due/i.test(l));
  const refLineIndex = paymentIndex !== -1 && nextLineRef && !(refPart ?? '').trim() ? paymentIndex + 1 : -1;
  const notesStart =
    Math.max(paymentIndex, refLineIndex, totalIndex, balanceIndex, lastSignatureIndex, lastItemLineIndex, headerIndex) + 1;
  const notesEnd = footerIndex >= notesStart ? footerIndex : lines.length;
  const notes = lines
    .slice(notesStart, notesEnd)
    .map((l) => SIGNATURE_LABELS.reduce((acc, s) => acc.replace(new RegExp(s.replace(/[()&]/g, '\\$&'), 'gi'), ''), l).trim())
    .filter(Boolean)
    .join(' ')
    .trim();

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
