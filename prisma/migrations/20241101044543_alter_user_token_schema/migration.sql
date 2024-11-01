/*
  Warnings:

  - You are about to drop the column `revoked` on the `user_tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_tokens_token_revoked_expiresAt_idx";

-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "revoked";

-- CreateIndex
CREATE INDEX "user_tokens_token_expiresAt_idx" ON "user_tokens"("token", "expiresAt");
