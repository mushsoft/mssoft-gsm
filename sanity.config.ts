import { defineConfig, StringInputProps, useFormValue, defineField, defineType } from 'sanity';
import { structureTool } from 'sanity/structure';

// ==========================================
// 1. FULL 18-BRAND & MODEL MAPPING DATA
// ==========================================
const BRAND_MODELS_MAP: Record<string, string[]> = {
  Apple: [
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 mini', 'iPhone 12',
    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
    'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
    'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone 6s Plus', 'iPhone 6s',
    'iPhone SE (3rd Gen)', 'iPhone SE (2nd Gen)',
  ],

  Samsung: [
    'Galaxy Z Fold6', 'Galaxy Z Flip6', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy Z Fold4', 'Galaxy Z Flip4',
    'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25',
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE',
    'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
    'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
    'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21', 'Galaxy S21 FE',
    'Galaxy S20 Ultra', 'Galaxy S20+', 'Galaxy S20', 'Galaxy S20 FE',
    'Galaxy S10+', 'Galaxy S10', 'Galaxy S10e', 'Galaxy Note 20 Ultra', 'Galaxy Note 10+',
    'Galaxy A55 5G', 'Galaxy A35 5G', 'Galaxy A25 5G', 'Galaxy A15 5G', 'Galaxy A15 4G', 'Galaxy A05s', 'Galaxy A05',
    'Galaxy A54 5G', 'Galaxy A34 5G', 'Galaxy A24', 'Galaxy A14 5G', 'Galaxy A14 4G', 'Galaxy A04s', 'Galaxy A04',
    'Galaxy A53 5G', 'Galaxy A33 5G', 'Galaxy A23', 'Galaxy A13', 'Galaxy A03s', 'Galaxy A03 Core',
    'Galaxy A52s 5G', 'Galaxy A52', 'Galaxy A32', 'Galaxy A22', 'Galaxy A12', 'Galaxy A02s', 'Galaxy A02',
    'Galaxy A51', 'Galaxy A71', 'Galaxy A31', 'Galaxy A21s', 'Galaxy A11', 'Galaxy A10s', 'Galaxy A10',
    'Galaxy M54', 'Galaxy M34', 'Galaxy M14', 'Galaxy M13', 'Galaxy M12', 'Galaxy M11',
  ],

  Tecno: [
    'Camon 30 Premier 5G', 'Camon 30 Pro 5G', 'Camon 30 5G', 'Camon 30 4G', 'Camon 30 LOONG',
    'Camon 20 Premier 5G', 'Camon 20 Pro 5G', 'Camon 20 Pro', 'Camon 20',
    'Camon 19 Pro 5G', 'Camon 19 Pro', 'Camon 19 Neo', 'Camon 19',
    'Camon 18 Premier', 'Camon 18P', 'Camon 18i', 'Camon 18',
    'Camon 17 Pro', 'Camon 17P', 'Camon 17', 'Camon 16 Pro', 'Camon 16 Premier', 'Camon 16', 'Camon 15',
    'Spark 30 Pro', 'Spark 30 5G', 'Spark 30', 'Spark 30C',
    'Spark 20 Pro+', 'Spark 20 Pro', 'Spark 20 4G', 'Spark 20C',
    'Spark 10 Pro', 'Spark 10 5G', 'Spark 10C', 'Spark 10',
    'Spark 9 Pro', 'Spark 9T', 'Spark 9',
    'Spark 8 Pro', 'Spark 8C', 'Spark 8P', 'Spark 8',
    'Spark 7 Pro', 'Spark 7T', 'Spark 7P', 'Spark 7', 'Spark 6 Go', 'Spark 6', 'Spark 5 Pro', 'Spark 5',
    'Phantom V Fold2 5G', 'Phantom V Flip2 5G', 'Phantom V Fold', 'Phantom V Flip', 'Phantom X2 Pro', 'Phantom X2',
    'Pova 6 Pro 5G', 'Pova 6 Neo', 'Pova 5 Pro 5G', 'Pova 5', 'Pova 4 Pro', 'Pova 4', 'Pova 3', 'Pova 2', 'Pova Neo 3', 'Pova Neo 2', 'Pova Neo',
    'Pop 9', 'Pop 8', 'Pop 7 Pro', 'Pop 7', 'Pop 6 Pro', 'Pop 6', 'Pop 5 Pro', 'Pop 5', 'Pop 4 Pro', 'Pop 4',
  ],

  Infinix: [
    'Note 40 Pro+ 5G', 'Note 40 Pro 5G', 'Note 40 Pro 4G', 'Note 40 5G', 'Note 40',
    'Note 30 VIP', 'Note 30 Pro', 'Note 30 5G', 'Note 30', 'Note 30i',
    'Note 12 Pro 5G', 'Note 12 Pro', 'Note 12 VIP', 'Note 12 G96', 'Note 12',
    'Note 11 Pro', 'Note 11', 'Note 11s', 'Note 10 Pro', 'Note 10', 'Note 8', 'Note 8i', 'Note 7', 'Note 7 Lite',
    'Hot 50 Pro+', 'Hot 50 5G', 'Hot 50 4G', 'Hot 50i',
    'Hot 40 Pro', 'Hot 40 4G', 'Hot 40i',
    'Hot 30 5G', 'Hot 30', 'Hot 30i', 'Hot 30 Play',
    'Hot 20 5G', 'Hot 20', 'Hot 20i', 'Hot 20 Play', 'Hot 20S',
    'Hot 12', 'Hot 12 Pro', 'Hot 12i', 'Hot 12 Play',
    'Hot 11', 'Hot 11S', 'Hot 11 Play', 'Hot 10', 'Hot 10T', 'Hot 10S', 'Hot 10 Play', 'Hot 10 Lite',
    'Hot 9', 'Hot 9 Pro', 'Hot 9 Play', 'Hot 8', 'Hot 8 Lite',
    'Zero Flip 5G', 'Zero 40 5G', 'Zero 40 4G', 'Zero 30 5G', 'Zero 30 4G', 'Zero Ultra', 'Zero 20', 'Zero 5G',
    'GT 20 Pro 5G', 'GT 10 Pro',
    'Smart 9', 'Smart 8 Pro', 'Smart 8 HD', 'Smart 8', 'Smart 7 HD', 'Smart 7', 'Smart 6 HD', 'Smart 6 Plus', 'Smart 6', 'Smart 5', 'Smart 4',
  ],

  itel: [
    'itel S24', 'itel S23+', 'itel S23', 'itel S18 Pro', 'itel S18', 'itel S17', 'itel S16 Pro', 'itel S16',
    'itel P55 5G', 'itel P55+', 'itel P55', 'itel P55T', 'itel P40+', 'itel P40', 'itel P38 Pro', 'itel P38', 'itel P37 Pro', 'itel P37', 'itel P36 Pro', 'itel P36',
    'itel ColorPro 5G',
    'itel A70', 'itel A50', 'itel A05s', 'itel A04', 'itel A60s', 'itel A60', 'itel A58 Pro', 'itel A58', 'itel A56 Pro', 'itel A56', 'itel A36', 'itel A33',
  ],

  Xiaomi: [
    'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13T', 'Xiaomi 13 Ultra', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 12T Pro', 'Xiaomi 12T', 'Xiaomi 12 Pro', 'Xiaomi 12',
    'Redmi Note 13 Pro+ 5G', 'Redmi Note 13 Pro 5G', 'Redmi Note 13 Pro 4G', 'Redmi Note 13 5G', 'Redmi Note 13 4G',
    'Redmi Note 12 Pro+ 5G', 'Redmi Note 12 Pro 5G', 'Redmi Note 12 Pro 4G', 'Redmi Note 12 5G', 'Redmi Note 12 4G', 'Redmi Note 12S',
    'Redmi Note 11 Pro+ 5G', 'Redmi Note 11 Pro 5G', 'Redmi Note 11 Pro 4G', 'Redmi Note 11', 'Redmi Note 11S',
    'Redmi Note 10 Pro', 'Redmi Note 10 5G', 'Redmi Note 10', 'Redmi Note 10S', 'Redmi Note 9 Pro', 'Redmi Note 9', 'Redmi Note 8 Pro', 'Redmi Note 8',
    'Redmi 13', 'Redmi 13C 5G', 'Redmi 13C', 'Redmi 12 5G', 'Redmi 12', 'Redmi 12C', 'Redmi 10 2022', 'Redmi 10', 'Redmi 10C', 'Redmi 10A', 'Redmi 9A', 'Redmi 9C', 'Redmi 9T',
    'Poco X6 Pro', 'Poco X6', 'Poco X5 Pro', 'Poco X5', 'Poco X4 Pro', 'Poco X3 Pro', 'Poco X3 NFC',
    'Poco M6 Pro', 'Poco M6', 'Poco M5s', 'Poco M5', 'Poco M4 Pro', 'Poco M3 Pro', 'Poco M3',
    'Poco F6 Pro', 'Poco F6', 'Poco F5', 'Poco F4 GT',
  ],

  Oppo: [
    'Reno12 Pro', 'Reno12', 'Reno12 F', 'Reno11 Pro', 'Reno11', 'Reno11 F', 'Reno10 Pro+', 'Reno10 Pro', 'Reno10', 'Reno8 Pro', 'Reno8', 'Reno8 T 5G', 'Reno8 T', 'Reno7 Pro', 'Reno7 5G', 'Reno7', 'Reno6 Pro', 'Reno6', 'Reno5', 'Reno4',
    'A60', 'A58', 'A38', 'A18', 'A98 5G', 'A78 5G', 'A78 4G', 'A57 4G', 'A57s', 'A17', 'A17k', 'A16', 'A16k', 'A16e', 'A15', 'A15s', 'A54', 'A53', 'A52', 'A31', 'A92', 'A91',
    'Find X7 Ultra', 'Find X7', 'Find N3 Flip', 'Find N3', 'Find X6 Pro', 'Find X5 Pro',
  ],

  Realme: [
    'Realme 12 Pro+', 'Realme 12 Pro', 'Realme 12+', 'Realme 12', 'Realme 12x', 'Realme 11 Pro+', 'Realme 11 Pro', 'Realme 11', 'Realme 11x', 'Realme 10 Pro+', 'Realme 10 Pro', 'Realme 10', 'Realme 9 Pro+', 'Realme 9', 'Realme 8 Pro', 'Realme 8',
    'Realme C67', 'Realme C65', 'Realme C63', 'Realme C55', 'Realme C53', 'Realme C51', 'Realme C35', 'Realme C33', 'Realme C31', 'Realme C30', 'Realme C25s', 'Realme C25', 'Realme C21Y', 'Realme C11',
    'Realme GT 6', 'Realme GT 6T', 'Realme GT Neo 5', 'Realme Note 50', 'Realme Note 60',
  ],

  Nokia: [
    'Nokia G42', 'Nokia G22', 'Nokia G21', 'Nokia G20', 'Nokia G11 Plus', 'Nokia G11', 'Nokia G10',
    'Nokia C32', 'Nokia C31', 'Nokia C30', 'Nokia C22', 'Nokia C21 Plus', 'Nokia C21', 'Nokia C20', 'Nokia C12 Pro', 'Nokia C12', 'Nokia C10', 'Nokia C2 2nd Edition', 'Nokia C1 2nd Edition',
    'Nokia X30', 'Nokia X20', 'Nokia X10', 'Nokia 5.4', 'Nokia 3.4', 'Nokia 2.4', 'Nokia 1.4',
  ],

  Huawei: [
    'Pura 70 Ultra', 'Pura 70 Pro', 'Pura 70', 'P60 Pro', 'P50 Pro', 'P40 Pro', 'P40 Lite', 'P30 Pro', 'P30 Lite', 'P20 Lite',
    'Nova 12 SE', 'Nova 12i', 'Nova 11i', 'Nova 11', 'Nova 10 SE', 'Nova 10', 'Nova 9 SE', 'Nova 9', 'Nova 8i', 'Nova 7i', 'Nova 5T', 'Nova 3i',
    'Y9a', 'Y9s', 'Y9 2019', 'Y8p', 'Y7a', 'Y7p', 'Y7 2019', 'Y6p', 'Y6s', 'Y5p', 'Y5 2019',
  ],

  Vivo: [
    'Vivo V30 Pro', 'Vivo V30', 'Vivo V30e', 'Vivo V29 5G', 'Vivo V29e', 'Vivo V27 5G', 'Vivo V27e', 'Vivo V25 5G', 'Vivo V25e', 'Vivo V23 5G', 'Vivo V23e', 'Vivo V21 5G', 'Vivo V20',
    'Vivo Y100 5G', 'Vivo Y38 5G', 'Vivo Y28 5G', 'Vivo Y27 5G', 'Vivo Y27s', 'Vivo Y17s', 'Vivo Y16', 'Vivo Y02s', 'Vivo Y02', 'Vivo Y21', 'Vivo Y20', 'Vivo Y15s', 'Vivo Y12s',
    'Vivo X100 Pro', 'Vivo X100', 'Vivo X90 Pro', 'Vivo X80 Pro',
  ],

  OnePlus: [
    'OnePlus 12', 'OnePlus 12R', 'OnePlus 11 5G', 'OnePlus 10 Pro', 'OnePlus 10T', 'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 8T', 'OnePlus 8 Pro',
    'OnePlus Nord 4', 'OnePlus Nord CE 4', 'OnePlus Nord 3 5G', 'OnePlus Nord CE 3 Lite', 'OnePlus Nord 2T 5G', 'OnePlus Nord N30 5G', 'OnePlus Nord N20 SE', 'OnePlus Nord N100',
    'OnePlus Open',
  ],

  Honor: [
    'Honor Magic6 Pro', 'Honor Magic6 Lite', 'Honor Magic5 Pro', 'Honor Magic V2',
    'Honor 200 Pro', 'Honor 200', 'Honor 200 Lite', 'Honor 90', 'Honor 90 Lite', 'Honor 70', 'Honor 50',
    'Honor X9b', 'Honor X8b', 'Honor X7b', 'Honor X6a', 'Honor X5 Plus', 'Honor X9a', 'Honor X8a', 'Honor X7a',
  ],

  'Google Pixel': [
    'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9', 'Pixel 9 Pro Fold',
    'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a',
    'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a',
    'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a',
    'Pixel 5', 'Pixel 4a 5G', 'Pixel 4a', 'Pixel 4 XL',
  ],

  Motorola: [
    'Edge 50 Ultra', 'Edge 50 Pro', 'Edge 50 Fusion', 'Edge 40 Neo', 'Edge 40', 'Edge 30 Ultra', 'Edge 20 Pro',
    'Moto G85', 'Moto G54 5G', 'Moto G24 Power', 'Moto G24', 'Moto G14', 'Moto G13', 'Moto G84 5G', 'Moto G73', 'Moto G53', 'Moto G32', 'Moto G22',
    'Moto E13', 'Moto E32', 'Moto E20', 'Razr 50 Ultra', 'Razr 40 Ultra',
  ],

  ZTE: [
    'ZTE Blade V50 Smart', 'ZTE Blade V50 Design', 'ZTE Blade A54', 'ZTE Blade A34', 'ZTE Blade A73 5G', 'ZTE Blade A53', 'ZTE Blade A72 5G', 'ZTE Blade A52', 'ZTE Blade A51',
    'ZTE Nubia Z60 Ultra', 'ZTE Nubia Focus Pro 5G', 'ZTE Nubia Neo 2 5G', 'ZTE Nubia Music',
  ],

  Sony: [
    'Xperia 1 VI', 'Xperia 1 V', 'Xperia 1 IV', 'Xperia 1 III', 'Xperia 1 II',
    'Xperia 5 V', 'Xperia 5 IV', 'Xperia 5 III',
    'Xperia 10 VI', 'Xperia 10 V', 'Xperia 10 IV', 'Xperia Pro-I',
  ],

  Asus: [
    'ROG Phone 8 Pro', 'ROG Phone 8', 'ROG Phone 7 Ultimate', 'ROG Phone 7', 'ROG Phone 6', 'ROG Phone 5',
    'Zenfone 11 Ultra', 'Zenfone 10', 'Zenfone 9', 'Zenfone 8',
  ],
};

