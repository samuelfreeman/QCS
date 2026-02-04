-- CreateEnum
CREATE TYPE "status" AS ENUM ('Created', 'Processed', 'Enroute', 'Arrived', 'Dispatched', 'Delivered', 'Returned', 'Pending');

-- CreateEnum
CREATE TYPE "paymentBy" AS ENUM ('Receiver', 'Sender');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('Express', 'Scheduled', 'Same_Day', 'Next_Day');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "location" TEXT,
    "code" TEXT,
    "expiration" TIMESTAMP(3),
    "role_name" TEXT,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "type" TEXT NOT NULL,
    "reference" TEXT,
    "orderCode" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bikers" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code" TEXT,
    "expiration" TIMESTAMP(3),
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT,

    CONSTRAINT "bikers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "senders" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT NOT NULL,
    "pickUpLocation" TEXT,
    "password" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "isDormat" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT,
    "expiration" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "redeemedPoints" INTEGER NOT NULL DEFAULT 0,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "senders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receivers" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "deliveryLocation" TEXT,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT,

    CONSTRAINT "receivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderCode" TEXT NOT NULL,
    "senderId" TEXT,
    "orderType" "OrderType",
    "grandAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickUpLocation" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderCode")
);

-- CreateTable
CREATE TABLE "orderPackages" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "orderCode" TEXT NOT NULL,
    "receiverId" TEXT,
    "deliveryLocation" TEXT,
    "details" TEXT,
    "paymentBy" "paymentBy" NOT NULL DEFAULT 'Sender',
    "estimatedWeight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "baseWeight" INTEGER NOT NULL DEFAULT 1,
    "extraWeight" INTEGER NOT NULL DEFAULT 0,
    "valueOfPackage" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "itemCost" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "itemImage" TEXT,
    "pickupBikerId" TEXT,
    "deliverBikerId" TEXT,
    "status" "status",
    "secondReceipientName" TEXT,
    "secondReceipientNumber" TEXT,
    "reason" TEXT,
    "pickup_share" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "delivery_share" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "transit_share" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "system_share" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "qcs_share" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "insured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderPackages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packageHistories" (
    "id" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "packageId" TEXT,
    "reason" TEXT,
    "del_flg" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packageHistories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suburbs" (
    "id" TEXT NOT NULL,
    "suburb_name" TEXT NOT NULL,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cityId" TEXT,

    CONSTRAINT "suburbs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveryPrices" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT,
    "cityId" TEXT,
    "baseWeightPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "extraWeightPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "suburbsId" TEXT,

    CONSTRAINT "deliveryPrices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bikers_id_key" ON "bikers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bikers_telephone_key" ON "bikers"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "senders_id_key" ON "senders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "senders_telephone_key" ON "senders"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "receivers_id_key" ON "receivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "receivers_telephone_key" ON "receivers"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderCode_key" ON "orders"("orderCode");

-- CreateIndex
CREATE UNIQUE INDEX "orderPackages_id_key" ON "orderPackages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "packageHistories_id_key" ON "packageHistories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "suburbs_id_key" ON "suburbs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_id_key" ON "cities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deliveryPrices_id_key" ON "deliveryPrices"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_location_fkey" FOREIGN KEY ("location") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bikers" ADD CONSTRAINT "bikers_location_fkey" FOREIGN KEY ("location") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "senders" ADD CONSTRAINT "senders_pickUpLocation_fkey" FOREIGN KEY ("pickUpLocation") REFERENCES "suburbs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_deliveryLocation_fkey" FOREIGN KEY ("deliveryLocation") REFERENCES "suburbs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receivers" ADD CONSTRAINT "receivers_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_pickUpLocation_fkey" FOREIGN KEY ("pickUpLocation") REFERENCES "suburbs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderPackages" ADD CONSTRAINT "orderPackages_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderPackages" ADD CONSTRAINT "orderPackages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "receivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderPackages" ADD CONSTRAINT "orderPackages_deliveryLocation_fkey" FOREIGN KEY ("deliveryLocation") REFERENCES "suburbs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderPackages" ADD CONSTRAINT "orderPackages_pickupBikerId_fkey" FOREIGN KEY ("pickupBikerId") REFERENCES "bikers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderPackages" ADD CONSTRAINT "orderPackages_deliverBikerId_fkey" FOREIGN KEY ("deliverBikerId") REFERENCES "bikers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packageHistories" ADD CONSTRAINT "packageHistories_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "orderPackages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suburbs" ADD CONSTRAINT "suburbs_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveryPrices" ADD CONSTRAINT "deliveryPrices_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveryPrices" ADD CONSTRAINT "deliveryPrices_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveryPrices" ADD CONSTRAINT "deliveryPrices_suburbsId_fkey" FOREIGN KEY ("suburbsId") REFERENCES "suburbs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
