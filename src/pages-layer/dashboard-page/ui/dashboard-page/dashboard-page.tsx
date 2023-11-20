'use client';

import { useCallback, type FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/ui/card';
import { ToolItem, Tools } from '@/shared/consts/tools';

interface DashboardPageProps {
  className?: string;
}

export const DashboardPage: FC<DashboardPageProps> = ({ className }) => {
  const router = useRouter();

  const onNavigate = useCallback((item: ToolItem) => () => {
    router.push(item.href);
  }, [router]);

  const renderTool = useCallback((tool: ToolItem) => (
    <Card
      key={tool.href}
      onClick={onNavigate(tool)}
      className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-x-4">
        <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
          <tool.icon className={cn('w-8 h-8', tool.color)} />
        </div>
        <span className="font-semibold">
          {tool.label}
        </span>
      </div>
      <ArrowRight className="w-5 h-5" />
    </Card>
  ), [onNavigate]);

  return (
    <div className={cn('', className)}>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {Tools.map(renderTool)}
      </div>
    </div>
  );
};
