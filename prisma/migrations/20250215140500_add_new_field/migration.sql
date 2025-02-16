/*
  Warnings:

  - You are about to drop the column `popularity` on the `ProductItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "popularity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "popularity";
