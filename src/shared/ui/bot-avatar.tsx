'use client';

import { type FC } from 'react';
import { Avatar, AvatarImage } from './avatar';

export const BotAvatar: FC = () => {
  return (
    <Avatar className="h-14 w-14">
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
};
