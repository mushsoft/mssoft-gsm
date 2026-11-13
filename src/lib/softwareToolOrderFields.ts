// What a customer must give us when ordering an unlock/flash tool, so we can
// load the activation or credits onto the right account. Each vendor keys
// accounts differently (email, username, box/dongle serial, PC hardware ID,
// a device token…), and some deliver a code instead, needing nothing.
//
// Resolved from the tool's category + title by keyword rules rather than a
// DB column, so all existing listings get the right form with no backfill,
// and a newly added tool picks it up from its name. Rules are based on the
// tool vendors' and resellers' order pages (researched Nov 2026) — when a
// supplier's own panel asks for something different, the supplier wins:
// adjust the rule here.
//
// We never ask for passwords. Where a vendor needs one to create an account,
// that's arranged on WhatsApp instead.

export type OrderFieldKind = 'email' | 'username' | 'serial' | 'hwid' | 'token';

export interface OrderField {
  key: string;
  kind: OrderFieldKind;
  label: string;
  placeholder?: string;
  help?: string;
  required: boolean;
}

export interface OrderFormSpec {
  fields: OrderField[];
  // Shown above the fields, e.g. "Register on the tool first".
  intro?: string;
}

// Credit top-ups ("Hydra Any Quantity Credits", "Chimera Tool Credits",
// "Fenix Utility Pro Credit Refill") are priced per credit and the customer
// picks how many. Fixed packs ("Z3X Credits Pack 30", "Infinity Server
// Credits - 10", "1 Pack = 100 Credits") are one item at a fixed price.
const FIXED_PACK = /\bpack\b|\bpackage\b|\d+\s+(\w+\s+)?credits?\b|credits?\s*-\s*\d+/;
const PER_CREDIT = /credit|refill|recharge|top up/;

export function isPerCreditProduct(title: string): boolean {
  const t = title.toLowerCase();
  if (t.includes('any quantity') || t.includes('any qty')) return true;
  return PER_CREDIT.test(t) && !FIXED_PACK.test(t);
}

export const MAX_CREDIT_QUANTITY = 10000;

export function validateCreditQuantity(raw: string): string | null {
  const n = Number(raw);
  if (!raw.trim()) return 'Enter how many credits you need.';
  if (!Number.isInteger(n) || n < 1) return 'Enter a whole number of credits (1 or more).';
  if (n > MAX_CREDIT_QUANTITY) return `For more than ${MAX_CREDIT_QUANTITY.toLocaleString()} credits, message us directly.`;
  return null;
}

type Identity =
  | { kind: 'email' }
  // optional: new customers may leave it blank and get an account created.
  | { kind: 'username'; label?: string; placeholder?: string; help?: string; optional?: boolean }
  | { kind: 'both' } // username + email
  | { kind: 'serial'; label: string; placeholder?: string; help?: string; withUsername?: boolean; withEmail?: boolean }
  | { kind: 'hwid'; label: string; help?: string }
  | { kind: 'token'; label: string; help?: string }
  | { kind: 'code' } // vendor delivers an activation code / OTP — nothing to collect
  | { kind: 'unknown' }; // ask for whichever the customer has

interface Rule {
  match: RegExp;
  name: string;
  identity: Identity;
}

const INFINITY_SERIAL = {
  kind: 'serial',
  label: 'Infinity box/dongle serial',
  placeholder: 'e.g. 28312ABC',
  help: '8 characters, uppercase, no dashes. Read it with Infinity Dongle Manager.',
} as const;

