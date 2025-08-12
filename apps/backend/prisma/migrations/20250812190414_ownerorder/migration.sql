/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `owner_order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "owner_order_ownerId_key" ON "public"."owner_order"("ownerId");
