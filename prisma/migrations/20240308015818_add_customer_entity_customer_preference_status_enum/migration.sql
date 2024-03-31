/*
  Warnings:

  - You are about to drop the column `statusId` on the `PropertyItem` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('on_market', 'off_market', 'deal_in_progress', 'done', 'archived');

-- DropForeignKey
ALTER TABLE "PropertyItem" DROP CONSTRAINT "PropertyItem_statusId_fkey";

-- AlterTable
ALTER TABLE "PropertyItem" DROP COLUMN "statusId",
ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'on_market';

-- DropTable
DROP TABLE "Status";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "customerPreferenceId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerPreference" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "CustomerPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToPropertyItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPreference_customerId_key" ON "CustomerPreference"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToPropertyItem_AB_unique" ON "_CustomerToPropertyItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToPropertyItem_B_index" ON "_CustomerToPropertyItem"("B");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPreference" ADD CONSTRAINT "CustomerPreference_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPreference" ADD CONSTRAINT "CustomerPreference_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPropertyItem" ADD CONSTRAINT "_CustomerToPropertyItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPropertyItem" ADD CONSTRAINT "_CustomerToPropertyItem_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
