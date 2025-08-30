'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Upload, Send, Loader2 } from 'lucide-react';

const examplePrompts = [
  'Math basics',
  'Photosynthesis',
  'World War II',
  'JavaScript fundamentals',
  'History Quiz',
];

const QuizBuilderPage = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePromptClick = (prompt: string) => {
    setTopic(prompt);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic }),
      });
      const data = await res.json();
      console.log('🚀 ~ handleSend ~ data:', data);
    } catch (err) {
      console.error('Error generating quiz:', err);
    }
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Create Your Quiz
          </h1>
          <p className="text-muted-foreground text-xl">
            Build engaging quizzes with our intuitive quiz builder
          </p>
        </div>

        {/* Input Area */}
        <Card className="mb-8 border-2 shadow-lg transition-colors hover:border-purple-200 dark:hover:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              What would you like to create a quiz about?
            </CardTitle>
            <CardDescription>
              Enter your topic or description and customize your quiz settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your topic here..."
                className="min-h-[100px] resize-none"
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSend}
                  className="h-12 w-12 border-0 bg-gradient-to-r from-purple-500 to-blue-600 p-0 text-white hover:from-purple-600 hover:to-blue-700"
                  disabled={loading || !topic}
                >
                  {loading ? (
                    <span className="animate-spin">
                      <Loader2 />
                    </span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-12 border-2 bg-transparent p-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <label className="text-muted-foreground">Questions:</label>
                <select className="bg-background rounded border px-2 py-1">
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-muted-foreground">Difficulty:</label>
                <select className="bg-background rounded border px-2 py-1">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Quick start examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map(prompt => (
                  <Badge
                    key={prompt}
                    variant="secondary"
                    className="cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 hover:text-white"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 py-12 text-center">
          <CardContent>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Ready to Create?
            </h3>
            <p className="text-muted-foreground">
              Enter a topic above and start building your quiz questions
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default QuizBuilderPage;
