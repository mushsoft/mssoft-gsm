export interface PasswordStrength {
  score: 0 | 1 | 2 | 3;
  label: string;
  barColor: string;
  textColor: string;
}

const LEVELS: Omit<PasswordStrength, 'score'>[] = [
  { label: 'Weak', barColor: 'bg-red-500', textColor: 'text-red-500' },
  { label: 'Fair', barColor: 'bg-amber-500', textColor: 'text-amber-500' },
  { label: 'Good', barColor: 'bg-yellow-400', textColor: 'text-yellow-500' },
  { label: 'Strong', barColor: 'bg-emerald-500', textColor: 'text-emerald-500' },
];

/** Rough heuristic, not an entropy calculation — enough to nudge users away from weak passwords. */
export function getPasswordStrength(password: string): PasswordStrength | null {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  const clamped = Math.min(score, LEVELS.length - 1) as 0 | 1 | 2 | 3;
  return { score: clamped, ...LEVELS[clamped] };
}
