/*
  Warnings:

  - You are about to alter the column `name` on the `places` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[placeId,day]` on the table `operating_hours` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placeId,facilityId]` on the table `place_facilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placeId,order]` on the table `place_photos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placeReviewId,order]` on the table `place_review_photos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `places` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "place_photos_placeId_order_idx";

-- DropIndex
DROP INDEX "place_review_photos_placeReviewId_order_idx";

-- AlterTable
ALTER TABLE "places" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "operating_hours_placeId_day_key" ON "operating_hours"("placeId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "place_facilities_placeId_facilityId_key" ON "place_facilities"("placeId", "facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "place_photos_placeId_order_key" ON "place_photos"("placeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "place_review_photos_placeReviewId_order_key" ON "place_review_photos"("placeReviewId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "places_name_key" ON "places"("name");
