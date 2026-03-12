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
      'Transform any topic or text into comprehensive quizzes with intelligent question generation automatically.',
  },
  {
    icon: Edit3,
    title: 'Edit & Customize',
    description:
      'Fine-tune questions, adjust difficulty levels, and personalize content to match your teaching style.',
  },
  {
    icon: Share2,
    title: 'Share with Students',
    description:
      'Distribute quizzes instantly with shareable links and track participation in real-time.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description:
      'Monitor progress with detailed analytics, leaderboards, and insights to improve learning outcomes.',
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-10">
      <div className="app-container">
        <div className="mb-12 text-center">
          <p className="text-muted-foreground mb-3 text-sm font-semibold tracking-widest uppercase">
            Features
          </p>
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Everything you need
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            A complete toolkit for creating, sharing, and tracking engaging
            quizzes that enhance learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-gradient-card shadow-card hover:shadow-elegant transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="bg-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary-foreground h-5 w-5" />
                </div>
                <CardTitle className="text-foreground text-base">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
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
