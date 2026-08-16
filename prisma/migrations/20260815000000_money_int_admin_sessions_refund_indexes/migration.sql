-- Money fields: Float -> Int. UGX has no widely-used subunit, so these were
-- always effectively whole numbers; this removes binary-float rounding risk
-- from all financial math (coupon percentages, order totals, etc).
ALTER TABLE "Product" ALTER COLUMN "price" TYPE INTEGER USING ROUND("price")::INTEGER;
ALTER TABLE "Product" ALTER COLUMN "originalPrice" TYPE INTEGER USING ROUND("originalPrice")::INTEGER;
ALTER TABLE "Order" ALTER COLUMN "totalAmount" TYPE INTEGER USING ROUND("totalAmount")::INTEGER;
ALTER TABLE "Order" ALTER COLUMN "discountAmount" TYPE INTEGER USING ROUND("discountAmount")::INTEGER;
ALTER TABLE "OrderItem" ALTER COLUMN "price" TYPE INTEGER USING ROUND("price")::INTEGER;
ALTER TABLE "Coupon" ALTER COLUMN "value" TYPE INTEGER USING ROUND("value")::INTEGER;

-- New terminal payment status for admin-issued refunds.
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'REFUNDED';

-- Real, revocable admin sessions (replaces a deterministic-HMAC token that
-- never expired and couldn't be invalidated server-side).
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");

-- Indexes for hot query paths (foreign keys used in filters/joins, fields
-- used in admin orderBy) that weren't automatically covered.
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
CREATE INDEX "Order_couponCode_idx" ON "Order"("couponCode");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");
CREATE INDEX "Review_productId_idx" ON "Review"("productId");
