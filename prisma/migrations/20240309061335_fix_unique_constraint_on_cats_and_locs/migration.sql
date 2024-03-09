/*
  Warnings:

  - A unique constraint covering the columns `[name,createdById]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,createdById]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Locations_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_createdById_key" ON "Category"("name", "createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_createdById_key" ON "Locations"("name", "createdById");