// First match wins, so specific rules come before broad ones.
const RULES: Rule[] = [
  { match: /xiaomikey/, name: 'XiaomiKEY', identity: { kind: 'token', label: 'Device token', help: 'Generate it in the XiaomiKey software. It changes if the phone reboots, so send it right before ordering. Find My Device must be off.' } },

  // Chinese Miracle-2 lives on Infinity hardware — must beat the Miracle rules.
  { match: /chinese miracle/, name: 'Infinity', identity: INFINITY_SERIAL },

  // Miracle family
  { match: /miracle.*(digital|login edition)/, name: 'Miracle', identity: { kind: 'hwid', label: 'Hardware ID (HWID)', help: 'Shown in the Miracle Login Edition setup on the PC you will use.' } },
  { match: /falcon/, name: 'Falcon', identity: { kind: 'serial', label: 'Miracle dongle serial', placeholder: 'MICBX… or MIRTD…', withEmail: true } },
  { match: /gb-key/, name: 'GB-Key', identity: { kind: 'serial', label: 'GB-Key dongle serial' } },
  { match: /miracle/, name: 'Miracle', identity: { kind: 'serial', label: 'Miracle box/dongle serial', placeholder: 'Starts with MICBX, MIRTD or FRP', help: 'Read it with Miracle Key SN Reader. A wrong serial cannot be reversed.' } },

  // Box/dongle families
  { match: /octoplus.*(digital|no box)/, name: 'Octoplus', identity: { kind: 'code' } },
  { match: /octoplus.*credit/, name: 'Octoplus', identity: { kind: 'username', label: 'Octoplus credits login', placeholder: 'lowercase', help: 'Your existing credits account login. Leave blank if you are new and we will create one.', optional: true } },
  { match: /octoplus|boot loader activation code/, name: 'Octoplus', identity: { kind: 'serial', label: 'Octoplus box/dongle serial' } },
  { match: /z3x.*(credit|refill|samstool online)/, name: 'Z3X', identity: { kind: 'username', label: 'Z3X login', placeholder: 'zsc_XXxxXXxX', help: 'Leave blank only if you have no Z3X credits account yet — credits on a new account cannot be merged later.', optional: true } },
  { match: /z3x/, name: 'Z3X', identity: { kind: 'serial', label: 'Z3X card serial (SN)' } },
  { match: /nck online tool/, name: 'NCK Online Tool', identity: { kind: 'both' } },
  { match: /nck/, name: 'NCK', identity: { kind: 'serial', label: 'NCK box/dongle serial', placeholder: 'NCKXXXXXXXXX', help: 'Must be the exact serial from your box/dongle.' } },
  { match: /sigma.*(digital|no box)/, name: 'Sigma Plus', identity: { kind: 'email' } },
  { match: /sigma/, name: 'Sigma Plus', identity: { kind: 'code' } },
  { match: /infinity (server|online)/, name: 'Infinity', identity: { kind: 'serial', label: 'Infinity username or dongle serial', help: 'The 10-digit username or the serial shown in Infinity Dongle Manager.' } },
  { match: /dc[- ]?unlocker.*(dongle|vygis|rocker|infinity)/, name: 'DC-Unlocker', identity: { kind: 'serial', label: 'Dongle serial number' } },
  { match: /infinity|spt[- ]box|cdma-tool|hua dongle|samsung sm software|asansam|bb5 easy/, name: 'Infinity', identity: INFINITY_SERIAL },
  { match: /smart-clip/, name: 'Smart-Clip2', identity: { kind: 'code' } },
  { match: /dc[- ]?unlocker|hcu/, name: 'DC-Unlocker', identity: { kind: 'username', label: 'DC-Unlocker username' } },
  // "eft dongle", not /eft.*dongle/ — "EFT PRO Tools (No Dongle)" is the
  // email-keyed account product.
  { match: /eft dongle/, name: 'EFT', identity: { kind: 'serial', label: 'EFT dongle serial', help: 'Plug in the dongle and open EFT PRO to see it.' } },
  { match: /eft/, name: 'EFT PRO', identity: { kind: 'email' } },
  { match: /umt/, name: 'UMT', identity: { kind: 'serial', label: 'UMT box/dongle serial', placeholder: 'e.g. UMT1234567', help: 'Needs your existing UMT box/dongle — read it in UMT Card Manager → Get Card Info.' } },
  { match: /avator/, name: 'Avator Pro', identity: { kind: 'hwid', label: 'Dongle HWID', help: 'Copy it from Card Information in AvatorPro Dongle Manager.' } },
  { match: /polar box 3/, name: 'Polar Box 3', identity: { kind: 'serial', label: 'Polar Box 3 serial' } },
  // Not researched — stop it falling through to the "EFT / UMT / Polar Box"
  // category's EFT rule.
  { match: /polar box server/, name: 'Polar Box', identity: { kind: 'unknown' } },
  { match: /atf/, name: 'ATF', identity: { kind: 'serial', label: 'ATF box serial', help: '24 digits.' } },
  { match: /furious/, name: 'Furious Gold', identity: { kind: 'serial', label: 'Furious box serial', withUsername: true, help: 'Both are in Maintenance → Support → Dashboard → Account Info.' } },
  { match: /nspro|ns pro/, name: 'NS PRO', identity: { kind: 'serial', label: 'NS PRO Card ID', help: 'Read it in the NS PRO software — not the serial on the label.' } },
  { match: /s-module|cs-tool/, name: 'CS-Tool', identity: { kind: 'serial', label: 'SWID' } },
  { match: /inferno/, name: 'Inferno', identity: { kind: 'serial', label: 'Inferno Dog ID (dongle serial)' } },
  { match: /micro-box|sl-box|htc activation|lg\/zte activation|blackberry mep0|alcatel activation/, name: 'Micro-Box', identity: { kind: 'serial', label: 'Micro-Box serial' } },
  { match: /lg tool (activation|wholesale)/, name: 'LG Tool', identity: { kind: 'serial', label: 'SETool card ID', help: 'Activation only works on a registered card.' } },
  { match: /lge credits|setool/, name: 'SETool', identity: { kind: 'username', label: 'SETool account username' } },
  { match: /ikey/, name: 'IKEY', identity: { kind: 'serial', label: 'Device serial number (SN)' } },

  // Code / OTP delivered to the buyer
  { match: /dt pro tool activation/, name: 'DT Pro', identity: { kind: 'code' } },
  { match: /gapro login tool/, name: 'GAPro', identity: { kind: 'code' } },
  { match: /borneo|zhizhen|zxw|wuxinji|jcid/, name: 'Schematics', identity: { kind: 'code' } },

  // Account tools needing both
  { match: /unlocktool/, name: 'UnlockTool', identity: { kind: 'both' } },
  { match: /hde tools/, name: 'HDE Tools', identity: { kind: 'both' } },
  { match: /halabtech/, name: 'HalabTech', identity: { kind: 'both' } },
  { match: /android multi tool|\bamt\b/, name: 'Android Multi Tool', identity: { kind: 'both' } },

  // Email-keyed accounts
  { match: /cf-tools/, name: 'CF-Tools', identity: { kind: 'email' } },
  { match: /cheetah/, name: 'Cheetah Tool', identity: { kind: 'email' } },
  { match: /mdmfix/, name: 'MdmFixTool', identity: { kind: 'email' } },
  { match: /mh unlocker/, name: 'MH Unlocker Pro', identity: { kind: 'email' } },
  { match: /hydra/, name: 'Hydra', identity: { kind: 'email' } },
  { match: /mobilesea|\bmst\b/, name: 'MobileSea Tool', identity: { kind: 'email' } },
  { match: /tfm/, name: 'TFM Pro', identity: { kind: 'email' } },
  { match: /tsm-tool/, name: 'TSM-Tool Pro', identity: { kind: 'email' } },
  { match: /t-tool-pro/, name: 'T-Tool-Pro', identity: { kind: 'email' } },
  { match: /xiaomi pro tool/, name: 'Xiaomi Pro Tool', identity: { kind: 'email' } },
  { match: /xiaomi avatar/, name: 'Xiaomi Avatar Tool', identity: { kind: 'email' } },
  { match: /xft/, name: 'XFT', identity: { kind: 'email' } },
  { match: /golden unlocker/, name: 'Golden Unlocker Pro', identity: { kind: 'email' } },
  { match: /fast unlocker/, name: 'Fast Unlocker Pro', identity: { kind: 'email' } },
  { match: /motoking/, name: 'MotoKingPRO', identity: { kind: 'email' } },
  { match: /fenris/, name: 'Fenris', identity: { kind: 'email' } },
  { match: /pandora/, name: 'Pandora', identity: { kind: 'email' } },

  // Username-keyed accounts
  { match: /chimera/, name: 'Chimera', identity: { kind: 'username' } },
  { match: /eme mobile|\bemt\b/, name: 'EME Mobile Tool', identity: { kind: 'username' } },
  { match: /lumia/, name: 'Lumia Unlock', identity: { kind: 'username' } },
  { match: /androidwintool/, name: 'AndroidWinTool', identity: { kind: 'username' } },
  { match: /360 tool|tojo/, name: '360 Tool', identity: { kind: 'username' } },
  { match: /griffin/, name: 'Griffin-Unlocker', identity: { kind: 'username' } },
  { match: /dft pro/, name: 'DFT Pro', identity: { kind: 'username' } },
  { match: /samsungtool\.us|kg solution|kg active/, name: 'SamsungTool', identity: { kind: 'username' } },
  { match: /frptoolpro/, name: 'FRPToolPRO', identity: { kind: 'username' } },
  { match: /sam-frp/, name: 'Sam-FRP Tool', identity: { kind: 'username' } },
  { match: /mr_auth/, name: 'MR_AUTH Tool', identity: { kind: 'username' } },
  { match: /tr tools/, name: 'TR Tools Pro', identity: { kind: 'username' } },
  { match: /mtkgogo/, name: 'MTKGoGo', identity: { kind: 'username' } },
  { match: /pixel pro/, name: 'Pixel Pro Tool', identity: { kind: 'username' } },
  { match: /rd power/, name: 'RD Power Tool', identity: { kind: 'username' } },
  { match: /fenix/, name: 'Fenix Utility Pro', identity: { kind: 'username' } },
  { match: /ultra unlock/, name: 'Ultra Unlock Tool', identity: { kind: 'username' } },
  { match: /general unlocker/, name: 'General Unlocker Pro', identity: { kind: 'username' } },
  { match: /global unlocker/, name: 'Global Unlocker Pro', identity: { kind: 'username' } },
  { match: /key-tool/, name: 'Key-Tool', identity: { kind: 'username' } },
  { match: /anonyshu/, name: 'AnonySHU', identity: { kind: 'username' } },
  { match: /realme auth/, name: 'Realme Auth Flash Tool', identity: { kind: 'username' } },
];

