import { memo, type FC } from 'react';

import { UserAvatar } from '@/shared/ui/user-avatar';

interface UserMessageProps {
  content: string;
}

export const UserMessage: FC<UserMessageProps> = memo(({ content }) => {
  return (
    <div className="p-8 w-full flex items-start gap-x-8 rounded-lg border border-black/10 dark:border-muted">
      <UserAvatar />
      <p className="text-sm">
        {content}
      </p>
    </div>
  );
});
