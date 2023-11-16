import { memo, type FC } from 'react';

import { BotAvatar } from '@/shared/ui/bot-avatar';

interface AIMessageTextProps {
  content: string;
}

export const AIMessageText: FC<AIMessageTextProps> = memo(({ content }) => {
  return (
    <div className="p-8 w-full flex items-center gap-x-8 rounded-lg bg-muted">
      <BotAvatar />
      <p className="text-sm">
        {content}
      </p>
    </div>
  );
});
