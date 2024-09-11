/*
  Warnings:

  - The primary key for the `Expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Expenses` table. All the data in the column will be lost.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Products` table. All the data in the column will be lost.
  - The primary key for the `Purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purchaseId` on the `Purchases` table. All the data in the column will be lost.
  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `saleId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the `ExpenseByCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `Products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `delivererId` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('PURCHASES', 'ASSETS', 'SALARIES');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BOSS', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('OFFICE', 'VEHICLE', 'COMPUTER', 'FURNITURE');

-- DropForeignKey
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_productId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_pkey",
DROP COLUMN "category",
DROP COLUMN "expenseId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "type" "ExpenseType" NOT NULL,
ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "productId",
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "rating" SET NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_pkey",
DROP COLUMN "purchaseId",
ADD COLUMN     "delivererId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "saleId",
DROP COLUMN "totalAmount",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ExpenseByCategory";

-- DropTable
DROP TABLE "ExpenseSummary";

-- DropTable
DROP TABLE "PurchaseSummary";

-- DropTable
DROP TABLE "SalesSummary";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Deliverer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Deliverer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_phoneNumber_key" ON "Staff"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
