/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "business_ownerId_key" ON "public"."business"("ownerId");
