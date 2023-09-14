/*
  Warnings:

  - A unique constraint covering the columns `[name,lenderId]` on the table `LoanProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_name_lenderId_key" ON "LoanProduct"("name", "lenderId");
