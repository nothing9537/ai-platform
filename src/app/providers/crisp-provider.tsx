'use client';

import { type FC } from 'react';

import { useCrisp } from '@/shared/lib/hooks/use-crisp';

export const CrispProvider: FC = () => {
  useCrisp();

  return null;
};
