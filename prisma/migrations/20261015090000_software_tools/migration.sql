-- AlterTable
ALTER TABLE "ShopProfile" ADD COLUMN "creditRateUgx" INTEGER NOT NULL DEFAULT 4300;

-- CreateTable
CREATE TABLE "SoftwareTool" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "creditCost" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoftwareTool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SoftwareTool_category_idx" ON "SoftwareTool"("category");
