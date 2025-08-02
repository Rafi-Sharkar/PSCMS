-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('OWNER', 'EMPLOYEE', 'FARMER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "public"."ProductNames" AS ENUM ('BROILER', 'DESHI', 'SONALI', 'DUCK');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'ASSIGNED', 'COLLECTING', 'DELIVERED', 'BILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'PARTIAL');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_businesses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "user_businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
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

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farm_stocks" (
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

    CONSTRAINT "farm_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."collections" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "trackingId" TEXT,
    "collectionTargetKg" INTEGER NOT NULL,
    "collectedKg" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OwnerOrders" (
    "id" TEXT NOT NULL,
    "farmStockId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "productName" "public"."ProductNames" NOT NULL,
    "quantityKg" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "collectionId" TEXT NOT NULL,
    "pickupTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OwnerOrderStatus" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "OwnerOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_businesses_userId_ownerId_key" ON "public"."user_businesses"("userId", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_customerId_key" ON "public"."orders"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_stocks_farmerId_key" ON "public"."farm_stocks"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "collections_employeeId_key" ON "public"."collections"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerOrders_farmStockId_key" ON "public"."OwnerOrders"("farmStockId");

-- CreateIndex
CREATE UNIQUE INDEX "tracking_collectionId_key" ON "public"."tracking"("collectionId");

-- CreateIndex
CREATE INDEX "tracking_userId_idx" ON "public"."tracking"("userId");

-- AddForeignKey
ALTER TABLE "public"."user_businesses" ADD CONSTRAINT "user_businesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_businesses" ADD CONSTRAINT "user_businesses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farm_stocks" ADD CONSTRAINT "farm_stocks_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collections" ADD CONSTRAINT "collections_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OwnerOrders" ADD CONSTRAINT "OwnerOrders_farmStockId_fkey" FOREIGN KEY ("farmStockId") REFERENCES "public"."farm_stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OwnerOrders" ADD CONSTRAINT "OwnerOrders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OwnerOrders" ADD CONSTRAINT "OwnerOrders_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking" ADD CONSTRAINT "tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking" ADD CONSTRAINT "tracking_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
