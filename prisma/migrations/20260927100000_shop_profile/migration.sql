-- CreateTable
CREATE TABLE "ShopProfile" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL DEFAULT 'MS Soft GSM',
    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "website" TEXT,
    "tiktok" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "address" TEXT,
    "tinNumber" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopProfile_pkey" PRIMARY KEY ("id")
);
