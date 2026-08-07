type RuleType = {
  required: () => unknown;
};

const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Phones', value: 'phones' },
          { title: 'Repair Tools', value: 'tools' },
          { title: 'Screens', value: 'screens' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Other Spares', value: 'spares' },
          { title: 'Kids Tabs', value: 'kids-tabs' },
          { title: 'Testpoints', value: 'testpoints' },
        ],
      },
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          { title: 'EDL / Qualcomm Testpoints', value: 'qualcomm' },
          { title: 'MTK / MediaTek BROM Pinouts', value: 'mediatek' },
          { title: 'Samsung Hardware ISP', value: 'samsung-isp' },
          { title: 'iPhone Board Schematics', value: 'iphone-tp' },
          { title: 'Blowers & Hot Air', value: 'blowers' },
          { title: 'Separators', value: 'separators' },
          { title: 'DC Power Supply', value: 'power-supply' },
          { title: 'Microscopes', value: 'microscopes' },
          { title: 'Multimeters', value: 'multimeters' },
          { title: 'Soldering Guns', value: 'soldering-guns' },
          { title: 'Laminators & Debubblers', value: 'laminators' },
          { title: 'Touch Screens', value: 'touch' },
          { title: 'Complete Screens', value: 'complete' },
          { title: 'Chargers & Powerbanks', value: 'chargers' },
          { title: 'Back Covers & Housings', value: 'housings' },
        ],
      },
    },
    {
      name: 'itemCondition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'Brand New', value: 'brand_new' },
          { title: 'UK Used', value: 'uk_used' },
        ],
      },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
          { title: 'Apple', value: 'Apple' },
          { title: 'Samsung', value: 'Samsung' },
          { title: 'Tecno', value: 'Tecno' },
          { title: 'Infinix', value: 'Infinix' },
          { title: 'itel', value: 'itel' },
          { title: 'Vivo', value: 'Vivo' },
          { title: 'Google Pixel', value: 'Pixel' },
          { title: 'Oppo', value: 'Oppo' },
          { title: 'Lenovo', value: 'Lenovo' },
          { title: 'Xiaomi', value: 'Xiaomi' },
          { title: 'Nokia', value: 'Nokia' },
          { title: 'ZTE', value: 'ZTE' },
          { title: 'TCL', value: 'TCL' },
          { title: 'Sharp', value: 'Sharp' },
          { title: 'OnePlus', value: 'OnePlus' },
          { title: 'Motorola', value: 'Motorola' },
          { title: 'Kyocera', value: 'Kyocera' },
          { title: 'Huawei', value: 'Huawei' },
          { title: 'Honor', value: 'Honor' },
          { title: 'Alcatel', value: 'Alcatel' },
          { title: 'HMD', value: 'HMD' },
          { title: 'LG', value: 'LG' },
          { title: 'Sony', value: 'Sony' },
          { title: 'Wiko', value: 'Wiko' },
          { title: 'Realme', value: 'Realme' },
          { title: 'Nothing', value: 'Nothing' },
        ],
      },
    },
    {
      name: 'price',
      title: 'Price (UGX)',
      type: 'number',
    },
    {
      name: 'originalPrice',
      title: 'Original Price (UGX)',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isSoldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    },
  ],
};

export type ProductCondition = 'New' | 'Like New' | 'Refurbished' | 'Used';

export interface TechSpecs {
  modelCode: string;          // e.g. "SM-S928B"
  chipset: string;            // e.g. "Snapdragon 8 Gen 3"
  display: string;            // e.g. "6.8" Dynamic AMOLED 2X, 120Hz"
  battery: string;            // e.g. "5000 mAh"
  ramStorage: string;         // e.g. "12GB RAM / 256GB Storage"
  network: string;            // e.g. "5G / Dual SIM"
  cameras: string;            // e.g. "200MP Main / 12MP Ultra-Wide / 50MP Telephoto"
  verifiedByTech?: boolean;   // Adds the "Technician Verified" trust badge
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  priceUgx: number;
  originalPriceUgx?: number;
  condition: ProductCondition;
  image: string;
  inStock: boolean;
  specs: TechSpecs;
}
export default product;