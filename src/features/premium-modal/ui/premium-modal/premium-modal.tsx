'use client';

import { type FC, memo, useCallback, useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { AxiosError } from 'axios';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { useModal } from '@/shared/lib/hooks/use-modal';
import { Badge } from '@/shared/ui/badge';
import { ToolItem, Tools } from '@/shared/consts/tools';
import { Card } from '@/shared/ui/card';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { subscriptionAPI } from '@/shared/api/subscription-api';
import { useToast } from '@/shared/ui/use-toast';

interface PremiumModalProps {
  className?: string;
}

export const PremiumModal: FC<PremiumModalProps> = memo(() => {
  const { isOpen, type, onClose } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const isModalOpen = isOpen && type === 'pro-modal';

  const onSubscribe = useCallback(async () => {
    setIsLoading(true);
    const response = await subscriptionAPI.getSubscriptionUrl();

    if (response instanceof AxiosError) {
      setIsLoading(false);
      toast({ variant: 'destructive', description: 'Something went wrong.' });

      return;
    }

    setIsLoading(false);

    window.location.href = response.url;
  }, [toast]);

  const renderTool = useCallback((tool: ToolItem) => (
    <Card key={tool.label} className="p-3 border-black/5 dark:border-gray-600 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
          <tool.icon className={cn('w-6 h-6', tool.color)} />
        </div>
        <p className="font-semibold text-sm">
          {tool.label}
        </p>
      </div>
      <Check className="text-primary w-6 h-6" />
    </Card>
  ), []);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge className="uppercase text-sm py-1" variant="premium">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {Tools.map(renderTool)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="lg" variant="premium" className="w-full" disabled={isLoading} onClick={onSubscribe}>
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
