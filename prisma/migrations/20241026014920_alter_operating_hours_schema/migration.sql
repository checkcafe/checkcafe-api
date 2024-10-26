/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `operating_hours` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `operating_hours` table. All the data in the column will be lost.
  - Added the required column `closingTime` to the `operating_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `operating_hours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operating_hours" DROP COLUMN "endDateTime",
DROP COLUMN "startDateTime",
ADD COLUMN     "closingTime" TIMETZ NOT NULL,
ADD COLUMN     "openingTime" TIMETZ NOT NULL;
