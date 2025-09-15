'use client';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
    
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="h-9 w-9"
      >
        <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="text-muted absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-white" />
      </Button>
    </>
  );
};

export default ToggleThemeButton;
