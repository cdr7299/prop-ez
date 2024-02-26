/*
  Warnings:

  - You are about to drop the column `area` on the `PropertyItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PropertyItem" DROP COLUMN "area",
ADD COLUMN     "pricePerSqFt" DOUBLE PRECISION;
