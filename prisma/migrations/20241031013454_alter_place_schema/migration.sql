/*
  Warnings:

  - You are about to drop the column `priceRange` on the `places` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "places" DROP COLUMN "priceRange",
ADD COLUMN     "closingTime" TIME,
ADD COLUMN     "openingTime" TIME,
ADD COLUMN     "priceRangeMax" MONEY,
ADD COLUMN     "priceRangeMin" MONEY,
ADD COLUMN     "thumbnailUrl" TEXT;
