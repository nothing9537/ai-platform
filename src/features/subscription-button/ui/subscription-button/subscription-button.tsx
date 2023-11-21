'use client';

import { Zap } from 'lucide-react';
import { type FC, memo, useCallback, useState } from 'react';
import { AxiosError } from 'axios';

import { Button } from '@/shared/ui/button';
import { subscriptionAPI } from '@/shared/api/subscription-api';
import { useToast } from '@/shared/ui/use-toast';

interface SubscriptionButtonProps {
  isPremium: boolean;
}

export const SubscriptionButton: FC<SubscriptionButtonProps> = memo(({ isPremium = false }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const onManageSubscription = useCallback(async () => {
    setIsLoading(true);

    const response = await subscriptionAPI.getSubscriptionUrl();

    if (response instanceof AxiosError) {
      toast({ variant: 'destructive', description: 'Something went wrong when subscribing.' });
      setIsLoading(false);
      return;
    }

    window.location.href = response.url;
  }, [toast]);

  return (
    <Button
      onClick={onManageSubscription}
      size="lg"
      variant={isPremium ? 'default' : 'premium'}
      disabled={isLoading}
    >
      {isPremium ? 'Manage Subscription' : 'Upgrade'}
      {!isPremium && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
});
