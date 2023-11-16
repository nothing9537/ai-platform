import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { cn } from '@/shared/lib/cn';
import { ThemeProvider } from './providers/theme-provider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI SaaS Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableColorScheme
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
