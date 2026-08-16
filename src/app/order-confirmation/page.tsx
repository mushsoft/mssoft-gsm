import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import OrderStatus from './OrderStatus';

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[75vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
        </main>
      }
    >
      <OrderStatus />
    </Suspense>
  );
}
