/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN "razorpayOrderId" TEXT;
ALTER TABLE "orders" ADD COLUMN "razorpayPaymentId" TEXT;
ALTER TABLE "orders" ADD COLUMN "razorpaySignature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_razorpayOrderId_key" ON "orders"("razorpayOrderId");
