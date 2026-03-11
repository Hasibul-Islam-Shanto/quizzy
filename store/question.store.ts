import { IQuestion } from '@/features/questions/questions.entity';
import { create } from 'zustand';

interface QuestionStore {
  questions: IQuestion[];
  setQuestions: (questions: IQuestion[]) => void;
  deleteQuestion: (index: number) => void;
}

export const useQuestionStore = create<QuestionStore>(set => ({
  questions: [],
  setQuestions: questions => set({ questions }),
  deleteQuestion: index =>
    set(state => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
}));
