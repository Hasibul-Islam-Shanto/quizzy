'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-soft relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="bg-gradient-hero absolute inset-0 -z-10 opacity-5"></div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in text-center lg:text-left">
            <div className="bg-gradient-card shadow-card mb-6 inline-flex items-center rounded-full border border-white/20 px-4 py-2">
              <Sparkles className="text-primary mr-2 h-4 w-4" />
              <span className="text-foreground text-sm font-medium">
                AI-Powered Quiz Generation
              </span>
            </div>

            <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-6xl">
              Build Quizzes
              <br />
              <span className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Instantly with AI
              </span>
            </h1>

            <p className="text-muted-foreground mb-8 max-w-2xl text-xl lg:max-w-lg">
              Turn any topic into interactive quizzes in seconds. Create
              engaging learning experiences with the power of artificial
              intelligence.
            </p>

            <div className="z-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                variant="hero"
                size="lg"
                asChild
                onClick={() => console.log('Clicking...')}
              >
                <Link href="/quiz-builder">
                  Start Creating
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="floating" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative lg:pl-8">
            <div className="animate-float relative">
              <img
                src={'/hero-illustration.png'}
                alt="AI Quiz Generation Illustration"
                className="shadow-glow mx-auto w-full max-w-lg rounded-2xl"
              />
            </div>

            {/* Floating elements */}
            <div
              className="bg-gradient-primary shadow-elegant animate-float absolute -top-4 -left-4 rounded-xl p-3"
              style={{ animationDelay: '0.5s' }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div
              className="bg-accent shadow-elegant animate-float absolute -right-6 -bottom-6 rounded-xl p-4"
              style={{ animationDelay: '1s' }}
            >
              <span className="text-accent-foreground text-lg font-bold">
                100%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
