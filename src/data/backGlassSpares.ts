export interface BackGlassSpare {
  id: string;
  name: string;
  brand: string;
  model: string;
  code?: string;
  quality: 'Original Glass' | 'OEM Replacement';
  priceUGX: number;
  inStock: boolean;
  compatibility?: string[];
  imageUrl?: string;
}

export const BACK_GLASS_SPARES_DATA: BackGlassSpare[] = [
  {
    id: 'bg-sam-a54',
    name: 'Samsung Galaxy A54 5G Back Glass Cover with Adhesive',
    brand: 'Samsung',
    model: 'Galaxy A54 5G',
    code: 'SM-A546B',
    quality: 'Original Glass',
    priceUGX: 35000,
    inStock: true,
    compatibility: ['SM-A546B', 'SM-A546U'],
  },
  {
    id: 'bg-app-ip13',
    name: 'iPhone 13 Rear Glass Panel (Big Hole Camera Lens)',
    brand: 'Apple',
    model: 'iPhone 13',
    code: 'A2633',
    quality: 'Original Glass',
    priceUGX: 55000,
    inStock: true,
    compatibility: ['A2633', 'A2482'],
  },
  {
    id: 'bg-tec-camon20',
    name: 'Tecno Camon 20 Pro Back Housing Door',
    brand: 'Tecno',
    model: 'Camon 20 Pro',
    code: 'CK7n',
    quality: 'OEM Replacement',
    priceUGX: 25000,
    inStock: true,
    compatibility: ['CK7n'],
  },
  {
    id: 'bg-inf-note30',
    name: 'Infinix Note 30 Pro Rear Battery Door Cover',
    brand: 'Infinix',
    model: 'Note 30 Pro',
    code: 'X678B',
    quality: 'OEM Replacement',
    priceUGX: 28000,
    inStock: true,
    compatibility: ['X678B'],
  },
];