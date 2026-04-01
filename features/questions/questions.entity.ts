export interface IQuestion {
  id: string;
  question: string;
  topic?: string | null;
  options: string[];
  answer: string;
  explanation: string | null;
}

export interface IQuestionForAttempt {
  id: string;
  question: string;
  topic?: string | null;
  options: string[];
}
