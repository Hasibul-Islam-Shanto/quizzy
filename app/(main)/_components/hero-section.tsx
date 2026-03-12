import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center py-10">
      <div className="app-container py-20 text-center">
        <div className="border-border bg-muted/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
          <Sparkles className="text-primary h-3.5 w-3.5" />
          <span className="text-muted-foreground text-xs font-medium">
            AI-Powered Quiz Generation
          </span>
        </div>
        <h1 className="text-foreground mb-5 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
          Build Smarter Quizzes, <br />
          <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
            Instantly with AI
          </span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-xl text-base md:text-lg">
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
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
