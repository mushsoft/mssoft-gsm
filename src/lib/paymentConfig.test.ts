import { describe, it, expect, afterEach } from 'vitest';
import { availableCheckoutMethods, availableTopUpMethods } from './paymentConfig';

const KEYS = [
  'VERCEL_ENV',
  'NEXT_PUBLIC_BASE_URL',
  'PAWAPAY_API_TOKEN',
  'PAWAPAY_BASE_URL',
  'FLUTTERWAVE_SECRET_KEY',
  'FLUTTERWAVE_WEBHOOK_SECRET_HASH',
];
const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));

function setEnv(values: Record<string, string>) {
  for (const k of KEYS) delete process.env[k];
  Object.assign(process.env, values);
}

afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

const site = { NEXT_PUBLIC_BASE_URL: 'https://www.mssoft-gsm.com' };

describe('live site (Vercel production)', () => {
  it('never offers pawaPay with sandbox settings', () => {
    setEnv({ ...site, VERCEL_ENV: 'production', PAWAPAY_API_TOKEN: 't', PAWAPAY_BASE_URL: 'https://api.sandbox.pawapay.io' });
    expect(availableCheckoutMethods()).toEqual(['AIRTEL_MONEY']);
    expect(availableTopUpMethods()).toEqual(['AIRTEL_MONEY']);
  });

  it('offers pawaPay with live settings (and with no base URL, which defaults to live)', () => {
    setEnv({ ...site, VERCEL_ENV: 'production', PAWAPAY_API_TOKEN: 't', PAWAPAY_BASE_URL: 'https://api.pawapay.io' });
    expect(availableCheckoutMethods()).toEqual(['PAWAPAY', 'AIRTEL_MONEY']);
    setEnv({ ...site, VERCEL_ENV: 'production', PAWAPAY_API_TOKEN: 't' });
    expect(availableCheckoutMethods()).toEqual(['PAWAPAY', 'AIRTEL_MONEY']);
  });

  it('never offers Flutterwave with a test key', () => {
    setEnv({ ...site, VERCEL_ENV: 'production', FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-abc', FLUTTERWAVE_WEBHOOK_SECRET_HASH: 'h' });
    expect(availableCheckoutMethods()).toEqual(['AIRTEL_MONEY']);
    expect(availableTopUpMethods()).toEqual(['AIRTEL_MONEY']);
  });

  it('offers Flutterwave at checkout with a live key, but in the wallet only with the webhook secret too', () => {
    setEnv({ ...site, VERCEL_ENV: 'production', FLUTTERWAVE_SECRET_KEY: 'FLWSECK-live' });
    expect(availableCheckoutMethods()).toEqual(['MOBILE_MONEY', 'CARD', 'AIRTEL_MONEY']);
    expect(availableTopUpMethods()).toEqual(['AIRTEL_MONEY']);
  });

  it('offers nothing but Airtel without a site URL', () => {
    setEnv({ VERCEL_ENV: 'production', PAWAPAY_API_TOKEN: 't', FLUTTERWAVE_SECRET_KEY: 'FLWSECK-live' });
    expect(availableCheckoutMethods()).toEqual(['AIRTEL_MONEY']);
  });
});

describe('local / preview (testing)', () => {
  it('allows sandbox and test credentials', () => {
    setEnv({
      ...site,
      VERCEL_ENV: 'preview',
      PAWAPAY_API_TOKEN: 't',
      PAWAPAY_BASE_URL: 'https://api.sandbox.pawapay.io',
      FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-abc',
      FLUTTERWAVE_WEBHOOK_SECRET_HASH: 'h',
    });
    expect(availableCheckoutMethods()).toEqual(['PAWAPAY', 'MOBILE_MONEY', 'CARD', 'AIRTEL_MONEY']);
    expect(availableTopUpMethods()).toEqual(['PAWAPAY', 'MOBILE_MONEY', 'CARD', 'AIRTEL_MONEY']);
  });
});
