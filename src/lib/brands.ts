// Brands offered as quick-select options in the admin product form. Not an
// exhaustive/enforced list — products can still carry any brand string via
// the "Other" fallback (e.g. spare-part/tool brands like "KADA").
export const PRODUCT_BRANDS = [
  'Samsung',
  'Apple',
  'Tecno',
  'Infinix',
  'itel',
  'Xiaomi',
  'Vivo',
  'Oppo',
  'Realme',
  'Nokia',
  'Huawei',
  'Honor',
] as const;

// Model options for the admin form's Brand -> Model cascading dropdown.
// Deliberately duplicated from src/schemaTypes/brandData.ts (used by Sanity
// Studio) rather than imported from it — keeps this app-facing admin form
// decoupled from the Sanity schema module. Brands not listed here (or any
// model not in a listed brand's array) fall back to free text via the form's
// "Other" option, so this doesn't need to be exhaustive.
export const BRAND_MODELS_MAP: Record<string, string[]> = {
  Apple: [
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12',
    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone SE (3rd Gen)',
  ],
  Samsung: [
    'Galaxy Z Fold6', 'Galaxy Z Flip6', 'Galaxy Z Fold5',
    'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25',
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE',
    'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
    'Galaxy A55 5G', 'Galaxy A35 5G', 'Galaxy A25 5G', 'Galaxy A15 5G', 'Galaxy A14',
  ],
  Tecno: [
    'Phantom V Fold2 5G', 'Phantom V Flip2 5G', 'Phantom X2 Pro 5G',
    'Camon 30 Premier 5G', 'Camon 30 Pro 5G', 'Camon 30 5G',
    'Pova 6 Pro 5G', 'Spark 30 Pro', 'Spark 30 5G', 'Pop 9',
    'Camon 20 Pro', 'Spark 8 Pro',
  ],
  Infinix: [
    'Zero Flip 5G', 'Zero 40 5G', 'GT 20 Pro 5G',
    'Note 40 Pro+ 5G', 'Note 40 Pro 5G', 'Note 40 5G',
    'Hot 50 Pro+', 'Hot 50 5G', 'Smart 9', 'Smart 8 Pro',
  ],
  itel: [
    'itel ColorPro 5G', 'itel S24', 'itel S23+', 'itel P55 5G',
    'itel A70', 'itel A50', 'itel A05s',
  ],
  Xiaomi: [
    'Xiaomi 14 Ultra', 'Xiaomi 14', 'Redmi Note 13 Pro+ 5G',
    'Redmi Note 13 Pro', 'Redmi 13C', 'Poco X6 Pro',
  ],
};