const ALL_BRANDS = Object.keys(BRAND_MODELS_MAP);

// ==========================================
// 2. DYNAMIC MODEL DROPDOWN COMPONENT
// ==========================================
function DynamicModelInput(props: StringInputProps) {
  const selectedBrand = useFormValue(['brand']) as string | undefined;

  const availableModels = selectedBrand ? BRAND_MODELS_MAP[selectedBrand] || [] : [];

  const modelOptions = availableModels.map((modelName) => ({
    title: modelName,
    value: modelName,
  }));

  const updatedProps = {
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...props.schemaType.options,
        list: modelOptions,
      },
    },
  };

  return props.renderDefault(updatedProps);
}

// ==========================================
// 3. SANITY CONFIGURATION
// ==========================================
export default defineConfig({
  name: 'default',
  title: 'Phone Hub Admin Panel',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [
      defineType({
        name: 'product',
        title: 'Products & Inventory',
        type: 'document',
        fields: [
          defineField({ name: 'title', title: 'Product Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
          
          defineField({ 
            name: 'category', 
            title: 'Main Category', 
            type: 'string', 
            options: { 
              list: [
                { title: 'Phones', value: 'PHONE' },
                { title: 'Screens & Spares', value: 'SCREEN' },
                { title: 'Accessories', value: 'ACCESSORY' },
                { title: 'Repair Tools', value: 'REPAIR_TOOL' },
                { title: 'Testpoint Diagrams', value: 'TESTPOINT' },
              ]
            },
            validation: (Rule) => Rule.required(),
          }),

          defineField({ 
            name: 'accessoryType', 
            title: 'Accessory Type', 
            type: 'string', 
            options: { 
              list: [
                { title: 'Charger / Power Adapter', value: 'CHARGER' },
                { title: 'Cover / Case', value: 'COVER' },
                { title: 'Screen Guard / Tempered Glass', value: 'SCREEN_GUARD' },
                { title: 'Earbuds / Earpods', value: 'EARBUDS' },
                { title: 'Earphones / Microphones', value: 'EARPHONE_MIC' },
              ] 
            },
            hidden: ({ document }) => document?.category !== 'ACCESSORY',
          }),

          defineField({ 
            name: 'brand', 
            title: 'Brand', 
            type: 'string',
            options: {
              list: ALL_BRANDS.map((brandName) => ({ title: brandName, value: brandName })),
            },
            validation: (Rule) => Rule.required(),
          }),

          defineField({ 
            name: 'modelName', 
            title: 'Primary Phone Model', 
            type: 'string',
            description: 'Filtered dynamically based on chosen Brand.',
            components: {
              input: DynamicModelInput,
            },
            hidden: ({ document }) => !document?.brand,
            validation: (Rule) => Rule.required(),
          }),

          // --- ITEM CONDITION (Brand New / UK Used) ---
          defineField({
            name: 'itemCondition',
            title: 'Phone / Item Condition',
            type: 'string',
            description: 'Select whether this phone or item is Brand New or UK Used',
            options: {
              list: [
                { title: 'Brand New (Sealed)', value: 'brand_new' },
                { title: 'UK Used (Clean / Refurbished)', value: 'uk_used' },
                { title: 'Open Box', value: 'open_box' },
              ],
              layout: 'radio',
              direction: 'horizontal',
            },
            initialValue: 'brand_new',
            hidden: ({ document }) => document?.category !== 'PHONE',
            validation: (Rule) => Rule.required(),
          }),

          // --- Quality/Grade (For Screens and Spare Parts) ---
          defineField({
            name: 'partCondition',
            title: 'Spare Part Quality Grade',
            type: 'string',
            options: {
              list: [
                { title: 'Original Service Pack (OEM)', value: 'service_pack' },
                { title: 'High Quality Aftermarket (AAA Grade)', value: 'aftermarket_aaa' },
                { title: 'Used / Clean Dismantled Original', value: 'used_original' },
              ],
            },
            hidden: ({ document }) => document?.category !== 'SCREEN',
          }),

          // --- Cross-Model Compatibility List ---
          defineField({
            name: 'compatibleModels',
            title: 'Compatible Models List',
            description: 'Add other models this part/accessory fits (e.g., screens or covers fitting multiple phones)',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => document?.category === 'PHONE' || !document?.category,
          }),

          defineField({ name: 'price', title: 'Price (UGX)', type: 'number', validation: (Rule) => Rule.required().min(0) }),
          defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
      }),
    ],
  },
});