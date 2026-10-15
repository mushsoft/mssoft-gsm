export class SoftwareToolValidationError extends Error {}

export interface SoftwareToolInput {
  category: string;
  title: string;
  creditCost: number;
  order: number;
}

export function parseSoftwareToolInput(body: unknown): SoftwareToolInput {
  if (typeof body !== 'object' || body === null) {
    throw new SoftwareToolValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  const category = typeof b.category === 'string' ? b.category.trim() : '';
  const title = typeof b.title === 'string' ? b.title.trim() : '';
  const creditCost = typeof b.creditCost === 'number' ? b.creditCost : Number(b.creditCost);
  const orderRaw = b.order;
  const order = orderRaw === undefined || orderRaw === null || orderRaw === '' ? 0 : typeof orderRaw === 'number' ? orderRaw : Number(orderRaw);

  if (!category) throw new SoftwareToolValidationError('Category is required');
  if (!title) throw new SoftwareToolValidationError('Title is required');
  if (!Number.isFinite(creditCost) || creditCost < 0) {
    throw new SoftwareToolValidationError('Credit cost must be a non-negative number');
  }
  if (!Number.isFinite(order)) {
    throw new SoftwareToolValidationError('Order must be a number');
  }

  return { category, title, creditCost, order };
}
