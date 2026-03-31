import QuizBuilderHeader from './_components/QuizBuilderHeader';
import QuizBuildPromptInput from './_components/QuizBuildPromptInput';
import QuizBuilderQuestionsContainer from './_components/QuizBuilderQuestionsContainer';

const QuizBuilderPage = () => {
  return (
    <main className="bg-gradient-soft pt-20 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <QuizBuilderHeader />
        <QuizBuildPromptInput />
        <QuizBuilderQuestionsContainer />
      </div>
    </main>
  );
};

export default QuizBuilderPage;
