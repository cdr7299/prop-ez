/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Locations` table. All the data in the column will be lost.
  - You are about to drop the column `brokerName` on the `PropertyItem` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Locations" DROP CONSTRAINT "Locations_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Locations" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PropertyItem" DROP COLUMN "brokerName",
ADD COLUMN     "brokerEntityId" TEXT;

-- CreateTable
CREATE TABLE "CategoryConfig" (
    "id" TEXT NOT NULL,
    "floors" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoryConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrokerEntity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "BrokerEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryConfig_categoryId_key" ON "CategoryConfig"("categoryId");

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_brokerEntityId_fkey" FOREIGN KEY ("brokerEntityId") REFERENCES "BrokerEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locations" ADD CONSTRAINT "Locations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryConfig" ADD CONSTRAINT "CategoryConfig_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrokerEntity" ADD CONSTRAINT "BrokerEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
