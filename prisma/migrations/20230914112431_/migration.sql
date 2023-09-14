/*
  Warnings:

  - You are about to drop the `ProductRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductRate" DROP CONSTRAINT "ProductRate_loanProductId_fkey";

-- AlterTable
ALTER TABLE "LoanProduct" ADD COLUMN     "fixed12Months" DECIMAL(65,30),
ADD COLUMN     "fixed24Months" DECIMAL(65,30),
ADD COLUMN     "fixed36Months" DECIMAL(65,30),
ADD COLUMN     "fixed48Months" DECIMAL(65,30),
ADD COLUMN     "fixed60Months" DECIMAL(65,30),
ADD COLUMN     "floating" DECIMAL(65,30);

-- DropTable
DROP TABLE "ProductRate";
