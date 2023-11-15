'use client';

import { FC, ReactNode, memo } from 'react';
import { Menu } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

import { MobileContentSwitcher } from '@/features/mobile-content-switcher';
import { cn } from '@/shared/lib/cn';

interface NavbarProps {
  className?: string;
  sheetContent: ReactNode;
}

export const Navbar: FC<NavbarProps> = memo(({ className, sheetContent }) => {
  return (
    <section className={cn('flex items-center p-4', className)}>
      <MobileContentSwitcher
        trigger={<Menu />}
        content={sheetContent}
        contentProps={{ side: 'left' }}
        classNames={{ sheet: { content: 'p-0' } }}
      />
      <header className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </header>
    </section>
  );
});
