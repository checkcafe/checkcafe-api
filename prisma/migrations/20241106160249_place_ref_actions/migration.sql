-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_userId_fkey";

-- AlterTable
ALTER TABLE "places" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
