-- DropForeignKey
ALTER TABLE "CustomerPreference" DROP CONSTRAINT "CustomerPreference_customerId_fkey";

-- AddForeignKey
ALTER TABLE "CustomerPreference" ADD CONSTRAINT "CustomerPreference_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
