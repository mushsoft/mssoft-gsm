// A price of 0 means "not priced yet": the product shows "Ask for price",
// can't be added to the cart or checked out, and is ordered on WhatsApp.
export const ASK_FOR_PRICE = 'Ask for price';

export function hasPrice(price: number): boolean {
  return price > 0;
}

export function priceText(price: number): string {
  return hasPrice(price) ? `UGX ${price.toLocaleString('en-US')}` : ASK_FOR_PRICE;
}

// The pre-filled WhatsApp message for a product.
export function orderMessage(title: string, price: number): string {
  return hasPrice(price)
    ? `Hello MS Soft GSM! I want to ORDER this:\n\n📌 *${title}*\n💰 Price: ${priceText(price)}`
    : `Hello MS Soft GSM! What is the price of this?\n\n📌 *${title}*`;
}
