import 'server-only';
import { getResendClient, getEmailFrom, isEmailConfigured } from './resend';

export interface OrderEmailItem {
  title: string;
  quantity: number;
  price: number;
}

export interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  txRef: string;
  items: OrderEmailItem[];
  totalAmount: number;
  discountAmount?: number;
}

function itemsTable(items: OrderEmailItem[]): string {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">${item.title}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;text-align:right;">UGX ${(item.quantity * item.price).toLocaleString()}</td>
        </tr>`
    )
    .join('');

  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr style="text-align:left;color:#737373;font-size:11px;text-transform:uppercase;">
        <th style="padding-bottom:6px;">Item</th>
        <th style="padding-bottom:6px;text-align:center;">Qty</th>
        <th style="padding-bottom:6px;text-align:right;">Subtotal</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function emailShell(title: string, message: string, data: OrderEmailData): string {
  const discountLine =
    data.discountAmount && data.discountAmount > 0
      ? `<p style="margin:4px 0;color:#059669;font-size:13px;">Discount applied: -UGX ${data.discountAmount.toLocaleString()}</p>`
      : '';

  return `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#171717;">
      <h1 style="font-size:18px;">${title}</h1>
      <p style="font-size:14px;line-height:1.5;">Hi ${data.customerName}, ${message}</p>
      ${itemsTable(data.items)}
      ${discountLine}
      <p style="margin-top:12px;font-size:15px;font-weight:bold;">Total: UGX ${data.totalAmount.toLocaleString()}</p>
      <p style="margin-top:16px;font-size:11px;color:#737373;">Order reference: ${data.txRef}</p>
    </div>
  `;
}

async function sendOrderEmail(subject: string, html: string, to: string): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn('Email not sent (RESEND_API_KEY/EMAIL_FROM not configured):', subject, to);
    return;
  }
  try {
    await getResendClient().emails.send({ from: getEmailFrom(), to, subject, html });
  } catch (error) {
    // A failed email must never fail the checkout/payment flow it's attached to.
    console.error('Failed to send order email', { subject, to, error });
  }
}

export async function sendOrderReceivedEmail(data: OrderEmailData): Promise<void> {
  const html = emailShell(
    'Order Received',
    "we've received your order and it's pending payment confirmation.",
    data
  );
  await sendOrderEmail(`Order Received — ${data.txRef}`, html, data.customerEmail);
}

export async function sendPaymentConfirmedEmail(data: OrderEmailData): Promise<void> {
  const html = emailShell('Payment Confirmed', 'your payment has been confirmed. We’re preparing your order.', data);
  await sendOrderEmail(`Payment Confirmed — ${data.txRef}`, html, data.customerEmail);
}
