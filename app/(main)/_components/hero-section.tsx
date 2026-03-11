import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center bg-white py-10">
      <div className="app-container py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C8D9E6] bg-[#C8D9E6]/25 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#567C8D]" />
          <span className="text-xs font-medium text-[#567C8D]">
            AI-Powered Quiz Generation
          </span>
        </div>
        <h1 className="mb-5 text-4xl leading-tight font-bold tracking-tight text-[#2F4156] md:text-6xl">
          Build Smarter Quizzes, <br />
          <span className="bg-gradient-to-r from-[#2F4156] to-[#567C8D] bg-clip-text text-transparent">
            Instantly with AI
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base text-[#567C8D] md:text-lg">
          Turn any topic into interactive quizzes in seconds. Create engaging
          learning experiences powered by artificial intelligence.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="lg" asChild>
            <Link href="/quiz-builder">
              Start Creating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#C8D9E6] text-[#2F4156] hover:bg-[#C8D9E6]/20"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
