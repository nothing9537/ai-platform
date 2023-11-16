'use client';

import { type FC } from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export const UserAvatar: FC = () => {
  const { user } = useUser();

  return (
    <Avatar className="h-14 w-14">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.username?.slice(0, 2)?.toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
