import 'server-only';
import { Resend } from 'resend';

// Lazily constructed — Resend's constructor doesn't validate the key
// eagerly, but building this at module scope in an unconfigured environment
// (e.g. local dev without RESEND_API_KEY) is avoided anyway for consistency
// with the other lazy service clients in this codebase (see supabaseAdmin.ts).
let client: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export function getResendClient(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY || '');
  }
  return client;
}

export function getEmailFrom(): string {
  return process.env.EMAIL_FROM || '';
}
