export interface BatterySpare {
  id: string;
  name: string;
  brand: string;
  model: string;
  code?: string;
  capacity: string; // e.g. '5000 mAh'
  quality: 'Original Pure Cobalt' | 'OEM Replacement' | 'High Capacity';
  priceUGX: number;
  inStock: boolean;
  compatibility?: string[];
  imageUrl?: string;
}

export const BATTERY_SPARES_DATA: BatterySpare[] = [
  {
    id: 'bat-sam-a54',
    name: 'Samsung Galaxy A54 5G Battery (EB-BA546ABY)',
    brand: 'Samsung',
    model: 'Galaxy A54 5G',
    code: 'EB-BA546ABY',
    capacity: '5000 mAh',
    quality: 'Original Pure Cobalt',
    priceUGX: 65000,
    inStock: true,
    compatibility: ['SM-A546B', 'SM-A546U'],
  },
  {
    id: 'bat-app-ip13',
    name: 'iPhone 13 Battery with Texas Instruments BMS',
    brand: 'Apple',
    model: 'iPhone 13',
    code: '616-00828',
    capacity: '3227 mAh',
    quality: 'Original Pure Cobalt',
    priceUGX: 110000,
    inStock: true,
    compatibility: ['A2633', 'A2482'],
  },
  {
    id: 'bat-tec-camon20',
    name: 'Tecno Camon 20 / 20 Pro Battery (BL-49NX)',
    brand: 'Tecno',
    model: 'Camon 20 Pro',
    code: 'BL-49NX',
    capacity: '5000 mAh',
    quality: 'OEM Replacement',
    priceUGX: 45000,
    inStock: true,
    compatibility: ['CK7n', 'CK8n', 'CK6'],
  },
  {
    id: 'bat-inf-note30',
    name: 'Infinix Note 30 / Note 30 Pro Battery (BL-49PX)',
    brand: 'Infinix',
    model: 'Note 30 Pro',
    code: 'BL-49PX',
    capacity: '5000 mAh',
    quality: 'OEM Replacement',
    priceUGX: 50000,
    inStock: true,
    compatibility: ['X678B', 'X6716'],
  },
  {
    id: 'bat-xia-redmi12',
    name: 'Xiaomi Redmi 12 / Poco M6 Battery (BN50)',
    brand: 'Xiaomi',
    model: 'Redmi 12',
    code: 'BN50',
    capacity: '5000 mAh',
    quality: 'OEM Replacement',
    priceUGX: 48000,
    inStock: true,
    compatibility: ['23053RN02Y', '23053RN02I'],
  },
];