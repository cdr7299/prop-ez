-- DropForeignKey
ALTER TABLE "CategoryConfig" DROP CONSTRAINT "CategoryConfig_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "CategoryConfig" ADD CONSTRAINT "CategoryConfig_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
