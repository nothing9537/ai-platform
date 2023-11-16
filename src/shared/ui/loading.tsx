'use client';

import Image from 'next/image';
import { type FC } from 'react';

export const Loading: FC = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          fill
          alt="Logo"
          src="/logo.png"
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        Genius is thinking...
      </p>
    </div>
  );
};
