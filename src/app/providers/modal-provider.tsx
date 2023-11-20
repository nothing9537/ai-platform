'use client';

import { type FC } from 'react';
import { PremiumModal } from '@/features/premium-modal';

export const ModalProvider: FC = () => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <PremiumModal />
    </>
  );
};
