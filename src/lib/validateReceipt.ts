const DOC_TYPES = ['INVOICE', 'RECEIPT', 'DELIVERY_NOTE', 'QUOTATION'] as const;
const PAYMENT_STATUSES = ['PENDING', 'SUCCESSFUL'] as const;

export class ReceiptValidationError extends Error {}

export interface ReceiptItemInput {
  title: string;
  quantity: number;
  price: number;
}

export interface ReceiptInput {
  docType: (typeof DOC_TYPES)[number];
  reference: string;
  orderId: string | null;
  documentDate: Date;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string | null;
  items: ReceiptItemInput[];
  discountAmount: number;
  paymentStatus: (typeof PAYMENT_STATUSES)[number];
  paymentMethod: string;
  paymentReference: string | null;
  notes: Record<string, string>;
}

function parseItems(raw: unknown): ReceiptItemInput[] {
  if (!Array.isArray(raw)) {
    throw new ReceiptValidationError('items must be an array');
  }
  return raw.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new ReceiptValidationError(`items[${index}] is invalid`);
    }
    const e = entry as Record<string, unknown>;
    const title = typeof e.title === 'string' ? e.title.trim() : '';
    const quantity = typeof e.quantity === 'number' ? e.quantity : Number(e.quantity);
    const price = typeof e.price === 'number' ? e.price : Number(e.price);

    if (!title) throw new ReceiptValidationError(`items[${index}].title is required`);
    if (!Number.isFinite(quantity) || quantity < 0) {
      throw new ReceiptValidationError(`items[${index}].quantity must be a non-negative number`);
    }
    if (!Number.isFinite(price) || price < 0) {
      throw new ReceiptValidationError(`items[${index}].price must be a non-negative number`);
    }
    return { title, quantity, price };
  });
}

export function parseReceiptInput(body: unknown): ReceiptInput {
  if (typeof body !== 'object' || body === null) {
    throw new ReceiptValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  const docType = typeof b.docType === 'string' ? b.docType : '';
  if (!DOC_TYPES.includes(docType as (typeof DOC_TYPES)[number])) {
    throw new ReceiptValidationError(`docType must be one of: ${DOC_TYPES.join(', ')}`);
  }

  const reference = typeof b.reference === 'string' ? b.reference.trim() : '';
  if (!reference) {
    throw new ReceiptValidationError('reference is required');
  }

  const orderId = typeof b.orderId === 'string' && b.orderId.trim() ? b.orderId.trim() : null;

  const documentDateRaw = typeof b.documentDate === 'string' ? b.documentDate : '';
  const documentDate = documentDateRaw ? new Date(documentDateRaw) : new Date();
  if (Number.isNaN(documentDate.getTime())) {
    throw new ReceiptValidationError('documentDate is invalid');
  }

  const customerName = typeof b.customerName === 'string' ? b.customerName.trim() : '';
  const customerPhone = typeof b.customerPhone === 'string' ? b.customerPhone.trim() : '';
  const customerEmail = typeof b.customerEmail === 'string' ? b.customerEmail.trim() : '';
  const deliveryAddress = typeof b.deliveryAddress === 'string' && b.deliveryAddress.trim() ? b.deliveryAddress.trim() : null;

  const items = parseItems(b.items);

  const discountAmountRaw = b.discountAmount;
  const discountAmount = typeof discountAmountRaw === 'number' ? discountAmountRaw : Number(discountAmountRaw ?? 0);
  if (!Number.isFinite(discountAmount) || discountAmount < 0) {
    throw new ReceiptValidationError('discountAmount must be a non-negative number');
  }

  const paymentStatus = typeof b.paymentStatus === 'string' ? b.paymentStatus : '';
  if (!PAYMENT_STATUSES.includes(paymentStatus as (typeof PAYMENT_STATUSES)[number])) {
    throw new ReceiptValidationError(`paymentStatus must be one of: ${PAYMENT_STATUSES.join(', ')}`);
  }

  const paymentMethod = typeof b.paymentMethod === 'string' ? b.paymentMethod.trim() : '';
  const paymentReference =
    typeof b.paymentReference === 'string' && b.paymentReference.trim() ? b.paymentReference.trim() : null;

  const notesRaw = b.notes;
  const notes: Record<string, string> = {};
  if (typeof notesRaw === 'object' && notesRaw !== null && !Array.isArray(notesRaw)) {
    for (const [key, value] of Object.entries(notesRaw as Record<string, unknown>)) {
      if (typeof value === 'string') notes[key] = value;
    }
  }

  return {
    docType: docType as (typeof DOC_TYPES)[number],
    reference,
    orderId,
    documentDate,
    customerName,
    customerPhone,
    customerEmail,
    deliveryAddress,
    items,
    discountAmount,
    paymentStatus: paymentStatus as (typeof PAYMENT_STATUSES)[number],
    paymentMethod,
    paymentReference,
    notes,
  };
}
