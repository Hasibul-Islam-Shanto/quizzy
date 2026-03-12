import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="app-container">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Brain className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Quizzy</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2025 Quizzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
