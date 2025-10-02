export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string | null;
}
