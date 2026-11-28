import { describe, expect, it } from 'vitest';
import { availableProofMethods, detectImageType, parseProofReference, proofDestinations } from './paymentProof';

const profile = { businessName: 'MS Soft GSM', mtnMerchantCode: null, airtelMerchantCode: null, binancePayId: null, binanceName: null };

describe('proof methods', () => {
  it('only offers a method once its details are set', () => {
    expect(availableProofMethods(proofDestinations(profile))).toEqual(['AIRTEL_MERCHANT']);
    const all = proofDestinations({ ...profile, mtnMerchantCode: '123456', binancePayId: '987654321' });
    expect(availableProofMethods(all)).toEqual(['MTN_MERCHANT', 'AIRTEL_MERCHANT', 'BINANCE']);
    expect(all.AIRTEL_MERCHANT?.code).toBe('6923944');
  });
});

describe('detectImageType', () => {
  it('recognises real images by their bytes', () => {
    expect(detectImageType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe('image/jpeg');
    expect(detectImageType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe('image/png');
    expect(detectImageType(new TextEncoder().encode('RIFF\0\0\0\0WEBPVP8 '))).toBe('image/webp');
  });
  it('rejects anything else', () => {
    expect(detectImageType(new TextEncoder().encode('<svg xmlns='))).toBeNull();
    expect(detectImageType(new TextEncoder().encode('%PDF-1.7'))).toBeNull();
    expect(detectImageType(new Uint8Array())).toBeNull();
  });
});

describe('parseProofReference', () => {
  it('is optional and tidied', () => {
    expect(parseProofReference('')).toEqual({ value: null });
    expect(parseProofReference(' mp241128.1234.a5 ')).toEqual({ value: 'MP241128.1234.A5' });
    expect(parseProofReference('<script>').error).toBeTruthy();
  });
});
