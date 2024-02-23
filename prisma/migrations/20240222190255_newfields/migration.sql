/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `PropertyItem` table. All the data in the column will be lost.
  - Added the required column `floors` to the `PropertyItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PropertyItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'BASIC');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BASIC';
COMMIT;

-- DropIndex
DROP INDEX "PropertyItem_name_idx";

-- AlterTable
ALTER TABLE "PropertyItem" DROP COLUMN "name",
ADD COLUMN     "area" DOUBLE PRECISION,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "floors" INTEGER NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BASIC';

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "emailUpdates" BOOLEAN,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
