'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-20 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-foreground mb-6 text-4xl font-bold sm:text-6xl lg:text-7xl">
            Build Quizzes{' '}
            <span className="text-purple-600 dark:text-purple-400">
              Instantly
            </span>{' '}
            with Ease
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl leading-relaxed">
            Create interactive quizzes with beautiful UI and seamless user
            experience. Perfect for teachers, students, and anyone who wants to
            make learning engaging.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-purple-600 px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl"
              asChild
            >
              <Link href="/quiz-builder">Start Creating</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 bg-transparent px-8 py-6 text-lg text-purple-600 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-950"
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="rounded-2xl border-2 border-purple-200 shadow-2xl dark:border-purple-800">
              <div className="bg-card rounded-xl p-8">
                <div className="mb-4 flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <Image
                  src="/hero-1.png"
                  alt="Quizzy Interface Preview"
                  width={600}
                  height={600}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
