export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionPromptType = {
  prompt: string;
  numQuestions?: number;
  difficulty?: Difficulty;
};
