'use client';

import Image from 'next/image';
import { memo, type FC } from 'react';

interface EmptyProps {
  label: string;
}

export const Empty: FC<EmptyProps> = memo(({ label }) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          alt="Empty"
          fill
          src="/empty.png"
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  );
});
