'use client';

import { type FC, memo } from 'react';
import { useAuth } from '@clerk/nextjs';
import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface LandingHeroProps {
  className?: string;
}

export const LandingHero: FC<LandingHeroProps> = memo(({ className }) => {
  const { isSignedIn } = useAuth();

  return (
    <div className={cn('text-white font-bold py-36 text-center space-y-6', className)}>
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot.',
                'Image Generation.',
                'Video Generation.',
                'Music Generation.',
                'Code Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <p className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </p>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start generating for free.
          </Button>
        </Link>
      </div>
      <p className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </p>
    </div>
  );
});
