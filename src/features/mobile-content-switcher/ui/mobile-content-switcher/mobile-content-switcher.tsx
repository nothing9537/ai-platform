'use client';

import { FC, ReactNode, memo } from 'react';

import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetContentProps, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/lib/cn';
import { useMounted } from '@/shared/lib/hooks/use-mounted';

interface MobileContentSwitcherProps {
  content: ReactNode;
  trigger: ReactNode;
  contentProps?: SheetContentProps;
  classNames?: {
    triggerElement?: string;
    sheet?: {
      trigger?: string;
      content?: string;
    };
  };
}

export const MobileContentSwitcher: FC<MobileContentSwitcherProps> = memo(({ content, trigger, contentProps, classNames }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className={classNames?.sheet?.trigger}>
        <Button variant="ghost" size="icon" className={cn('md:hidden', classNames?.triggerElement)}>
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent {...contentProps} className={classNames?.sheet?.content}>
        {content}
      </SheetContent>
    </Sheet>
  );
});
