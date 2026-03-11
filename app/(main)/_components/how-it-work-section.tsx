import { Button } from '@/components/ui/button';
import { Bot, FileText, Share2 } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: FileText,
    title: 'Enter Your Topic',
    description:
      'Type any topic or paste text content. Upload notes, articles, or course materials.',
  },
  {
    icon: Bot,
    title: 'AI Generates Questions',
    description:
      'Our AI analyzes your content and creates relevant, engaging quiz questions automatically.',
  },
  {
    icon: Share2,
    title: 'Share & Track',
    description:
      'Publish your quiz and share with students. Monitor progress and performance in real-time.',
  },
];

const HowItWorkSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-10">
      <div className="app-container">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[#567C8D] uppercase">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-[#2F4156] md:text-4xl">
            Three simple steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#567C8D]">
            Create professional quizzes in minutes — no experience needed.
          </p>
        </div>

        <div className="mb-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 right-[-calc(50%-3rem)] left-[calc(50%+3rem)] hidden h-px bg-[#C8D9E6] md:block" />
              )}

              {/* Icon circle */}
              <div className="relative mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C8D9E6] bg-white">
                <step.icon className="h-5 w-5 text-[#2F4156]" />
                {/* Step number */}
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2F4156] text-[10px] font-bold text-white">
                  {index + 1}
                </span>
              </div>

              <h3 className="mb-2 font-semibold text-[#2F4156]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#567C8D]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link href="/quiz-builder">Try It Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
