/*
  Warnings:

  - You are about to drop the `_CustomerToPropertyItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('buyer', 'seller', 'both');

-- DropForeignKey
ALTER TABLE "_CustomerToPropertyItem" DROP CONSTRAINT "_CustomerToPropertyItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToPropertyItem" DROP CONSTRAINT "_CustomerToPropertyItem_B_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customerType" "CustomerType" NOT NULL DEFAULT 'buyer';

-- AlterTable
ALTER TABLE "CustomerPreference" ADD COLUMN     "maxArea" DOUBLE PRECISION,
ADD COLUMN     "maxLength" DOUBLE PRECISION,
ADD COLUMN     "maxPrice" DOUBLE PRECISION,
ADD COLUMN     "maxWidth" DOUBLE PRECISION,
ADD COLUMN     "minArea" DOUBLE PRECISION,
ADD COLUMN     "minFloors" INTEGER,
ADD COLUMN     "minPrice" DOUBLE PRECISION,
ADD COLUMN     "pricePerSqFt" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PropertyItem" ADD COLUMN     "sellerId" TEXT;

-- DropTable
DROP TABLE "_CustomerToPropertyItem";

-- CreateTable
CREATE TABLE "_IsBuyingProperties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IsBuyingProperties_AB_unique" ON "_IsBuyingProperties"("A", "B");

-- CreateIndex
CREATE INDEX "_IsBuyingProperties_B_index" ON "_IsBuyingProperties"("B");

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IsBuyingProperties" ADD CONSTRAINT "_IsBuyingProperties_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IsBuyingProperties" ADD CONSTRAINT "_IsBuyingProperties_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
