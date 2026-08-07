export interface ScreenSpare {
  id: string;
  name: string;
  brand: string;
  model: string;
  code?: string;
  size?: string;         // e.g. '6.6"'
  resolution?: string;   // e.g. '1080 x 2340 px'
  quality: 'Original Service Pack' | 'OLED' | 'In-Cell' | 'TFT';
  priceUGX: number;
  inStock: boolean;
  compatibility?: string[];
  imageUrl?: string;
}

export const SCREEN_SPARES_DATA: ScreenSpare[] = [
  {
    id: 'scr-sam-a54',
    name: 'Samsung Galaxy A54 5G Display Assembly',
    brand: 'Samsung',
    model: 'Galaxy A54 5G',
    code: 'SM-A546B',
    size: '6.4"',
    resolution: '1080 x 2340 px (FHD+)',
    quality: 'Original Service Pack',
    priceUGX: 240000,
    inStock: true,
    compatibility: ['SM-A546B', 'SM-A546B/DS', 'SM-A546U'],
  },
  {
    id: 'scr-sam-a14',
    name: 'Samsung Galaxy A14 4G / 5G LCD Screen',
    brand: 'Samsung',
    model: 'Galaxy A14',
    code: 'SM-A145F / SM-A146B',
    size: '6.6"',
    resolution: '1080 x 2408 px (FHD+)',
    quality: 'In-Cell',
    priceUGX: 75000,
    inStock: true,
    compatibility: ['SM-A145F', 'SM-A146B'],
  },
  {
    id: 'scr-app-ip13',
    name: 'iPhone 13 OLED Screen Replacement with Touch Panel',
    brand: 'Apple',
    model: 'iPhone 13',
    code: 'A2633',
    size: '6.1"',
    resolution: '1170 x 2532 px',
    quality: 'OLED',
    priceUGX: 380000,
    inStock: true,
    compatibility: ['A2633', 'A2482', 'A2631', 'A2634'],
  },
  {
    id: 'scr-app-ip11',
    name: 'iPhone 11 Liquid Retina LCD Assembly',
    brand: 'Apple',
    model: 'iPhone 11',
    code: 'A2221',
    size: '6.1"',
    resolution: '828 x 1792 px',
    quality: 'In-Cell',
    priceUGX: 110000,
    inStock: true,
    compatibility: ['A2111', 'A2223', 'A2221'],
  },
  {
    id: 'scr-tec-camon20',
    name: 'Tecno Camon 20 Pro AMOLED Display',
    brand: 'Tecno',
    model: 'Camon 20 Pro',
    code: 'CK7n',
    size: '6.67"',
    resolution: '1080 x 2400 px (FHD+)',
    quality: 'OLED',
    priceUGX: 185000,
    inStock: true,
    compatibility: ['CK7n', 'CK8n'],
  },
  {
    id: 'scr-inf-note30',
    name: 'Infinix Note 30 Pro AMOLED Screen',
    brand: 'Infinix',
    model: 'Note 30 Pro',
    code: 'X678B',
    size: '6.67"',
    resolution: '1080 x 2400 px (FHD+)',
    quality: 'Original Service Pack',
    priceUGX: 195000,
    inStock: true,
    compatibility: ['X678B'],
  },
  {
    id: 'scr-xia-redmi12',
    name: 'Xiaomi Redmi 12 4G LCD Screen Assembly',
    brand: 'Xiaomi',
    model: 'Redmi 12',
    code: '23053RN02Y',
    size: '6.79"',
    resolution: '1080 x 2460 px (FHD+)',
    quality: 'In-Cell',
    priceUGX: 85000,
    inStock: true,
    compatibility: ['23053RN02Y', '23053RN02I'],
  },
];