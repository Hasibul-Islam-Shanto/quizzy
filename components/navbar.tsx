import Link from 'next/link';
import { Brain } from 'lucide-react';
import HeaderProfileButton from './header-profile-button';
import MobileMenu from './mobile-menu';
import { checkUser } from '@/lib/checkUser';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leaderboard', href: '/quiz-leaderboard' },
  { label: 'Quizzes', href: '/quizzes' },
];

const Navbar = async () => {
  await checkUser();
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-sm">
      <div className="app-container">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
              <Brain className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-foreground text-lg font-semibold">
              Quizzy
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
