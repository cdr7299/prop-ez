/*
  Warnings:

  - You are about to drop the column `floors` on the `CategoryConfig` table. All the data in the column will be lost.
  - Added the required column `defaultFloors` to the `CategoryConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultLength` to the `CategoryConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultPricePerSqFt` to the `CategoryConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultWidth` to the `CategoryConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CategoryConfig_createdById_key";

-- AlterTable
ALTER TABLE "CategoryConfig" DROP COLUMN "floors",
ADD COLUMN     "defaultFloors" INTEGER NOT NULL,
ADD COLUMN     "defaultLength" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "defaultPricePerSqFt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "defaultWidth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fillDefaultFields" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "fillPrice" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "PropertyItem" ADD COLUMN     "askingPrice" DOUBLE PRECISION,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "manualPricing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceSoldAt" DOUBLE PRECISION,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "tehsil" TEXT;

-- AlterTable
ALTER TABLE "UserPreference" ALTER COLUMN "emailUpdates" SET DEFAULT false;

-- CreateIndex
CREATE INDEX "Category_name_createdById_idx" ON "Category"("name", "createdById");
