import Link from 'next/link';
import { Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getOrCreateCustomer } from '@/lib/customerAuth';
import ReviewForm from './ReviewForm';
import DeleteReviewButton from './DeleteReviewButton';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-3.5 w-3.5 ${n <= rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-300 dark:text-neutral-700'}`} />
      ))}
    </div>
  );
}

export default async function ReviewsSection({ productId }: { productId: string }) {
  // Sequential, not Promise.all — running review.findMany() concurrently
  // with getOrCreateCustomer()'s customer.upsert() over the same pooled
  // connection triggered a Postgres protocol error ("bind message supplies
  // 1 parameters, but prepared statement requires 0") in this environment.
  const reviews = await prisma.review.findMany({
    where: { productId },
    include: { customer: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  const customer = await getOrCreateCustomer();

  const average = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const ownReview = customer ? reviews.find((r) => r.customerId === customer.id) : undefined;

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-sm font-black text-neutral-900 dark:text-white">Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <StarRating rating={Math.round(average)} />
            <span>
              {average.toFixed(1)} ({reviews.length} review{reviews.length === 1 ? '' : 's'})
            </span>
          </div>
        )}
      </div>

      {customer && !ownReview && <ReviewForm productId={productId} />}
      {!customer && (
        <p className="rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800 p-3 text-xs text-neutral-500">
          <Link href="/account/login" className="font-bold text-amber-500 hover:underline">
            Sign in
          </Link>{' '}
          to leave a review.
        </p>
      )}

      {reviews.length > 0 && (
        <div className="mt-4 space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {review.customer.name ?? review.customer.email.split('@')[0]}
                  </span>
                </div>
                {customer?.id === review.customerId && <DeleteReviewButton reviewId={review.id} />}
              </div>
              {review.title && <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{review.title}</p>}
              <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">{review.body}</p>
              <p className="mt-1 text-[10px] text-neutral-400">{review.createdAt.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
