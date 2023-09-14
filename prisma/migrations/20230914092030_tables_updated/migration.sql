/*
  Warnings:

  - The primary key for the `Lender` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `LenderInterestRate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Lender` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Lender` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LenderInterestRate" DROP CONSTRAINT "LenderInterestRate_lenderId_fkey";

-- AlterTable
ALTER TABLE "Lender" DROP CONSTRAINT "Lender_pkey",
ADD COLUMN     "identifier" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lender_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lender_id_seq";

-- DropTable
DROP TABLE "LenderInterestRate";

-- CreateTable
CREATE TABLE "LoanProducts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lenderId" TEXT NOT NULL,

    CONSTRAINT "LoanProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lender_identifier_key" ON "Lender"("identifier");

-- AddForeignKey
ALTER TABLE "LoanProducts" ADD CONSTRAINT "LoanProducts_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
