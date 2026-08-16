const DISCOUNT_TYPES = ['PERCENT', 'FIXED'] as const;

export class CouponValidationError extends Error {}

export interface CouponInput {
  code: string;
  discountType: (typeof DISCOUNT_TYPES)[number];
  value: number;
  active: boolean;
  expiresAt: Date | null;
  maxUses: number | null;
}

export function parseCouponInput(body: unknown): CouponInput {
  if (typeof body !== 'object' || body === null) {
    throw new CouponValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  const code = typeof b.code === 'string' ? b.code.trim().toUpperCase() : '';
  const discountType = typeof b.discountType === 'string' ? b.discountType : '';
  const value = typeof b.value === 'number' ? b.value : Number(b.value);
  const active = b.active !== false;
  const expiresAtRaw = typeof b.expiresAt === 'string' ? b.expiresAt.trim() : '';
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null;
  const maxUsesRaw = b.maxUses;
  const maxUses =
    maxUsesRaw === null || maxUsesRaw === undefined || maxUsesRaw === ''
      ? null
      : typeof maxUsesRaw === 'number'
        ? maxUsesRaw
        : Number(maxUsesRaw);

  if (!code || !/^[A-Z0-9_-]+$/.test(code)) {
    throw new CouponValidationError('Code is required and must be letters, numbers, hyphens, or underscores');
  }
  if (!DISCOUNT_TYPES.includes(discountType as (typeof DISCOUNT_TYPES)[number])) {
    throw new CouponValidationError(`discountType must be one of: ${DISCOUNT_TYPES.join(', ')}`);
  }
  if (!Number.isFinite(value) || value <= 0) {
    throw new CouponValidationError('Value must be a positive number');
  }
  if (discountType === 'PERCENT' && value > 100) {
    throw new CouponValidationError('Percent discount cannot exceed 100');
  }
  if (expiresAtRaw && (!expiresAt || Number.isNaN(expiresAt.getTime()))) {
    throw new CouponValidationError('expiresAt must be a valid date');
  }
  if (maxUses !== null && (!Number.isInteger(maxUses) || maxUses < 1)) {
    throw new CouponValidationError('maxUses must be a positive integer');
  }

  return { code, discountType: discountType as (typeof DISCOUNT_TYPES)[number], value, active, expiresAt, maxUses };
}
