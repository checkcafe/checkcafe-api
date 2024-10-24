/*
  Warnings:

  - A unique constraint covering the columns `[userId,placeId]` on the table `place_favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "place_favorites_placeId_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "place_favorites_userId_placeId_key" ON "place_favorites"("userId", "placeId");
