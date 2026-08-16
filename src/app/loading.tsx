import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
    </main>
  );
}
