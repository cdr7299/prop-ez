/*
  Warnings:

  - Made the column `categoryId` on table `PropertyItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `PropertyItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PropertyItem" DROP CONSTRAINT "PropertyItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyItem" DROP CONSTRAINT "PropertyItem_locationId_fkey";

-- AlterTable
ALTER TABLE "PropertyItem" ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
