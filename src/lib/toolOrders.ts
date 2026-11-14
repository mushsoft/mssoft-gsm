import 'server-only';
import type { SoftwareTool, ToolOrder } from '@prisma/client';
import { prisma } from './prisma';
import { getOrderFormSpec, isPerCreditProduct, validateCreditQuantity, validateOrderField } from './softwareToolOrderFields';
import { computeSoftwareToolPriceUsd } from './softwareToolPricing';
import { formatUsdCents } from './walletAmounts';

// Buying unlock/flash tools with wallet balance.
//
// Money rules (same spirit as src/lib/wallet.ts):
//  - the price is always computed here from the SoftwareTool row, never
//    taken from the client;
//  - the debit is a single guarded UPDATE (balance >= total), so concurrent
//    purchases can never overdraw — Postgres re-checks the condition after
//    taking the row lock;
//  - debit, order and ledger row commit together or not at all;
//  - a refund moves the order PAID -> REFUNDED and credits the balance in
//    one transaction, guarded on PAID, so it can only ever happen once.

export class ToolOrderError extends Error {
  constructor(
    message: string,
    public status = 400
  ) {
    super(message);
  }
}

export interface ToolOrderDetail {
  label: string;
  value: string;
}

export function priceTool(tool: Pick<SoftwareTool, 'creditCost' | 'title'>, quantity: number) {
  const perCredit = isPerCreditProduct(tool.title);
  // computeSoftwareToolPriceUsd is already rounded to the cent.
  const unitPriceCents = Math.round(computeSoftwareToolPriceUsd(tool.creditCost) * 100);
  const qty = perCredit ? quantity : 1;
  return { perCredit, unitPriceCents, quantity: qty, totalCents: unitPriceCents * qty };
}

// Checks what the customer typed against this tool's order form (the same
// rules the form itself uses) and returns it in a storable shape.
export function validateToolOrderInput(
  tool: Pick<SoftwareTool, 'category' | 'title'>,
  raw: { quantity?: unknown; details?: unknown; notes?: unknown }
): { quantity: number; details: ToolOrderDetail[]; notes: string | null } {
  let quantity = 1;
  if (isPerCreditProduct(tool.title)) {
    const error = validateCreditQuantity(String(raw.quantity ?? ''));
    if (error) throw new ToolOrderError(error);
    quantity = Number(raw.quantity);
  }

  const given = typeof raw.details === 'object' && raw.details !== null ? (raw.details as Record<string, unknown>) : {};
  const details: ToolOrderDetail[] = [];
  for (const field of getOrderFormSpec(tool.category, tool.title).fields) {
    const value = typeof given[field.key] === 'string' ? (given[field.key] as string).trim() : '';
    const error = validateOrderField(field, value);
    if (error) throw new ToolOrderError(error);
    if (value) details.push({ label: field.label, value });
  }

  const notes = typeof raw.notes === 'string' && raw.notes.trim() ? raw.notes.trim().slice(0, 500) : null;
  return { quantity, details, notes };
}

export function describeToolOrder(order: Pick<ToolOrder, 'toolTitle' | 'perCredit' | 'quantity'>): string {
  return order.perCredit ? `${order.toolTitle} × ${order.quantity.toLocaleString()} credits` : order.toolTitle;
}

export async function purchaseTool(
  customerId: string,
  toolId: string,
  raw: { quantity?: unknown; details?: unknown; notes?: unknown }
): Promise<ToolOrder> {
  const tool = await prisma.softwareTool.findUnique({ where: { id: toolId } });
  if (!tool) throw new ToolOrderError('This tool is no longer available.', 404);

  const input = validateToolOrderInput(tool, raw);
  const price = priceTool(tool, input.quantity);

  return prisma.$transaction(async (tx) => {
    const debited = await tx.customer.updateMany({
      where: { id: customerId, walletBalanceCents: { gte: price.totalCents } },
      data: { walletBalanceCents: { decrement: price.totalCents } },
    });
    if (debited.count === 0) {
      throw new ToolOrderError(`Not enough wallet balance. This costs ${formatUsdCents(price.totalCents)}.`, 402);
    }

    const order = await tx.toolOrder.create({
      data: {
        customerId,
        softwareToolId: tool.id,
        toolTitle: tool.title,
        toolCategory: tool.category,
        perCredit: price.perCredit,
        quantity: price.quantity,
        unitPriceCents: price.unitPriceCents,
        totalCents: price.totalCents,
        details: input.details as unknown as object,
        notes: input.notes,
      },
    });

    await tx.walletTransaction.create({
      data: {
        customerId,
        type: 'PURCHASE',
        status: 'COMPLETED',
        amountCents: -price.totalCents,
        txRef: `WP-${crypto.randomUUID()}`,
        note: describeToolOrder(order),
        toolOrderId: order.id,
        completedAt: new Date(),
      },
    });

    return order;
  });
}

export async function completeToolOrder(id: string, adminNote: string | null): Promise<{ transitioned: boolean }> {
  const moved = await prisma.toolOrder.updateMany({
    where: { id, status: 'PAID' },
    data: { status: 'COMPLETED', completedAt: new Date(), adminNote },
  });
  return { transitioned: moved.count > 0 };
}

export async function refundToolOrder(id: string, adminNote: string | null): Promise<{ transitioned: boolean }> {
  return prisma.$transaction(async (tx) => {
    const moved = await tx.toolOrder.updateMany({
      where: { id, status: 'PAID' },
      data: { status: 'REFUNDED', refundedAt: new Date(), adminNote },
    });
    if (moved.count === 0) return { transitioned: false };

    const order = await tx.toolOrder.findUniqueOrThrow({ where: { id } });
    await tx.customer.update({
      where: { id: order.customerId },
      data: { walletBalanceCents: { increment: order.totalCents } },
    });
    await tx.walletTransaction.create({
      data: {
        customerId: order.customerId,
        type: 'REFUND',
        status: 'COMPLETED',
        amountCents: order.totalCents,
        txRef: `WR-${crypto.randomUUID()}`,
        note: `Refund: ${describeToolOrder(order)}`,
        toolOrderId: order.id,
        completedAt: new Date(),
      },
    });
    return { transitioned: true };
  });
}
