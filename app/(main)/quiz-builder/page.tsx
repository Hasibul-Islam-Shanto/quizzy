'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Send,
  Sparkles,
  Trash2,
  Plus,
  Save,
  Share,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const examplePrompts = [
  'Math basics for grade 5',
  'Photosynthesis process',
  'World War II timeline',
  'JavaScript fundamentals',
];
const QuizBuilderPage = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const simulateAIGeneration = async () => {
    setIsGenerating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock questions based on topic
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: `What is the main concept behind ${topic || 'this topic'}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
      },
      {
        id: '2',
        question: `Which of the following is most important for understanding ${topic || 'this topic'}?`,
        options: [
          'First principle',
          'Second principle',
          'Third principle',
          'Fourth principle',
        ],
        correctAnswer: 1,
      },
      {
        id: '3',
        question: `What would be a practical application of ${topic || 'this topic'}?`,
        options: [
          'Application 1',
          'Application 2',
          'Application 3',
          'Application 4',
        ],
        correctAnswer: 2,
      },
    ];

    setQuestions(mockQuestions);
    setQuizTitle(`Quiz: ${topic || 'Generated Quiz'}`);
    setIsGenerating(false);
  };

  const updateQuestion = (
    id: string,
    field: keyof Question,
    value: unknown,
  ) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: 'New question',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <main className="bg-gradient-soft pt-20 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            AI Quiz Builder
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe your topic and let AI create engaging quiz questions for
            you
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-gradient-card shadow-elegant mb-8 border-white/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              Tell us what you want to quiz about
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Textarea
                placeholder="Type your topic, paste text content, or describe what you'd like to quiz about..."
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="bg-background/50 min-h-[120px] resize-none border-white/20"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={simulateAIGeneration}
                disabled={!topic.trim() || isGenerating}
                variant="hero"
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </>
                )}
              </Button>

              <Button variant="floating" size="default">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>

            {/* Example Prompts */}
            <div>
              <p className="text-muted-foreground mb-3 text-sm">
                Quick start with these examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-smooth cursor-pointer"
                    onClick={() => setTopic(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Preview */}
        {questions.length > 0 && (
          <div className="space-y-6">
            {/* Quiz Title */}
            <Card className="bg-gradient-card shadow-card border-white/20">
              <CardContent className="pt-6">
                <Input
                  value={quizTitle}
                  onChange={e => setQuizTitle(e.target.value)}
                  className="bg-background/50 border-white/20 text-lg font-semibold"
                  placeholder="Quiz Title"
                />
              </CardContent>
            </Card>

            {/* Questions */}
            {questions.map((question, questionIndex) => (
              <Card
                key={question.id}
                className="bg-gradient-card shadow-card border-white/20"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-foreground text-lg font-semibold">
                    Question {questionIndex + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={question.question}
                    onChange={e =>
                      updateQuestion(question.id, 'question', e.target.value)
                    }
                    className="bg-background/50 border-white/20"
                    placeholder="Enter your question"
                  />

                  <div className="space-y-2">
                    <p className="text-foreground text-sm font-medium">
                      Answer Options:
                    </p>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-3"
                      >
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() =>
                            updateQuestion(
                              question.id,
                              'correctAnswer',
                              optionIndex,
                            )
                          }
                          className="text-primary"
                        />
                        <Input
                          value={option}
                          onChange={e => {
                            const newOptions = [...question.options];
                            newOptions[optionIndex] = e.target.value;
                            updateQuestion(question.id, 'options', newOptions);
                          }}
                          className="bg-background/50 flex-1 border-white/20"
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Question Button */}
            <Card className="bg-gradient-card shadow-card border-dashed border-white/20">
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  onClick={addQuestion}
                  className="border-border hover:border-primary transition-smooth h-20 w-full border-2 border-dashed"
                >
                  <Plus className="mr-2 h-6 w-6" />
                  Add Another Question
                </Button>
              </CardContent>
            </Card>

            {/* Save/Publish Actions */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Button variant="floating" size="lg" className="flex-1">
                <Save className="mr-2 h-5 w-5" />
                Save Draft
              </Button>
              <Button variant="hero" size="lg" className="flex-1">
                <Share className="mr-2 h-5 w-5" />
                Publish Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default QuizBuilderPage;
