/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_business_userId_key" ON "public"."user_business"("userId");
