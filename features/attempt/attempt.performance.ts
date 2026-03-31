type AnswerWithQuestion = {
  selected: string;
  isCorrect: boolean;
  question: {
    question: string;
    topic: string | null;
    answer: string;
  };
};

type AttemptLike = {
  score: number;
  answers: AnswerWithQuestion[];
};

export type TopicPerformance = {
  topic: string;
  correct: number;
  total: number;
  accuracyPercentage: number;
};

const normalizeTopic = (topic: string | null | undefined) =>
  topic?.trim() || 'General';

export const buildTopicPerformance = (answers: AnswerWithQuestion[]) => {
  const topicStats = new Map<string, { correct: number; total: number }>();

  for (const answer of answers) {
    const topic = normalizeTopic(answer.question.topic);
    const current = topicStats.get(topic) ?? { correct: 0, total: 0 };

    current.total += 1;
    current.correct += answer.isCorrect ? 1 : 0;

    topicStats.set(topic, current);
  }

  return Array.from(topicStats.entries()).map(([topic, stats]) => ({
    topic,
    correct: stats.correct,
    total: stats.total,
    accuracyPercentage:
      stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100),
  }));
};

export const buildAttemptFeedbackPayload = (attempt: AttemptLike) => {
  const totalQuestions = attempt.answers.length;
  const topicPerformance = buildTopicPerformance(attempt.answers);

  return {
    score: attempt.score,
    totalQuestions,
    accuracyPercentage:
      totalQuestions === 0
        ? 0
        : Math.round((attempt.score / totalQuestions) * 100),
    topicPerformance,
    incorrectQuestionSummaries: attempt.answers
      .filter(answer => !answer.isCorrect)
      .map(answer => ({
        question: answer.question.question,
        topic: normalizeTopic(answer.question.topic),
        selected: answer.selected,
        correctAnswer: answer.question.answer,
      })),
  };
};
