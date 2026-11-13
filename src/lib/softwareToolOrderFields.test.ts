import { describe, it, expect } from 'vitest';
import { getOrderFormSpec, isPerCreditProduct, validateCreditQuantity, validateOrderField } from './softwareToolOrderFields';
import {
  computeSoftwareToolPriceUsd,
  formatUsd,
  multiplyUsd,
  roundUpUgx,
  usdToUgx,
  usdToUgxPerCredit,
} from './softwareToolPricing';

// [category, title] pairs taken from the live /shop/unlock-tools listing.
const kinds = (category: string, title: string) =>
  getOrderFormSpec(category, title).fields.map((f) => `${f.kind}${f.required ? '' : '?'}`);

describe('getOrderFormSpec', () => {
  it('asks email-keyed tools for the registered email', () => {
    expect(kinds('Hydra Tool', 'Hydra Any Quantity Credits')).toEqual(['email']);
    expect(kinds('CF-Tools', 'CF-Tools - 3 Months New Activation')).toEqual(['email']);
  });

  it('asks username-keyed tools for the username', () => {
    expect(kinds('Chimera Tool', 'Chimera Tool Basic (100 Devices / 1 Year)')).toEqual(['username']);
    expect(kinds('Griffin Unlock', 'Griffin Tool - 6 Months (Renew)')).toEqual(['username']);
  });

  it('asks for a preferred username + email when we create a new account', () => {
    const spec = getOrderFormSpec('Multi-Brand Unlocker Pro Tools', 'Global Unlocker Pro Annual Licence (New User)');
    expect(spec.fields.map((f) => `${f.kind}${f.required ? '' : '?'}`)).toEqual(['username?', 'email']);
    expect(spec.intro).toMatch(/create/);
  });

  it('makes the account optional on combined new/existing products', () => {
    expect(kinds('DC-Unlocker & HCU', 'DC-Unlocker/HCU Credits (New/Existing User)')).toEqual(['username?']);
    expect(kinds('Octoplus / Octopus Box', 'Octoplus Box Credits (New/Existing User, Instant)')).toEqual(['username?']);
  });

  it('asks both for UnlockTool', () => {
    expect(kinds('Multi-Brand Unlocker Pro Tools', 'UnlockTool 12 Months Licence')).toEqual(['username', 'email']);
  });

  it('asks box/dongle products for the serial', () => {
    expect(kinds('NCK Tools', 'NCK Dongle Activation (Yearly)')).toEqual(['serial']);
    expect(kinds('DC-Unlocker & HCU', 'DC-Unlocker/HCU Credits To Dongle')).toEqual(['serial']);
    expect(kinds('Firmware & Misc Tools', 'Furious Gold Credits')).toEqual(['serial', 'username']);
  });

  it('matches the title before the category', () => {
    // Category mentions GB-Key, but this is a Miracle product.
    expect(getOrderFormSpec('Miracle / GB-Key', 'Miracle FRP Pack').fields[0].label).toMatch(/Miracle/);
    // Title mentions Miracle, but CM2 renewals go on the Infinity serial.
    expect(
      getOrderFormSpec('Infinity-Box / SPT-Box', 'Infinity-Box/Dongle 1 Year Support Renew (w/ Chinese Miracle-2)').fields[0].label
    ).toMatch(/Infinity/);
  });

  it('does not treat "No Dongle" as a dongle product', () => {
    expect(kinds('EFT / UMT / Polar Box', 'EFT PRO Tools (No Dongle) - 1 Year First Activation')).toEqual(['email']);
    expect(kinds('EFT / UMT / Polar Box', 'EFT Dongle - 1 Year Support Renewal')).toEqual(['serial']);
  });

  it('uses HWID and device token where those are the key', () => {
    expect(kinds('Miracle / GB-Key', 'Miracle Box Digital Edition - 12 Months')).toEqual(['hwid']);
    expect(kinds('Xiaomi Tools', 'XiaomiKEY - Generate EDL Key By Token')).toEqual(['token']);
  });

  it('asks nothing when the vendor delivers a code', () => {
    expect(kinds('Schematics (Borneo / Zhizhen / ZXW)', 'Borneo Schematics - 1 User - 3 Months')).toEqual([]);
    expect(kinds('Octoplus / Octopus Box', 'Octoplus FRP 1 Year Digital Licence')).toEqual([]);
    expect(getOrderFormSpec('Firmware & Misc Tools', 'Smart-Clip2 Pack 5 Activation').intro).toMatch(/Nothing needed/);
  });

  it('falls back to optional username/email for tools it does not know', () => {
    expect(kinds('EFT / UMT / Polar Box', 'Polar Box Server Credits')).toEqual(['username?', 'email?']);
    expect(kinds('Something New', 'Brand New Tool 1 Year')).toEqual(['username?', 'email?']);
  });
});

