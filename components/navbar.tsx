import Link from 'next/link';
import { Brain } from 'lucide-react';
import HeaderProfileButton from './header-profile-button';
import ToggleThemeButton from './toggle-theme-button';
import MobileMenu from './mobile-menu';
import { checkUser } from '@/lib/checkUser';

const Navbar = async () => {
  await checkUser();
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          <div className="hidden items-center space-x-4 md:flex">
            <ToggleThemeButton />
            <HeaderProfileButton />
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
