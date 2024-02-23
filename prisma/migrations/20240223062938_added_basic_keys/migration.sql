/*
  Warnings:

  - You are about to drop the column `location` on the `PropertyItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "PropertyItem" DROP COLUMN "location",
ADD COLUMN     "brokerName" TEXT,
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "priority" "Priority",
ADD COLUMN     "statusId" TEXT;

-- CreateTable
CREATE TABLE "Locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_key" ON "Locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
