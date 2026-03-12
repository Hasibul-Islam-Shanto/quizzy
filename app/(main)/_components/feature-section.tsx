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
          <p className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Features
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A complete toolkit for creating, sharing, and tracking engaging
            quizzes that enhance learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-gradient-card shadow-card transition-shadow duration-200 hover:shadow-elegant"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <CardTitle className="text-base text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
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
