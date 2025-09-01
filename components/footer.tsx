import { Brain } from 'lucide-react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-gradient-soft border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-foreground text-xl font-bold">Quizzy</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Build interactive quizzes instantly with AI. Transform any topic
              into engaging learning experiences in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">Product</h3>
            <div className="space-y-3">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                How it Works
              </Link>
              <Link
                href="/builder"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                Quiz Builder
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">Company</h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-smooth block"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>&copy; 2024 Quizzy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
