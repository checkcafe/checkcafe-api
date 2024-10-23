-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT;

-- CreateIndex
CREATE INDEX "place_favorites_placeId_userId_idx" ON "place_favorites"("placeId", "userId");
