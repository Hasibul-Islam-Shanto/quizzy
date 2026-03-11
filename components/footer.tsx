import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="app-container">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#2F4156]">
              <Brain className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#2F4156]">Quizzy</span>
          </div>
          <p className="text-xs text-[#567C8D]">
            &copy; 2025 Quizzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
