-- CreateEnum
CREATE TYPE "GuideCategory" AS ENUM ('REPAIR', 'SOFTWARE');

-- AlterTable
ALTER TABLE "RepairGuide" ADD COLUMN     "category" "GuideCategory" NOT NULL DEFAULT 'REPAIR';
