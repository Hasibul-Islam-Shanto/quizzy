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
        className="text-foreground hover:bg-muted flex items-center justify-center rounded-md p-1.5 transition-colors md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="border-border bg-card/95 absolute top-14 right-0 left-0 border-b py-3 backdrop-blur-sm md:hidden">
          <div className="app-container flex flex-col gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-border mt-2 border-t pt-2">
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
