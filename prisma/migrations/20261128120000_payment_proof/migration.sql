-- Screenshot-proved wallet top-ups (Mobile Money merchant and Binance).
ALTER TABLE "ShopProfile" ADD COLUMN "mtnMerchantCode" TEXT,
ADD COLUMN "airtelMerchantCode" TEXT,
ADD COLUMN "binancePayId" TEXT,
ADD COLUMN "binanceName" TEXT;

CREATE TABLE "PaymentProof" (
    "id" TEXT NOT NULL,
    "walletTransactionId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "sha256" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentProof_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PaymentProof_walletTransactionId_key" ON "PaymentProof"("walletTransactionId");
CREATE INDEX "PaymentProof_sha256_idx" ON "PaymentProof"("sha256");

ALTER TABLE "PaymentProof" ADD CONSTRAINT "PaymentProof_walletTransactionId_fkey" FOREIGN KEY ("walletTransactionId") REFERENCES "WalletTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- The owner's Binance account, only if nobody has set one yet.
UPDATE "ShopProfile" SET "binancePayId" = '1054278311', "binanceName" = 'Ms soft' WHERE "binancePayId" IS NULL;
