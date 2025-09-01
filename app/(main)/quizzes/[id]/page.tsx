'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import {
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Share2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
}

// Mock quiz data - would come from API
const mockQuiz: QuizData = {
  id: '1',
  title: 'Mathematics Fundamentals',
  description:
    'Test your knowledge of basic mathematical concepts including algebra, geometry, and statistics.',
  timeLimit: 20,
  questions: [
    {
      id: 'q1',
      question: 'What is the value of x in the equation 2x + 5 = 15?',
      options: ['5', '7', '10', '3'],
      correctAnswer: 0,
    },
    {
      id: 'q2',
      question: 'Which of the following is the Pythagorean theorem?',
      options: ['a + b = c', 'a² + b² = c²', 'a × b = c', 'a ÷ b = c'],
      correctAnswer: 1,
    },
    {
      id: 'q3',
      question: 'What is 15% of 200?',
      options: ['25', '30', '35', '40'],
      correctAnswer: 1,
    },
    {
      id: 'q4',
      question: 'What is the area of a circle with radius 4?',
      options: ['8π', '16π', '12π', '4π'],
      correctAnswer: 1,
    },
    {
      id: 'q5',
      question: 'Solve for y: 3y - 7 = 14',
      options: ['7', '5', '9', '6'],
      correctAnswer: 0,
    },
  ],
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(mockQuiz.timeLimit * 60); // Convert to seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = mockQuiz.questions.filter(
      (question, index) => answers[question.id] === question.correctAnswer,
    ).length;

    const finalScore = Math.round(
      (correctAnswers / mockQuiz.questions.length) * 100,
    );
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90)
      return {
        text: 'Excellent',
        color:
          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      };
    if (score >= 80)
      return {
        text: 'Good',
        color:
          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      };
    if (score >= 60)
      return {
        text: 'Average',
        color:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      };
    return {
      text: 'Needs Improvement',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
  };
  if (showResults) {
    const scoreBadge = getScoreBadge(score);
    const correctCount = mockQuiz.questions.filter(
      question => answers[question.id] === question.correctAnswer,
    ).length;

    return (
      <div className="bg-gradient-soft min-h-screen">
        <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Trophy className="text-primary h-16 w-16" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Quiz Completed!
              </CardTitle>
              <p className="text-muted-foreground">Here are your results</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <Badge className={scoreBadge.color}>{scoreBadge.text}</Badge>
                <p className="text-muted-foreground text-lg">
                  You got {correctCount} out of {mockQuiz.questions.length}{' '}
                  questions correct
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Question Review</h3>
                {mockQuiz.questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <Card
                      key={question.id}
                      className="bg-background/50 border-border/50"
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                          ) : (
                            <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                          )}
                          <div className="flex-1">
                            <p className="mb-2 font-medium">
                              Q{index + 1}: {question.question}
                            </p>
                            <div className="space-y-1 text-sm">
                              <p
                                className={`${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                              >
                                Your answer:{' '}
                                {userAnswer !== undefined
                                  ? question.options[userAnswer]
                                  : 'Not answered'}
                              </p>
                              {!isCorrect && (
                                <p className="text-green-600 dark:text-green-400">
                                  Correct answer:{' '}
                                  {question.options[question.correctAnswer]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
                <Link href="/quizzes" className="flex-1">
                  <Button variant="hero" className="w-full">
                    Browse More Quizzes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-soft min-h-screen pb-10">
      <div className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{mockQuiz.title}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {mockQuiz.description}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Clock className="text-primary h-5 w-5" />
                  <span
                    className={
                      timeLeft < 300 ? 'text-red-500' : 'text-foreground'
                    }
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">Time remaining</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress */}
        <Card className="bg-gradient-card border-border/50 mb-6">
          <CardContent className="pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {mockQuiz.questions.length}
              </span>
              <span className="text-muted-foreground text-sm">
                {Math.round(
                  ((currentQuestion + 1) / mockQuiz.questions.length) * 100,
                )}
                % Complete
              </span>
            </div>
            <Progress
              value={((currentQuestion + 1) / mockQuiz.questions.length) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="bg-gradient-card border-border/50 shadow-card mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {mockQuiz.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[
                mockQuiz.questions[currentQuestion].id
              ]?.toString()}
              onValueChange={value =>
                handleAnswerSelect(
                  mockQuiz.questions[currentQuestion].id,
                  parseInt(value),
                )
              }
              className="space-y-4"
            >
              {mockQuiz.questions[currentQuestion].options.map(
                (option, index) => (
                  <div
                    key={index}
                    className="bg-background/50 hover:bg-background/70 transition-smooth flex items-center space-x-3 rounded-lg p-3"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {mockQuiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  index === currentQuestion
                    ? 'default'
                    : answers[mockQuiz.questions[index].id] !== undefined
                      ? 'secondary'
                      : 'outline'
                }
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="h-10 w-10 p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {currentQuestion === mockQuiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              variant="hero"
              disabled={Object.keys(answers).length === 0}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentQuestion === mockQuiz.questions.length - 1}
              variant="default"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
