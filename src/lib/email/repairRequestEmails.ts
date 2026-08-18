import 'server-only';
import { getResendClient, getEmailFrom, isEmailConfigured } from './resend';

export interface RepairRequestNotificationData {
  requestId: string;
  customerName: string;
  customerPhone: string;
  brand: string | null;
  modelName: string | null;
  problem: string;
  imageUrl: string | null;
}

/** Notifies the shop owner of a new "Ask a Technician" submission — never sent to the customer. */
export async function sendRepairRequestNotification(data: RepairRequestNotificationData): Promise<void> {
  const to = process.env.SHOP_NOTIFICATION_EMAIL;
  if (!to || !isEmailConfigured()) {
    console.warn('Repair request notification not sent (SHOP_NOTIFICATION_EMAIL/RESEND_API_KEY/EMAIL_FROM not configured):', data.requestId);
    return;
  }

  const device = [data.brand, data.modelName].filter(Boolean).join(' ') || 'Unspecified device';
  const imageRow = data.imageUrl
    ? `<p style="margin-top:12px;"><a href="${data.imageUrl}" style="color:#2563eb;">View attached photo</a></p>`
    : '';

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#171717;">
      <h1 style="font-size:18px;">New repair request</h1>
      <p style="font-size:14px;line-height:1.5;">
        <strong>${data.customerName}</strong> (${data.customerPhone}) asked about their <strong>${device}</strong>:
      </p>
      <p style="font-size:14px;line-height:1.5;background:#f5f5f5;padding:12px;border-radius:8px;">${data.problem}</p>
      ${imageRow}
      <p style="margin-top:16px;font-size:11px;color:#737373;">Request ID: ${data.requestId}</p>
    </div>
  `;

  try {
    await getResendClient().emails.send({
      from: getEmailFrom(),
      to,
      subject: `New repair request from ${data.customerName}`,
      html,
    });
  } catch (error) {
    // A failed notification email must never fail the submission it's attached to.
    console.error('Failed to send repair request notification email', { requestId: data.requestId, error });
  }
}
