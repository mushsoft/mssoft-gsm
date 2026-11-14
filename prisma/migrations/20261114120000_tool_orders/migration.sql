-- CreateEnum
CREATE TYPE "ToolOrderStatus" AS ENUM ('PAID', 'COMPLETED', 'REFUNDED');

-- AlterTable
ALTER TABLE "WalletTransaction" ADD COLUMN     "toolOrderId" TEXT;

-- CreateTable
CREATE TABLE "ToolOrder" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "softwareToolId" TEXT,
    "toolTitle" TEXT NOT NULL,
    "toolCategory" TEXT NOT NULL,
    "perCredit" BOOLEAN NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPriceCents" INTEGER NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "notes" TEXT,
    "status" "ToolOrderStatus" NOT NULL DEFAULT 'PAID',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),

    CONSTRAINT "ToolOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToolOrder_status_createdAt_idx" ON "ToolOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ToolOrder_customerId_createdAt_idx" ON "ToolOrder"("customerId", "createdAt");

-- CreateIndex
CREATE INDEX "WalletTransaction_toolOrderId_idx" ON "WalletTransaction"("toolOrderId");

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_toolOrderId_fkey" FOREIGN KEY ("toolOrderId") REFERENCES "ToolOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolOrder" ADD CONSTRAINT "ToolOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolOrder" ADD CONSTRAINT "ToolOrder_softwareToolId_fkey" FOREIGN KEY ("softwareToolId") REFERENCES "SoftwareTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

