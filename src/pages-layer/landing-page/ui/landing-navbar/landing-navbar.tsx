'use client';

import { type FC, memo } from 'react';
import { Montserrat } from 'next/font/google';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface LandingNavbarProps {
  className?: string;
}

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

export const LandingNavbar: FC<LandingNavbarProps> = memo(({ className }) => {
  const { isSignedIn } = useAuth();

  return (
    <nav className={cn('p-4 bg-transparent flex items-center justify-between', className)}>
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image
            fill
            alt="Logo"
            src="/logo.png"
          />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', montserrat.className)}>
          Genius
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
});
