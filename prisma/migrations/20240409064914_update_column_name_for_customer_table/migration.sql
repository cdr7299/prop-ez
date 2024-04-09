/*
  Warnings:

  - You are about to drop the `_IsBuyingProperties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IsBuyingProperties" DROP CONSTRAINT "_IsBuyingProperties_A_fkey";

-- DropForeignKey
ALTER TABLE "_IsBuyingProperties" DROP CONSTRAINT "_IsBuyingProperties_B_fkey";

-- DropTable
DROP TABLE "_IsBuyingProperties";

-- CreateTable
CREATE TABLE "_isInterstedInBuying" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_isInterstedInBuying_AB_unique" ON "_isInterstedInBuying"("A", "B");

-- CreateIndex
CREATE INDEX "_isInterstedInBuying_B_index" ON "_isInterstedInBuying"("B");

-- AddForeignKey
ALTER TABLE "_isInterstedInBuying" ADD CONSTRAINT "_isInterstedInBuying_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_isInterstedInBuying" ADD CONSTRAINT "_isInterstedInBuying_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
