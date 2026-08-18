-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "username" TEXT,
ADD COLUMN "phone" TEXT,
ADD COLUMN "referralSource" TEXT;

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "productId" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");
CREATE INDEX "PageView_productId_idx" ON "PageView"("productId");

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
