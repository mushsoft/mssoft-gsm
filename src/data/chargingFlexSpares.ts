export interface ChargingFlexSpare {
  id: string;
  name: string;
  brand: string;
  model: string;
  code?: string;
  quality: 'Original with IC & Mic' | 'Copy Flex';
  features?: string[]; // e.g. ['Fast Charge IC', 'Mic Included', 'OTG Support']
  priceUGX: number;
  inStock: boolean;
  compatibility?: string[];
  imageUrl?: string;
}

export const CHARGING_FLEX_DATA: ChargingFlexSpare[] = [
  {
    id: 'chr-sam-a54',
    name: 'Samsung Galaxy A54 Charging Sub-Board with Mic & IC',
    brand: 'Samsung',
    model: 'Galaxy A54 5G',
    code: 'SM-A546B Charging Board',
    quality: 'Original with IC & Mic',
    features: ['Fast Charge IC', 'Noise Canceling Mic', 'OTG Support'],
    priceUGX: 35000,
    inStock: true,
    compatibility: ['SM-A546B', 'SM-A546U'],
  },
  {
    id: 'chr-app-ip13',
    name: 'iPhone 13 Charging Port Flex Cable (Black/White)',
    brand: 'Apple',
    model: 'iPhone 13',
    code: 'A2633 Charge Flex',
    quality: 'Original with IC & Mic',
    features: ['Dual Mic IC', 'Original Port Connector'],
    priceUGX: 85000,
    inStock: true,
    compatibility: ['A2633', 'A2482'],
  },
  {
    id: 'chr-tec-camon20',
    name: 'Tecno Camon 20 Pro Charging Dock Sub-Board',
    brand: 'Tecno',
    model: 'Camon 20 Pro',
    code: 'CK7n Sub-Board',
    quality: 'Original with IC & Mic',
    features: ['Fast Charge IC', 'Mic Board'],
    priceUGX: 25000,
    inStock: true,
    compatibility: ['CK7n'],
  },
  {
    id: 'chr-inf-note30',
    name: 'Infinix Note 30 Pro Fast Charge Flex Cable',
    brand: 'Infinix',
    model: 'Note 30 Pro',
    code: 'X678B Charge Board',
    quality: 'Original with IC & Mic',
    features: ['68W Fast Charge IC', 'Mic Board'],
    priceUGX: 28000,
    inStock: true,
    compatibility: ['X678B'],
  },
];