describe('validateOrderField', () => {
  const email = getOrderFormSpec('Hydra Tool', 'Hydra Any Quantity Credits').fields[0];

  it('requires required fields', () => {
    expect(validateOrderField(email, '  ')).toMatch(/required/);
  });

  it('checks email format', () => {
    expect(validateOrderField(email, 'not-an-email')).toMatch(/valid email/);
    expect(validateOrderField(email, 'tech@example.com')).toBeNull();
  });
});

describe('isPerCreditProduct', () => {
  // Titles from the live listing.
  it.each([
    'Hydra Any Quantity Credits',
    'Chimera Tool Credits',
    'Cheetah Tool Credit (Any Quantity, All Modules)',
    'GAPro Tool Any Quantity Credits (1 Phone = 1 Credit)',
    'DC-Unlocker/HCU Credits (New/Existing User)',
    'Octoplus Box Credits (New/Existing User, Instant)',
    'Fenix Utility Pro Credit Refill',
    'Ultra Unlock Tool - Recharge Balance',
    'Z3X Refill Credits',
    'CF-Tools Credits Top Up',
    'Golden Unlocker Pro Credits (New User)',
    'Xiaomi Avatar Tool Credit (AUTH/FRP/FASTBOOT to EDL)',
  ])('per credit: %s', (title) => {
    expect(isPerCreditProduct(title)).toBe(true);
  });

  it.each([
    'Z3X Credits Pack 30',
    'MobileSea Tool (MST) - 10 Credit Pack',
    'Infinity Server Credits - 50 (Instant)',
    'Infinity Server Logs - 10 Credits',
    'Infinity Online Service - 20 Credits',
    'LGE Credits (Setool) - 1 Pack = 100 Credits',
    'DTpro Credits Package (10 Credits)',
    'Octoplus Full Digital License 1 Day + 100 Server Credits (No Box)',
    'Rd Power Tool Activation (RDPowerPlus + Stool) + 10 Gift Credits',
    'Chimera Tool Basic (100 Devices / 1 Year)',
    'UnlockTool 12 Months Licence',
  ])('fixed price: %s', (title) => {
    expect(isPerCreditProduct(title)).toBe(false);
  });
});

describe('validateCreditQuantity', () => {
  it('accepts whole numbers from 1', () => {
    expect(validateCreditQuantity('1')).toBeNull();
    expect(validateCreditQuantity('250')).toBeNull();
  });

  it('rejects empty, zero, fractions and huge amounts', () => {
    expect(validateCreditQuantity('')).toMatch(/how many/);
    expect(validateCreditQuantity('0')).toMatch(/whole number/);
    expect(validateCreditQuantity('2.5')).toMatch(/whole number/);
    expect(validateCreditQuantity('20000')).toMatch(/message us/);
  });
});

describe('UGX from USD at our rate (live market rate + 99)', () => {
  const rate = 4131.05 + 99; // 4,230.05

  it('converts a per-credit price to the whole shilling and rounds only the total', () => {
    // $1.80 × 4,230.05 = 7,614.09 → 7,615 per credit
    const unit = usdToUgxPerCredit(1.8, rate);
    expect(unit).toBe(7615);
    expect(roundUpUgx(unit * 100)).toBe(761500);
  });

  it('rounds fixed-price items up to UGX 500', () => {
    // $161.85 × 4,230.05 = 684,633.6 → 685,000
    expect(usdToUgx(161.85, rate)).toBe(685000);
  });
});

describe('USD pricing (1 Credit = 1 USD + markup)', () => {
  it('applies the markup and rounds up to the cent without float noise', () => {
    expect(computeSoftwareToolPriceUsd(1.2)).toBe(1.8); // not 1.81
    expect(computeSoftwareToolPriceUsd(107.9)).toBe(161.85);
    expect(computeSoftwareToolPriceUsd(0.668)).toBe(1.01); // 1.002 → up to 1.01
  });

  it('multiplies per-credit prices to the cent', () => {
    expect(multiplyUsd(1.8, 100)).toBe(180);
    expect(multiplyUsd(1.01, 3)).toBe(3.03);
  });

  it('formats as dollars with two decimals', () => {
    expect(formatUsd(1.8)).toBe('$1.80');
    expect(formatUsd(1234.5)).toBe('$1,234.50');
  });
});
