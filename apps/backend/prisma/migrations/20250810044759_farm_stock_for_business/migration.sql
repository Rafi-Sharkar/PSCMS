/*
  Warnings:

  - A unique constraint covering the columns `[farmStockId]` on the table `farm_stock_for_business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "farm_stock_for_business_farmStockId_key" ON "public"."farm_stock_for_business"("farmStockId");