const NEW_USER = /new user|new account|create new|first activation|new activation/;
const EXISTING_USER = /existing|renew|old user/;
// "Credits (New/Existing User)" — one product for both; the account field
// becomes optional.
const EITHER_USER = /new\/existing/;

function emailField(name: string, help?: string): OrderField {
  return {
    key: 'email',
    kind: 'email',
    label: `Email registered on ${name}`,
    placeholder: 'you@example.com',
    help: help ?? `Register on ${name} first with this email if you haven't.`,
    required: true,
  };
}

function usernameField(name: string, opts: { label?: string; placeholder?: string; help?: string; required?: boolean } = {}): OrderField {
  return {
    key: 'username',
    kind: 'username',
    label: opts.label ?? `${name} username`,
    placeholder: opts.placeholder,
    help: opts.help,
    required: opts.required ?? true,
  };
}

export function getOrderFormSpec(category: string, title: string): OrderFormSpec {
  // Title first — a category like "Miracle / GB-Key" names several tools, so
  // matching it first would send every item in it to the same rule. The
  // category is only a fallback for titles that don't name their tool.
  const haystack = `${category} ${title}`.toLowerCase();
  const titleLower = title.toLowerCase();
  const rule = RULES.find((r) => r.match.test(titleLower)) ?? RULES.find((r) => r.match.test(haystack));
  const name = rule?.name ?? 'the tool';
  const identity: Identity = rule?.identity ?? { kind: 'unknown' };
  const isEither = EITHER_USER.test(haystack);
  const isNew = !isEither && NEW_USER.test(haystack) && !EXISTING_USER.test(haystack);

  switch (identity.kind) {
    case 'code':
      return { fields: [], intro: 'Nothing needed from you — we send the activation code to you on WhatsApp.' };

    case 'token':
      return { fields: [{ key: 'token', kind: 'token', label: identity.label, help: identity.help, required: true }] };

    case 'hwid':
      return { fields: [{ key: 'hwid', kind: 'hwid', label: identity.label, help: identity.help, required: true }] };

    case 'serial': {
      const fields: OrderField[] = [
        { key: 'serial', kind: 'serial', label: identity.label, placeholder: identity.placeholder, help: identity.help, required: true },
      ];
      if (identity.withUsername) fields.push(usernameField(name));
      if (identity.withEmail) fields.push({ ...emailField(name), label: 'Email', help: undefined });
      return { fields };
    }

    case 'email':
      return { fields: [emailField(name)] };

    case 'username':
      if (isNew) {
        return {
          intro: `We'll create your ${name} account and send the login details on WhatsApp.`,
          fields: [
            usernameField(name, { label: 'Preferred username', required: false }),
            { ...emailField(name), label: 'Your email', help: undefined },
          ],
        };
      }
      return {
        fields: [
          usernameField(name, {
            label: identity.label,
            placeholder: identity.placeholder,
            help: identity.help ?? (isEither ? 'Leave blank if you are a new user.' : undefined),
            required: !isEither && !identity.optional,
          }),
        ],
      };

    case 'both':
      return { fields: [usernameField(name), emailField(name, 'The email on the same account.')] };

    case 'unknown':
      return {
        intro: 'Give us whichever account detail you use to log in to this tool.',
        fields: [
          usernameField(name, { label: 'Username (if any)', required: false }),
          { ...emailField(name), label: 'Email (if any)', help: undefined, required: false },
        ],
      };
  }
}

// Loose checks — enough to catch typos before the order goes out, without
// rejecting legitimate vendor formats we haven't seen.
export function validateOrderField(field: OrderField, value: string): string | null {
  const v = value.trim();
  if (!v) return field.required ? `${field.label} is required.` : null;
  if (field.kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
  if (v.length > 120) return 'That looks too long.';
  return null;
}
