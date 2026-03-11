import Link from 'next/link';
import { Brain } from 'lucide-react';
import HeaderProfileButton from './header-profile-button';
import MobileMenu from './mobile-menu';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leaderboard', href: '/quiz-leaderboard' },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm">
      <div className="app-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2F4156]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[#2F4156]">
              Quizzy
            </span>
          </Link>

          {/* Right side: nav links + profile */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#567C8D] transition-colors hover:text-[#2F4156]"
              >
                {item.label}
              </Link>
            ))}
            <HeaderProfileButton />
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
