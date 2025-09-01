'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot, FileText, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const steps = [
  {
    icon: FileText,
    title: 'Enter Your Topic',
    description:
      'Type any topic or paste text content. Upload notes, articles, or course materials.',
    color: 'text-primary',
  },
  {
    icon: Bot,
    title: 'AI Generates Questions',
    description:
      'Our advanced AI analyzes your content and creates relevant, engaging quiz questions automatically.',
    color: 'text-accent',
  },
  {
    icon: Share2,
    title: 'Share & Track',
    description:
      'Publish your quiz instantly and share with students. Monitor progress and performance in real-time.',
    color: 'text-primary-glow',
  },
];

const HowItWorkSection = () => {
  return (
    <section id="how-it-works" className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Create professional quizzes in three simple steps with the power of
            AI.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="from-border absolute top-1/2 left-full z-0 hidden h-0.5 w-full -translate-y-1/2 transform bg-gradient-to-r to-transparent md:block"></div>
                )}

                {/* Step circle */}
                <div className="bg-gradient-card shadow-elegant relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Step number */}
                <div className="bg-gradient-primary shadow-card absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-foreground mb-3 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link href="/builder">Try It Now - It&apos;s Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
