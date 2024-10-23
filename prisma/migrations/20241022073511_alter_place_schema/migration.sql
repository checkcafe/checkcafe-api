/*
  Warnings:

  - You are about to drop the column `placeFacilityId` on the `place_photos` table. All the data in the column will be lost.
  - You are about to drop the column `wifiSpeedAvg` on the `places` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_stateId_fkey";

-- DropForeignKey
ALTER TABLE "facilities" DROP CONSTRAINT "facilities_facilityCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "operating_hours" DROP CONSTRAINT "operating_hours_placeId_fkey";

-- DropForeignKey
ALTER TABLE "place_facilities" DROP CONSTRAINT "place_facilities_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "place_facilities" DROP CONSTRAINT "place_facilities_placeId_fkey";

-- DropForeignKey
ALTER TABLE "place_favorites" DROP CONSTRAINT "place_favorites_placeId_fkey";

-- DropForeignKey
ALTER TABLE "place_photos" DROP CONSTRAINT "place_photos_placeFacilityId_fkey";

-- DropForeignKey
ALTER TABLE "place_photos" DROP CONSTRAINT "place_photos_placeId_fkey";

-- DropForeignKey
ALTER TABLE "place_review_photos" DROP CONSTRAINT "place_review_photos_placeReviewId_fkey";

-- DropForeignKey
ALTER TABLE "place_reviews" DROP CONSTRAINT "place_reviews_placeId_fkey";

-- DropForeignKey
ALTER TABLE "states" DROP CONSTRAINT "states_countryId_fkey";

-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_userId_fkey";

-- AlterTable
ALTER TABLE "place_photos" DROP COLUMN "placeFacilityId";

-- AlterTable
ALTER TABLE "places" DROP COLUMN "wifiSpeedAvg";

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_hours" ADD CONSTRAINT "operating_hours_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facilities" ADD CONSTRAINT "facilities_facilityCategoryId_fkey" FOREIGN KEY ("facilityCategoryId") REFERENCES "facility_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_facilities" ADD CONSTRAINT "place_facilities_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_facilities" ADD CONSTRAINT "place_facilities_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_photos" ADD CONSTRAINT "place_photos_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_favorites" ADD CONSTRAINT "place_favorites_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_reviews" ADD CONSTRAINT "place_reviews_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_review_photos" ADD CONSTRAINT "place_review_photos_placeReviewId_fkey" FOREIGN KEY ("placeReviewId") REFERENCES "place_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
