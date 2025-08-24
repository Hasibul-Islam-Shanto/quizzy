'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                Quizzy
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </Link>

              <Link
                href="/quiz"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Quizzes
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              className="border-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
