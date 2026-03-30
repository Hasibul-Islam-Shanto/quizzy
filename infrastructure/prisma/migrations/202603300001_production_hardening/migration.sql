ALTER TABLE "User"
ALTER COLUMN "email" DROP NOT NULL;

CREATE UNIQUE INDEX "QuizAttempt_userId_quizId_key"
ON "QuizAttempt"("userId", "quizId");

CREATE INDEX "QuizAttempt_quizId_finishedAt_idx"
ON "QuizAttempt"("quizId", "finishedAt");

CREATE UNIQUE INDEX "AttemptAnswer_attemptId_questionId_key"
ON "AttemptAnswer"("attemptId", "questionId");

CREATE TABLE "AiGenerationRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "ipHash" TEXT,
  "promptChars" INTEGER NOT NULL,
  "numQuestions" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AiGenerationRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AiGenerationRequest_userId_createdAt_idx"
ON "AiGenerationRequest"("userId", "createdAt");

CREATE INDEX "AiGenerationRequest_ipHash_createdAt_idx"
ON "AiGenerationRequest"("ipHash", "createdAt");

ALTER TABLE "AiGenerationRequest"
ADD CONSTRAINT "AiGenerationRequest_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
