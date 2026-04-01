ALTER TABLE "Question"
ADD COLUMN "topic" TEXT;

ALTER TABLE "QuizAttempt"
ADD COLUMN "feedback" JSONB;

CREATE INDEX "QuizAttempt_quizId_userId_idx"
ON "QuizAttempt"("quizId", "userId");

CREATE INDEX "AttemptAnswer_questionId_idx"
ON "AttemptAnswer"("questionId");
