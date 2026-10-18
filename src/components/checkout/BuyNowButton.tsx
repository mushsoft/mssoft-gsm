const WHATSAPP_PHONE = '256773944288';

type BuyNowButtonProps = {
  productId: string;
  productTitle: string;
  price: number;
  inStock: boolean;
};

// Renders a prominent "Get" CTA that hands the customer straight to WhatsApp
// with the item and price pre-filled, rather than collecting payment details
// in-page — this project's hosted-payment checkout (pawapay/Flutterwave/
// Airtel Money) stays wired up for the cart's full checkout only.
export default function BuyNowButton({ productTitle, price, inStock }: BuyNowButtonProps) {
  if (!inStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-xs font-bold text-neutral-500"
      >
        Out of Stock
      </button>
    );
  }

  const waMessage = `Hello MS Soft GSM! I want to ORDER this:\n\n📌 *${productTitle}*\n💰 Price: UGX ${price.toLocaleString()}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-amber-400 active:scale-95"
    >
      Get
    </a>
  );
}
