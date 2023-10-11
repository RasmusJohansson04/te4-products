/*
  Warnings:

  - You are about to drop the column `cartId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_cartId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `cartId`;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);
