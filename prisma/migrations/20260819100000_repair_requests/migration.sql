-- CreateEnum
CREATE TYPE "RepairRequestStatus" AS ENUM ('OPEN', 'ANSWERED', 'CLOSED');

-- CreateTable
CREATE TABLE "RepairRequest" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "brand" TEXT,
    "modelName" TEXT,
    "problem" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "RepairRequestStatus" NOT NULL DEFAULT 'OPEN',
    "reply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepairRequest_customerId_idx" ON "RepairRequest"("customerId");
CREATE INDEX "RepairRequest_status_idx" ON "RepairRequest"("status");
CREATE INDEX "RepairRequest_createdAt_idx" ON "RepairRequest"("createdAt");

-- AddForeignKey
ALTER TABLE "RepairRequest" ADD CONSTRAINT "RepairRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
