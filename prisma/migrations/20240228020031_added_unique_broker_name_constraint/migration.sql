/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BrokerEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BrokerEntity_name_key" ON "BrokerEntity"("name");
