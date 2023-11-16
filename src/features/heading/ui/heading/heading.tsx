import { type FC, memo } from 'react';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

interface HeadingProps {
  className?: string;
  description: string;
  title: string;
  Icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading: FC<HeadingProps> = memo(({ className, title, description, Icon, iconColor, bgColor }) => {
  return (
    <div className={cn('px-4 lg:px-8 flex items-center gap-x-3 mb-8', className)}>
      <div className={cn('p-2 w-fit rounded-md', bgColor)}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
});
