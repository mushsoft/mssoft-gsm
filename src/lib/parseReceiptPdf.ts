import { PDFParse } from 'pdf-parse';
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
 */
export async function parseReceiptPdf(buffer: Buffer): Promise<ParsedReceipt> {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
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
  // the literal placeholder "Email" when it was blank at export time).
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

  // Item rows sit between the table header and "Subtotal". Invoice/Receipt/
  // Quotation rows are "<name> <qty> <price> UGX <total>"; Delivery Note
  // rows have no price columns, just "<name> <qty>".
  const items: { title: string; quantity: number; price: number }[] = [];
  const headerIndex = lines.findIndex((l) => /^ITEM\s+QTY/i.test(l));
  const subtotalIndex = lines.findIndex((l) => /^Subtotal/i.test(l));
  if (headerIndex !== -1) {
    const end = subtotalIndex !== -1 ? subtotalIndex : lines.length;
    for (const line of lines.slice(headerIndex + 1, end)) {
      const withPrice = line.match(/^(.+?)\s+(\d+)\s+([\d,]+)\s+UGX\s*([\d,]+)$/i);
      if (withPrice) {
        items.push({ title: withPrice[1].trim(), quantity: toNumber(withPrice[2]), price: toNumber(withPrice[3]) });
        continue;
      }
      const qtyOnly = line.match(/^(.+?)\s+(\d+)$/);
      if (qtyOnly) {
        items.push({ title: qtyOnly[1].trim(), quantity: toNumber(qtyOnly[2]), price: 0 });
      }
    }
  }

  const discountMatch = text.match(/Discount\s+(?:UGX\s*)?([\d,]+)/i);
  const discountAmount = discountMatch ? toNumber(discountMatch[1]) : 0;

  const paidMatch = text.match(/PAID|PAYMENT PENDING/i);
  const paymentStatus: 'PENDING' | 'SUCCESSFUL' = paidMatch && /^PAID$/i.test(paidMatch[0]) ? 'SUCCESSFUL' : 'PENDING';
  const methodMatch = text.match(/via\s+([A-Za-z][A-Za-z\s]*)/i);
  const paymentMethod = methodMatch ? methodMatch[1].trim() : 'Cash';
  const payRefMatch = text.match(/via\s+[A-Za-z\s]+\(([^)]+)\)/i);
  const paymentReference = payRefMatch ? payRefMatch[1].trim() : '';

  // Whatever's left between the payment line and the end of the extracted
  // text is the closest approximation of the notes/terms field — genuinely
  // best-effort, since there's no explicit end marker for it.
  let notes = '';
  const paymentLineIndex = lines.findIndex((l) => /PAID|PAYMENT PENDING/i.test(l));
  if (paymentLineIndex !== -1) {
    notes = lines.slice(paymentLineIndex + 1, paymentLineIndex + 3).join(' ').trim();
  }

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
