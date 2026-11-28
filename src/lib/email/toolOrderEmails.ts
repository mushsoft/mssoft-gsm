import 'server-only';
import { getResendClient, getEmailFrom, isEmailConfigured } from './resend';

// Customer-typed text (usernames, notes) goes into these emails, so it's
// escaped rather than interpolated raw.
function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

async function send(to: string, subject: string, html: string, context: Record<string, unknown>) {
  try {
    await getResendClient().emails.send({ from: getEmailFrom(), to, subject, html });
  } catch (error) {
    // A failed email must never fail the purchase/update it's attached to.
    console.error('Failed to send tool order email', { ...context, error });
  }
}

export interface ToolOrderEmailData {
  orderId: string;
  description: string; // e.g. "Hydra Any Quantity Credits × 100 credits"
  total: string; // e.g. "$210.00"
  customerName: string;
  customerEmail: string;
  details: { label: string; value: string }[];
  notes: string | null;
}

/** Tells the shop a paid tool order is waiting to be loaded. */
export async function sendNewToolOrderNotification(data: ToolOrderEmailData): Promise<void> {
  const to = process.env.SHOP_NOTIFICATION_EMAIL;
  if (!to || !isEmailConfigured()) {
    console.warn('Tool order notification not sent (SHOP_NOTIFICATION_EMAIL/RESEND_API_KEY/EMAIL_FROM not configured):', data.orderId);
    return;
  }
  const rows = data.details
    .map((d) => `<tr><td style="padding:4px 8px 4px 0;color:#737373;">${escapeHtml(d.label)}</td><td style="padding:4px 0;font-family:monospace;">${escapeHtml(d.value)}</td></tr>`)
    .join('');
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#171717;">
      <h1 style="font-size:18px;">New paid tool order</h1>
      <p style="font-size:14px;"><strong>${escapeHtml(data.description)}</strong>: ${escapeHtml(data.total)}, paid from wallet</p>
      <p style="font-size:14px;">${escapeHtml(data.customerName)} (${escapeHtml(data.customerEmail)})</p>
      <table style="font-size:14px;margin-top:8px;">${rows}</table>
      ${data.notes ? `<p style="font-size:14px;background:#f5f5f5;padding:12px;border-radius:8px;">${escapeHtml(data.notes)}</p>` : ''}
      <p style="margin-top:16px;font-size:13px;">Load it, then mark it Done in Admin → Tool Orders.</p>
      <p style="font-size:11px;color:#737373;">Order ID: ${data.orderId}</p>
    </div>`;
  await send(to, `Tool order: ${data.description}`, html, { orderId: data.orderId });
}

export interface TopUpProofEmailData {
  topUpId: string;
  method: string; // e.g. "Binance (USDT)"
  amount: string; // wallet credit, e.g. "$20.00"
  paid: string; // what they say they paid, e.g. "UGX 84,600" or "20.00 USDT"
  reference: string | null;
  customerName: string;
  customerEmail: string;
}

/** Tells the shop a customer sent a payment screenshot for a wallet top-up. */
export async function sendTopUpProofNotification(data: TopUpProofEmailData): Promise<void> {
  const to = process.env.SHOP_NOTIFICATION_EMAIL;
  if (!to || !isEmailConfigured()) {
    console.warn('Top-up proof notification not sent (email not configured):', data.topUpId);
    return;
  }
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#171717;">
      <h1 style="font-size:18px;">Wallet top-up to check</h1>
      <p style="font-size:14px;"><strong>${escapeHtml(data.amount)}</strong> by ${escapeHtml(data.method)}: they paid ${escapeHtml(data.paid)}</p>
      <p style="font-size:14px;">${escapeHtml(data.customerName)} (${escapeHtml(data.customerEmail)})</p>
      ${data.reference ? `<p style="font-size:14px;">Transaction ID: <span style="font-family:monospace;">${escapeHtml(data.reference)}</span></p>` : ''}
      <p style="margin-top:16px;font-size:13px;">Check the money arrived, look at the screenshot, then approve or reject it in Admin, Wallets.</p>
      <p style="font-size:11px;color:#737373;">Top-up ID: ${data.topUpId}</p>
    </div>`;
  await send(to, `Top-up to check: ${data.amount} by ${data.method}`, html, { topUpId: data.topUpId });
}
