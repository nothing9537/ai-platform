'use client';

import { useCallback, type FC } from 'react';
import { Zap } from 'lucide-react';

import { useMounted } from '../lib/hooks/use-mounted';
import { MAX_FREE_API_CALL_COUNT } from '../consts/api-limit';
import { useModal } from '../lib/hooks/use-modal';
import { Card, CardContent } from './card';
import { Progress } from './progress';
import { Button } from './button';

interface FreeCounterProps {
  value: number;
  isPremium?: boolean;
}

export const FreeCounter: FC<FreeCounterProps> = ({ value = 0, isPremium }) => {
  const mounted = useMounted();
  const { onOpen } = useModal();

  const onUpgradeClick = useCallback(() => {
    onOpen('pro-modal');
  }, [onOpen]);

  if (!mounted) {
    return null;
  }

  if (isPremium) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm mb-4 text-white space-y-2">
            <p>
              {value}
              {' '}
              /
              {' '}
              {MAX_FREE_API_CALL_COUNT}
              {' '}
              Free Generations
            </p>
            <Progress
              className="h-3"
              value={(value / MAX_FREE_API_CALL_COUNT) * 100}
            />
          </div>
          <Button className="w-full" variant="premium" onClick={onUpgradeClick}>
            Upgrade
            <Zap className="w-5 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
