'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot, Edit3, Share2, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Generation',
    description:
      'Transform any topic or text into comprehensive quizzes with intelligent question generation and multiple choice options.',
  },
  {
    icon: Edit3,
    title: 'Edit & Customize',
    description:
      'Fine-tune generated questions, adjust difficulty levels, and personalize content to match your teaching style.',
  },
  {
    icon: Share2,
    title: 'Share with Students',
    description:
      'Instantly distribute quizzes to students with shareable links and track participation in real-time.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description:
      'Monitor student progress with detailed analytics, leaderboards, and insights to improve learning outcomes.',
  },
];
const FeatureSection = () => {
  return (
    <section id="features" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Powerful Features for Modern Education
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Everything you need to create, share, and track engaging quizzes
            that enhance learning experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-gradient-card shadow-card hover:shadow-elegant border-white/20 transition-all duration-300 ease-out hover:-translate-y-2"
            >
              <CardHeader>
                <div className="bg-gradient-primary mb-4 w-fit rounded-lg p-3 transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
