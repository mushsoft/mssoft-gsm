// Category (and, where defined, subcategory) spec field config for the admin
// product form. Field `key`s are stored flat in Product.specs (a JSON object)
// — chosen to match the keys already used by prisma/seed.ts so existing
// seeded products map straight into the right structured field instead of
// falling back to "Additional Info". Any keys NOT listed here for a
// category/subcategory still round-trip safely through the form's freeform
// "Additional Info" section.

export type SpecFieldType = 'text' | 'select';

export interface SpecFieldDef {
  key: string;
  label: string;
  type: SpecFieldType;
  options?: string[];
  placeholder?: string;
}

export type ProductCategory = 'PHONE' | 'ACCESSORY' | 'SPARE_PART' | 'REPAIR_TOOL' | 'KIDS_TAB';

export interface SubcategoryDef {
  value: string;
  label: string;
}

/** Which categories offer a subcategory picker, and its options. PHONE and KIDS_TAB have none. */
export const CATEGORY_SUBCATEGORIES: Partial<Record<ProductCategory, SubcategoryDef[]>> = {
  SPARE_PART: [
    { value: 'SCREEN', label: 'Screens' },
    { value: 'BATTERY', label: 'Batteries' },
    { value: 'CHARGING_FLEX', label: 'Charging Port / Flex' },
    { value: 'CAMERA', label: 'Camera Modules' },
    { value: 'SPEAKER', label: 'Speakers & Earpiece' },
    { value: 'HOUSING', label: 'Back Covers / Housing' },
    { value: 'MOTHERBOARD', label: 'Motherboards / IC' },
    { value: 'OTHER', label: 'Other Spares' },
  ],
  ACCESSORY: [
    { value: 'PHONE_COVER', label: 'Phone Covers & Cases' },
    { value: 'CHARGER', label: 'Chargers & Power Banks' },
    { value: 'CABLE', label: 'Cables' },
    { value: 'EARPHONE', label: 'Earphones & Audio' },
    { value: 'SCREEN_PROTECTOR', label: 'Screen Protectors' },
    { value: 'OTHER', label: 'Other Accessories' },
  ],
  REPAIR_TOOL: [
    { value: 'BLOWER', label: 'Blowers & Hot Air' },
    { value: 'SEPARATOR', label: 'Separators' },
    { value: 'POWER_SUPPLY', label: 'DC Power Supply' },
    { value: 'MICROSCOPE', label: 'Microscopes' },
    { value: 'MULTIMETER', label: 'Multimeters' },
    { value: 'SOLDERING', label: 'Soldering Guns & Stations' },
    { value: 'LAMINATOR', label: 'Laminators & Debubblers' },
    { value: 'OTHER', label: 'Other Tools' },
  ],
};

const QUALITY_OPTIONS = ['Original Service Pack', 'OEM Replacement', 'Aftermarket', 'Used - Original'];

const qualityField = (): SpecFieldDef => ({
  key: 'quality',
  label: 'Quality Grade',
  type: 'select',
  options: QUALITY_OPTIONS,
});

const compatibilityField = (placeholder = 'SM-A546B, SM-A546U'): SpecFieldDef => ({
  key: 'compatibility',
  label: 'Compatible Models',
  type: 'text',
  placeholder,
});

