import { IQuestion } from '@/features/questions/questions.entity';

export const calculateScore = (
  answers: Record<string, string>,
  questions: IQuestion[],
) => {
  let score = 0;
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer === question.answer) {
      score++;
    }
  });
  return score;
};
