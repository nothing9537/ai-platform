'use client';

import { type FC } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  );
};
