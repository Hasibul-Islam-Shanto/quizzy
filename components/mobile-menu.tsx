'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leaderboard', href: '/quiz-leaderboard' },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-center rounded-md p-1.5 text-foreground transition-colors hover:bg-muted md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute top-14 right-0 left-0 border-b border-border bg-card/95 py-3 backdrop-blur-sm md:hidden">
          <div className="app-container flex flex-col gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <Button variant="hero" size="sm" className="w-full" asChild>
                <Link href="/quiz-builder" onClick={() => setOpen(false)}>
                  Start Creating
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
