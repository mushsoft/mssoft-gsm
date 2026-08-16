-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('PROCESSING', 'READY', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'PROCESSING';
