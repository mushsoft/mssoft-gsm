export class ReviewValidationError extends Error {}

const MAX_TITLE_LENGTH = 150;
const MAX_BODY_LENGTH = 3000;

export interface ReviewInput {
  productId: string;
  rating: number;
  title: string | null;
  body: string;
}

export function parseReviewInput(input: unknown): ReviewInput {
  if (typeof input !== 'object' || input === null) {
    throw new ReviewValidationError('Request body must be a JSON object');
  }
  const b = input as Record<string, unknown>;

  const productId = typeof b.productId === 'string' ? b.productId.trim() : '';
  const rating = typeof b.rating === 'number' ? b.rating : Number(b.rating);
  const title = typeof b.title === 'string' && b.title.trim() ? b.title.trim() : null;
  const body = typeof b.body === 'string' ? b.body.trim() : '';

  if (!productId) throw new ReviewValidationError('productId is required');
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new ReviewValidationError('rating must be an integer from 1 to 5');
  }
  if (!body) throw new ReviewValidationError('Review body is required');
  if (title && title.length > MAX_TITLE_LENGTH) {
    throw new ReviewValidationError(`Title must be ${MAX_TITLE_LENGTH} characters or fewer`);
  }
  if (body.length > MAX_BODY_LENGTH) {
    throw new ReviewValidationError(`Review must be ${MAX_BODY_LENGTH} characters or fewer`);
  }

  return { productId, rating, title, body };
}
