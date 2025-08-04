-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('OWNER', 'EMPLOYEE', 'FARMER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "public"."ProductNames" AS ENUM ('BROILER', 'DESHI', 'SONALI', 'DUCK');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'ASSIGNED', 'COLLECTING', 'DELIVERED', 'BILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."OwnerOrderStatus" AS ENUM ('PENDING', 'READY_FOR_PICKING', 'PICKED_UP', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."CollectionStatus" AS ENUM ('ASSIGNED', 'START_PICKING', 'END_PICKING', 'START_DELIVERY', 'END_DELIVERY');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'PARTIAL');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "address" TEXT,
    "imageUrl" TEXT,
    "businessId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_business" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,

    CONSTRAINT "user_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "productName" "public"."ProductNames" NOT NULL,
    "quantityKg" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "collectionId" TEXT,
    "deliveryStatus" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farm_stock" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "productName" "public"."ProductNames" NOT NULL,
    "description" TEXT,
    "pricePerKg" DOUBLE PRECISION NOT NULL,
    "availableKg" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farm_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farm_stock_for_business" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "farmStockId" TEXT NOT NULL,
    "pricePerKg" DOUBLE PRECISION,
    "availableKg" INTEGER,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farm_stock_for_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."collection" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "collectionTargetKg" INTEGER DEFAULT 0,
    "collectedKg" INTEGER DEFAULT 0,
    "collectionStatus" "public"."CollectionStatus" NOT NULL DEFAULT 'ASSIGNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."owner_order" (
    "id" TEXT NOT NULL,
    "farmStockIdforBusiness" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "productName" "public"."ProductNames" NOT NULL,
    "quantityKg" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "collectionId" TEXT,
    "pickupTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerOrderStatus" "public"."OwnerOrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "owner_order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "public"."user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_businessId_key" ON "public"."user"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "user_business_userId_businessId_key" ON "public"."user_business"("userId", "businessId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_stock_for_business_businessId_farmStockId_key" ON "public"."farm_stock_for_business"("businessId", "farmStockId");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_business" ADD CONSTRAINT "user_business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_business" ADD CONSTRAINT "user_business_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."user_business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farm_stock" ADD CONSTRAINT "farm_stock_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farm_stock_for_business" ADD CONSTRAINT "farm_stock_for_business_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farm_stock_for_business" ADD CONSTRAINT "farm_stock_for_business_farmStockId_fkey" FOREIGN KEY ("farmStockId") REFERENCES "public"."farm_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection" ADD CONSTRAINT "collection_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection" ADD CONSTRAINT "collection_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."user_business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."owner_order" ADD CONSTRAINT "owner_order_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."owner_order" ADD CONSTRAINT "owner_order_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."owner_order" ADD CONSTRAINT "owner_order_farmStockIdforBusiness_fkey" FOREIGN KEY ("farmStockIdforBusiness") REFERENCES "public"."farm_stock_for_business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."owner_order" ADD CONSTRAINT "owner_order_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."owner_order" ADD CONSTRAINT "owner_order_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."user_business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
