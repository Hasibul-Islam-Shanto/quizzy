import type { Metadata } from 'next';
import './globals.css';
import { Work_Sans } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import ClerkGlobalProvider from '@/providers/ClerkGlobalProvider';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Quizzy',
  description: 'A fun quiz application for everyone where knowledge is tested.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkGlobalProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${workSans.className} antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkGlobalProvider>
  );
}