const RAM_OPTIONS = ['1GB', '2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB'];
const STORAGE_OPTIONS = ['8GB', '16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
const SCREEN_SIZE_OPTIONS = [
  '5.0"', '5.5"', '6.1"', '6.4"', '6.5"', '6.6"', '6.7"', '6.8"', '6.9"', '7.0"', '7.2"', '8.7"', '10.1"', '10.4"',
];

const ramField = (): SpecFieldDef => ({ key: 'ram', label: 'RAM', type: 'select', options: RAM_OPTIONS });
const storageField = (): SpecFieldDef => ({ key: 'storage', label: 'Storage', type: 'select', options: STORAGE_OPTIONS });
const screenSizeField = (): SpecFieldDef => ({ key: 'screenSize', label: 'Screen Size', type: 'select', options: SCREEN_SIZE_OPTIONS });

/** Category-level fallback fields — used when no subcategory is picked yet, and always for PHONE/KIDS_TAB/REPAIR_TOOL. */
export const CATEGORY_SPEC_FIELDS: Record<ProductCategory, SpecFieldDef[]> = {
  PHONE: [
    { key: 'condition', label: 'Condition', type: 'select', options: ['Brand New', 'UK Used', 'Open Box'] },
    ramField(),
    storageField(),
    screenSizeField(),
    { key: 'battery', label: 'Battery', type: 'text', placeholder: '5000 mAh' },
    { key: 'camera', label: 'Main Camera', type: 'text', placeholder: '50MP' },
    { key: 'chipset', label: 'Chipset / Processor', type: 'text', placeholder: 'Snapdragon 8 Gen 3' },
    { key: 'network', label: 'Network', type: 'text', placeholder: '5G, Dual SIM' },
  ],
  SPARE_PART: [qualityField(), { key: 'size', label: 'Size', type: 'text', placeholder: '6.4" (for screens)' }, compatibilityField()],
  ACCESSORY: [
    { key: 'color', label: 'Color', type: 'text', placeholder: 'Black' },
    compatibilityField('Most Android devices'),
  ],
  REPAIR_TOOL: [
    { key: 'power', label: 'Power / Voltage', type: 'text', placeholder: '110V-220V' },
    { key: 'temperature', label: 'Temperature Range', type: 'text', placeholder: '100°C-500°C' },
    { key: 'includes', label: "What's Included", type: 'text', placeholder: 'Station, nozzles, stand' },
    { key: 'warranty', label: 'Warranty', type: 'text', placeholder: '6 months' },
  ],
  KIDS_TAB: [
    screenSizeField(),
    storageField(),
    ramField(),
    { key: 'battery', label: 'Battery', type: 'text', placeholder: '3000 mAh' },
    { key: 'ageRange', label: 'Recommended Age', type: 'text', placeholder: '3-8 years' },
  ],
};

/** Fields for specific SPARE_PART / ACCESSORY subcategories. Anything without an entry here (including "OTHER") falls back to CATEGORY_SPEC_FIELDS. */
export const SUBCATEGORY_SPEC_FIELDS: Record<string, SpecFieldDef[]> = {
  SCREEN: [
    qualityField(),
    { key: 'size', label: 'Size', type: 'text', placeholder: '6.4"' },
    { key: 'resolution', label: 'Resolution', type: 'text', placeholder: '1080 x 2340 px' },
    compatibilityField(),
  ],
  BATTERY: [
    qualityField(),
    { key: 'capacity', label: 'Capacity', type: 'text', placeholder: '5000 mAh' },
    compatibilityField(),
  ],
  CHARGING_FLEX: [qualityField(), { key: 'connector', label: 'Connector Type', type: 'text', placeholder: 'USB-C' }, compatibilityField()],
  CAMERA: [qualityField(), { key: 'resolution', label: 'Resolution', type: 'text', placeholder: '50MP' }, compatibilityField()],
  SPEAKER: [
    qualityField(),
    { key: 'partType', label: 'Part Type', type: 'select', options: ['Loud Speaker', 'Earpiece', 'Loud Speaker + Earpiece'] },
    compatibilityField(),
  ],
  HOUSING: [qualityField(), { key: 'color', label: 'Color', type: 'text', placeholder: 'Black' }, compatibilityField()],
  MOTHERBOARD: [
    { key: 'condition', label: 'Condition', type: 'select', options: ['Tested Working', 'For Parts / Repair'] },
    { key: 'chipset', label: 'Chipset', type: 'text', placeholder: 'MediaTek MT6769' },
    compatibilityField(),
  ],
  PHONE_COVER: [
    { key: 'material', label: 'Material', type: 'select', options: ['Silicone', 'Leather', 'Hard Case', 'Clear / Transparent'] },
    { key: 'color', label: 'Color', type: 'text', placeholder: 'Black' },
    compatibilityField('Galaxy A54 5G'),
  ],
  CHARGER: [
    { key: 'wattage', label: 'Wattage', type: 'text', placeholder: '20W' },
    { key: 'connector', label: 'Connector Type', type: 'text', placeholder: 'USB-C' },
    compatibilityField('Most Android devices'),
  ],
  CABLE: [
    { key: 'connector', label: 'Connector Type', type: 'text', placeholder: 'USB-C to USB-C' },
    { key: 'length', label: 'Length', type: 'text', placeholder: '1m' },
    compatibilityField('Most Android devices'),
  ],
  EARPHONE: [
    { key: 'connectionType', label: 'Connection', type: 'select', options: ['Wired', 'Bluetooth', 'True Wireless (TWS)'] },
    { key: 'color', label: 'Color', type: 'text', placeholder: 'Black' },
  ],
  SCREEN_PROTECTOR: [
    { key: 'material', label: 'Material', type: 'select', options: ['Tempered Glass', 'Hydrogel', 'PET Film'] },
    compatibilityField('Galaxy A54 5G'),
  ],
};

/** Resolves the effective field set for a (category, subcategory) pair, falling back to the category-level set. */
export function getSpecFields(category: ProductCategory, subcategory: string | null | undefined): SpecFieldDef[] {
  if (subcategory && SUBCATEGORY_SPEC_FIELDS[subcategory]) return SUBCATEGORY_SPEC_FIELDS[subcategory];
  return CATEGORY_SPEC_FIELDS[category] ?? [];
}

/** Splits a flat specs object into { known fields for this category/subcategory, leftover extras }. */
export function splitSpecs(
  specs: Record<string, unknown> | null | undefined,
  category: ProductCategory,
  subcategory: string | null | undefined
): { structured: Record<string, string>; extras: { key: string; value: string }[] } {
  const fields = getSpecFields(category, subcategory);
  const knownKeys = new Set(fields.map((f) => f.key));
  const structured: Record<string, string> = {};
  const extras: { key: string; value: string }[] = [];

  for (const [key, value] of Object.entries(specs ?? {})) {
    const stringValue = String(value);
    if (knownKeys.has(key)) {
      structured[key] = stringValue;
    } else {
      extras.push({ key, value: stringValue });
    }
  }

  return { structured, extras };
}
