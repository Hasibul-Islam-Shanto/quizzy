'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Brain, Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground flex items-center space-x-2 text-2xl font-bold"
          >
            <div className="bg-gradient-primary rounded-lg p-2">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span>Quizzy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
            >
              How it Works
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/quiz-leaderboard"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
            >
              Leaderboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="text-muted absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-white" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium">
              Login
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link href="/builder">Start Creating</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="bg-background/95 border-border mt-2 rounded-lg border-t p-4 backdrop-blur-sm md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="border-border flex flex-col space-y-2 border-t pt-4">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link href="/builder">Start Creating</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
