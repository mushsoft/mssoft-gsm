import { getPhoneLengthRange } from './countryCodes';

/**
 * Letters (any script), spaces, hyphens, apostrophes and periods (for
 * initials like "J. Smith") — at least two letters total, so digits and
 * symbol-only input are rejected. Unicode-aware so non-English names work.
 */
const FULL_NAME_PATTERN = /^(?=(?:.*\p{L}){2,})[\p{L} '.-]{2,80}$/u;

export function isValidFullName(name: string): boolean {
  return FULL_NAME_PATTERN.test(name.trim());
}

/** Shared by the signup form and API so both enforce the same rule. */
const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_RULE_MESSAGE = 'Username must be 3-20 characters (letters, numbers, "_" or ".")';

export function isValidUsername(username: string): boolean {
  return USERNAME_PATTERN.test(username);
}

/**
 * Cleans what's typed into the username box as you go, so a rule-breaking
 * username can't be entered in the first place: spaces become "_", any other
 * disallowed character is dropped, and it's capped at the max length.
 */
export function sanitizeUsernameInput(raw: string): string {
  return raw
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9_.]/g, '')
    .slice(0, USERNAME_MAX_LENGTH);
}

/**
 * Stricter than the previous `x@y.z` check: rejects consecutive/leading/
 * trailing dots in the local part, validates each domain label, and caps
 * lengths per RFC 5321 (local <=64, total <=254).
 */
const EMAIL_PATTERN =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  const [local] = trimmed.split('@');
  if (!local || local.length > 64) return false;
  return EMAIL_PATTERN.test(trimmed);
}

/** Digits only, after stripping everything else (spaces, dashes, parens, a leading trunk 0). */
export function digitsOnlyLocalPhone(localPhone: string): string {
  return localPhone.replace(/\D/g, '').replace(/^0+/, '');
}

/** True if the local (national) part has a digit count that's plausible for the selected dial code. */
export function isValidPhoneForDialCode(dialCode: string, localPhone: string): boolean {
  const digits = digitsOnlyLocalPhone(localPhone);
  const [min, max] = getPhoneLengthRange(dialCode);
  return digits.length >= min && digits.length <= max;
}
