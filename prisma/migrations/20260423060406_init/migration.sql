-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'WHOLESALE_BUYER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "CareLevel" AS ENUM ('EASY', 'MODERATE', 'EXPERT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "district" TEXT,
    "whatsappNumber" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameSi" TEXT,
    "nameTa" TEXT,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameSi" TEXT,
    "nameTa" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "descriptionSi" TEXT,
    "descriptionTa" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "bulkPrice" DECIMAL(10,2),
    "minBulkQty" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT NOT NULL,
    "careLevel" "CareLevel" NOT NULL,
    "sunlight" TEXT NOT NULL,
    "watering" TEXT NOT NULL,
    "isIndoor" BOOLEAN NOT NULL DEFAULT false,
    "isOutdoor" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "weight" DOUBLE PRECISION,
    "potSize" TEXT,
    "seasonalNote" TEXT,
    "whatsappInquiry" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
