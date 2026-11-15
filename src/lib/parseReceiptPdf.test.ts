import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseReceiptPdf } from './parseReceiptPdf';

// PDFs printed (Chrome "Save as PDF") from the receipt page itself, so a
// change to the printed layout that breaks "Import from PDF" fails here.
const fixture = (name: string) => readFileSync(join(__dirname, '__fixtures__', name));

const sampleItems = [
  { title: 'Samsung Galaxy A16 128GB', quantity: 1, price: 650000 }, // phone line, with its details box
  { title: 'Tempered glass screen protector', quantity: 2, price: 15000 },
  { title: 'Fast charger 25W with Type-C cable', quantity: 1, price: 45000 },
];

describe('parseReceiptPdf', () => {
  it('reads back a printed sales receipt', async () => {
    const parsed = await parseReceiptPdf(fixture('receipt-sales.pdf'));
    expect(parsed).toMatchObject({
      docType: 'RECEIPT',
      reference: 'WALKIN-MHZ3K9QX',
      documentDate: '2026-11-16',
      customerName: 'Grace Namukasa',
      customerPhone: '+256 772 123456',
      customerEmail: 'grace@example.com',
      discountAmount: 10000,
      paymentStatus: 'SUCCESSFUL',
      paymentMethod: 'Mobile Money',
      paymentReference: 'MP241116ABC',
      notes: 'Thank you for shopping with us! Goods once sold are only returnable under our returns policy.',
    });
    expect(parsed.items).toEqual(sampleItems);
  });

  it('reads back a printed repair job card', async () => {
    const parsed = await parseReceiptPdf(fixture('receipt-job-card.pdf'));
    expect(parsed.docType).toBe('JOB_CARD');
    expect(parsed.customerName).toBe('Grace Namukasa');
    expect(parsed.items).toEqual(sampleItems);
    expect(parsed.notes).toMatch(/^Please back up your data before repair/);
    expect(parsed.notes).not.toMatch(/SIGNATURE/i);
  });
});
