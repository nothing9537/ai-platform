'use client';

import { FC, memo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn';

import { SidebarItems } from '../../model/consts/sidebar-items';
import { SidebarItem } from '../../model/types/sidebar-item';

interface SidebarProps {
  className?: string;
}

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const pathname = usePathname();

  const renderSidebarItem = useCallback((item: SidebarItem) => (
    <Link
      href={item.href}
      key={item.href}
      className={cn(
        'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400',
        pathname === item.href && 'bg-white/10 text-white',
      )}
    >
      <div className="flex items-center flex-1">
        <item.icon className={cn('h-5 w-5 mr-3', item.color)} />
        <span>{item.label}</span>
      </div>
    </Link>
  ), [pathname]);

  return (
    <section className={cn('space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white', className)}>
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
            />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {SidebarItems.map(renderSidebarItem)}
        </div>
      </div>
    </section>
  );
});
