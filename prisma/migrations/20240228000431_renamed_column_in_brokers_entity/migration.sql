/*
  Warnings:

  - You are about to drop the column `userId` on the `BrokerEntity` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `BrokerEntity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BrokerEntity" DROP CONSTRAINT "BrokerEntity_userId_fkey";

-- AlterTable
ALTER TABLE "BrokerEntity" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BrokerEntity" ADD CONSTRAINT "BrokerEntity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
