import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-border border-t">
      <div className="app-container">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded">
              <Brain className="text-primary-foreground h-3.5 w-3.5" />
            </div>
            <span className="text-foreground text-sm font-semibold">
              Quizzy
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            &copy; 2025 Quizzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
