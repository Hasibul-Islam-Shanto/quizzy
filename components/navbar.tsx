import Link from 'next/link';
import { Brain, Sparkles } from 'lucide-react';
import HeaderProfileButton from './header-profile-button';
import MobileMenu from './mobile-menu';
import { checkUser } from '@/lib/checkUser';
import NavLink from './navLink';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Quizzes', href: '/quizzes' },
  { label: 'Dashboard', href: '/quiz-dashboard' },
  { label: 'Leaderboard', href: '/quiz-leaderboard' },
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
            <span className="text-foreground text-xl font-bold">Quizzy</span>
            <div className="text-muted-foreground border-primary flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs">
              <Sparkles className="text-primary h-3.5 w-3.5" />
              Beta
            </div>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            {navLinks.map(item => (
              <NavLink key={item.href} label={item.label} href={item.href} />
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
