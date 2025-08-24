import { BookOpen } from 'lucide-react';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                  Quizzy
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Empowering educators with AI-powered quiz creation tools. Make
              learning interactive and engaging for students worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-4 font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 border-t pt-5 text-center">
          <p className="text-muted-foreground">
            © 2025 Quizzy. All rights reserved. Built with AI for educators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
