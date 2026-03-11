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
        className="flex items-center justify-center rounded-md p-1.5 text-[#2F4156] transition-colors hover:bg-[#C8D9E6]/30 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute top-14 right-0 left-0 border-b border-[#C8D9E6] bg-white/95 py-3 backdrop-blur-sm md:hidden">
          <div className="app-container flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-[#567C8D] transition-colors hover:bg-[#C8D9E6]/20 hover:text-[#2F4156]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-[#C8D9E6] pt-2">
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
