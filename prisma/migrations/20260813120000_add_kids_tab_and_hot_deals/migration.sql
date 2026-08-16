-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'KIDS_TAB';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "originalPrice" DOUBLE PRECISION,
ADD COLUMN "isHotDeal" BOOLEAN NOT NULL DEFAULT false;
