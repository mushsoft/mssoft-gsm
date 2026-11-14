import 'server-only';
import { prisma } from './prisma';
import { getEmailFrom, getResendClient, isEmailConfigured } from './email/resend';

// One call per customer-facing event: saves a message to the customer's
// account inbox (My Account → Messages) and, unless an existing dedicated
// email already covers the event, emails them the same text.
//
// Never throws — a notification failing must not fail the order/payment
// it's about, which is already committed by the time this runs.

export interface CustomerNotice {
  title: string; // e.g. "Payment confirmed"
  body: string; // one or two plain sentences
  link?: string; // account page to open, e.g. "/account/orders"
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

async function sendNoticeEmail(to: string, name: string | null, notice: CustomerNotice): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn('Notification email not sent (RESEND_API_KEY/EMAIL_FROM not configured):', notice.title, to);
    return;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const button =
    notice.link && baseUrl
      ? `<p style="margin-top:20px;"><a href="${baseUrl}${notice.link}" style="background:#f59e0b;color:#000;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">View in my account</a></p>`
      : '';
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#171717;">
      <h1 style="font-size:18px;">${escapeHtml(notice.title)}</h1>
      <p style="font-size:14px;line-height:1.5;">${name ? `Hi ${escapeHtml(name)}, ` : ''}${escapeHtml(notice.body)}</p>
      ${button}
      <p style="margin-top:24px;font-size:11px;color:#737373;">MS Soft GSM</p>
    </div>`;
  try {
    await getResendClient().emails.send({ from: getEmailFrom(), to, subject: notice.title, html });
  } catch (error) {
    console.error('Failed to send notification email', { title: notice.title, to, error });
  }
}

export async function notifyCustomer(
  target: { customerId: string | null | undefined; email: string; name?: string | null },
  notice: CustomerNotice,
  options: { email?: boolean } = {}
): Promise<void> {
  try {
    if (target.customerId) {
      await prisma.notification.create({
        data: { customerId: target.customerId, title: notice.title, body: notice.body, link: notice.link ?? null },
      });
    }
  } catch (error) {
    console.error('Failed to save account notification', { title: notice.title, customerId: target.customerId, error });
  }
  if (options.email !== false) {
    await sendNoticeEmail(target.email, target.name ?? null, notice);
  }
}

// Same as notifyCustomer, looking the customer up by id first.
export async function notifyCustomerById(customerId: string, notice: CustomerNotice, options: { email?: boolean } = {}) {
  const customer = await prisma.customer
    .findUnique({ where: { id: customerId }, select: { email: true, name: true } })
    .catch(() => null);
  if (!customer) return;
  await notifyCustomer({ customerId, email: customer.email, name: customer.name }, notice, options);
}
