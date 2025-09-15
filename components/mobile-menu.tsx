'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
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
      {isMenuOpen && (
        <div className="bg-background/95 border-border absolute top-10 w-full rounded-lg border-t p-4 backdrop-blur-sm md:hidden">
          <div className="flex flex-col space-y-4 px-5">
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
              <Button variant="hero" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
