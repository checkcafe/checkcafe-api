-- DropForeignKey
ALTER TABLE "place_favorites" DROP CONSTRAINT "place_favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "place_reviews" DROP CONSTRAINT "place_reviews_userId_fkey";

-- AddForeignKey
ALTER TABLE "place_favorites" ADD CONSTRAINT "place_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_reviews" ADD CONSTRAINT "place_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
