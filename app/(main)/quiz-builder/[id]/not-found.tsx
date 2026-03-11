import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="bg-gradient-soft flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="bg-gradient-primary shadow-elegant mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl">
          <FileQuestion className="h-10 w-10 text-white" />
        </div>

        {/* Heading */}
        <h1 className="text-foreground mb-2 text-4xl font-bold tracking-tight">
          Quiz Not Found
        </h1>

        {/* Sub-text */}
        <p className="text-muted-foreground mb-2 text-base">
          The quiz you&apos;re looking for doesn&apos;t exist or may have been
          removed.
        </p>

        {/* Divider with hint */}
        <div className="border-border bg-muted/50 my-6 rounded-lg border px-4 py-3">
          <p className="text-muted-foreground text-sm">
            If you followed a link, it may be outdated. Try going back to the
            builder to start fresh.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/quiz-builder">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quiz Builder
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
