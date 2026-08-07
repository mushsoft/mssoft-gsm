import { Product } from '@/types/product';
import { formatUGX } from '@/lib/formatters';

// Replace with PhoneHub's primary business WhatsApp number (with country code)
const PHONEHUB_WHATSAPP_NUMBER = '256700000000'; 

export const generateWhatsAppLink = (product: Product, userNote?: string): string => {
  const lineBreak = '\n';
  
  const message = [
    `📱 *NEW ORDER REQUEST — PHONEHUB*`,
    `-----------------------------------`,
    `• *Item:* ${product.name}`,
    `• *Brand:* ${product.brand}`,
    `• *Condition:* ${product.condition}`,
    `• *Model Code:* ${product.specs.modelCode}`,
    `• *Chipset:* ${product.specs.chipset}`,
    `• *RAM/Storage:* ${product.specs.ramStorage}`,
    `• *Price:* ${formatUGX(product.priceUgx)}`,
    product.specs.verifiedByTech ? `• *Verification:* ✅ Tech Verified` : '',
    `-----------------------------------`,
    userNote ? `📝 *Note:* ${userNote}${lineBreak}` : '',
    `Is this device available for delivery in Kampala/Nansana?`
  ]
  .filter(Boolean)
  .join(lineBreak);

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${PHONEHUB_WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const handleOrderClick = (product: Product, userNote?: string) => {
  const url = generateWhatsAppLink(product, userNote);
  window.open(url, '_blank', 'noopener,noreferrer');
};