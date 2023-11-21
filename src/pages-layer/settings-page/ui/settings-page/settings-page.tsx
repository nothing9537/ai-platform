import { type FC } from 'react';
import { Settings } from 'lucide-react';
import { Heading } from '@/features/heading';
import { checkSubscription } from '@/shared/lib/subscription';
import { Badge } from '@/shared/ui/badge';
import { SubscriptionButton } from '@/features/subscription-button';

export const SettingsPage: FC = async () => {
  const isPremium = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        Icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <p className="text-muted-foreground text-lg">
          {isPremium
            ? (
              <>
                You are currently on a
                {' '}
                <Badge variant="premium">PREMIUM</Badge>
                {' '}
                plan.
              </>
            )
            : 'You are currently on a FREE plan.'}
        </p>
        <SubscriptionButton
          isPremium={isPremium}
        />
      </div>
    </div>
  );
};
