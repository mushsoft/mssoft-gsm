// schemaTypes/inventoryItem.ts
import { defineField, defineType } from 'sanity'
import { ALL_BRANDS } from './brandData'
import { DynamicModelInput } from '../components/DynamicModelInput'

export const inventoryItem = defineType({
  name: 'inventoryItem',
  title: 'Inventory & Spare Parts',
  type: 'document',
  fields: [
    // --- 1. ITEM CATEGORY SELECTION ---
    defineField({
      name: 'category',
      title: 'Item Category',
      type: 'string',
      options: {
        list: [
          { title: 'Complete Phone Device', value: 'phone' },
          { title: 'Display / Screen Assembly', value: 'screen' },
          { title: 'Battery', value: 'battery' },
          { title: 'Charging Port / Flex Cable', value: 'charging_flex' },
          { title: 'Back Cover / Glass', value: 'back_cover' },
          { title: 'Camera Module', value: 'camera_module' },
          { title: 'Other Spare Parts', value: 'other_spares' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- 2. BRAND SELECTION (Appears after Category is selected) ---
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: ALL_BRANDS.map((brandName) => ({ title: brandName, value: brandName })),
      },
      hidden: ({ document }) => !document?.category,
      validation: (Rule) => Rule.required(),
    }),

    // --- 3. DYNAMIC MODEL SELECTION (Appears after Brand is selected) ---
    defineField({
      name: 'model',
      title: 'Primary Model',
      type: 'string',
      components: {
        input: DynamicModelInput, // Our custom component handles the dynamic filter
      },
      hidden: ({ document }) => !document?.brand,
      validation: (Rule) => Rule.required(),
    }),

    // --- 4. PHONE SPECIFICATIONS (Only visible if Category is 'phone') ---
    defineField({
      name: 'phoneSpecs',
      title: 'Phone Specifications',
      type: 'object',
      hidden: ({ document }) => document?.category !== 'phone',
      fields: [
        { name: 'ram', title: 'RAM Size (GB)', type: 'string' },
        { name: 'storage', title: 'Internal Storage (GB/TB)', type: 'string' },
        { name: 'color', title: 'Color', type: 'string' },
        {
          name: 'condition',
          title: 'Condition',
          type: 'string',
          options: { list: ['Brand New', 'Refurbished', 'Used'] },
        },
        { name: 'processor', title: 'Processor / Chipset', type: 'string' },
      ],
    }),

    // --- 5. SCREEN DETAILS (Only visible if Category is 'screen') ---
    defineField({
      name: 'screenSpecs',
      title: 'Screen & Display Details',
      type: 'object',
      hidden: ({ document }) => document?.category !== 'screen',
      fields: [
        {
          name: 'displayType',
          title: 'Display Tech / Type',
          type: 'string',
          options: {
            list: [
              'OLED',
              'AMOLED',
              'Super AMOLED',
              'IPS LCD',
              'Original Pull / OEM Dismantled',
            ],
          },
        },
        {
          name: 'frameIncluded',
          title: 'Includes Middle Frame / Housing?',
          type: 'boolean',
          initialValue: false,
        },
        { name: 'refreshRate', title: 'Refresh Rate (e.g. 90Hz, 120Hz)', type: 'string' },
      ],
    }),

    // --- 6. BATTERY DETAILS (Only visible if Category is 'battery') ---
    defineField({
      name: 'batterySpecs',
      title: 'Battery Details',
      type: 'object',
      hidden: ({ document }) => document?.category !== 'battery',
      fields: [
        { name: 'capacity', title: 'Capacity (mAh)', type: 'number' },
        { name: 'isOriginal', title: 'Original OEM Battery?', type: 'boolean', initialValue: true },
        { name: 'batteryHealth', title: 'Health Percentage (if used/refurbished)', type: 'number' },
      ],
    }),

    // --- 7. CHARGING FLEX / BACK COVER DETAILS ---
    defineField({
      name: 'flexSpecs',
      title: 'Spare Part Technical Info',
      type: 'object',
      hidden: ({ document }) =>
        !['charging_flex', 'back_cover', 'camera_module', 'other_spares'].includes(
          document?.category as string
        ),
      fields: [
        { name: 'partNumber', title: 'OEM Part Number (if applicable)', type: 'string' },
        { name: 'colorVariant', title: 'Color (for Back Glass / Covers)', type: 'string' },
        { name: 'includesMic', title: 'Includes Microphone (for Charging Flex)', type: 'boolean' },
      ],
    }),

    // --- 8. CROSS-MODEL COMPATIBILITY LIST (For Spare Parts) ---
    defineField({
      name: 'compatibleModels',
      title: 'Cross-Model Compatibility List',
      description:
        'Add all other models this spare part can be installed into (e.g. Screen fits both Galaxy A15 and A25)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.category === 'phone' || !document?.category,
    }),

    // --- 9. SPARE PART QUALITY / GRADE ---
    defineField({
      name: 'partCondition',
      title: 'Part Quality Grade',
      type: 'string',
      options: {
        list: [
          { title: 'Original Service Pack (OEM)', value: 'service_pack' },
          { title: 'High Quality Aftermarket (AAA Grade)', value: 'aftermarket_aaa' },
          { title: 'Used / Clean Dismantled Original', value: 'used_original' },
        ],
      },
      hidden: ({ document }) => document?.category === 'phone' || !document?.category,
    }),

    // --- 10. PRICING & STOCK ---
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 1,
    }),
  ],
})