-- DropIndex
DROP INDEX "user_tokens_userId_token_idx";

-- CreateIndex
CREATE INDEX "user_tokens_token_revoked_expiresAt_idx" ON "user_tokens"("token", "revoked", "expiresAt");
