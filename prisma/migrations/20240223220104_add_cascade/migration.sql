-- DropForeignKey
ALTER TABLE "PropertyItem" DROP CONSTRAINT "PropertyItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyItem" DROP CONSTRAINT "PropertyItem_locationId_fkey";

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
