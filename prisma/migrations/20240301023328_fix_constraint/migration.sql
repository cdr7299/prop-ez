/*
  Warnings:

  - A unique constraint covering the columns `[createdById]` on the table `CategoryConfig` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `CategoryConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryConfig" ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryConfig_createdById_key" ON "CategoryConfig"("createdById");

-- AddForeignKey
ALTER TABLE "CategoryConfig" ADD CONSTRAINT "CategoryConfig_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
