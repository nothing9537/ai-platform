import { type FC, memo, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';

export const ThemeSwitcher: FC = memo(() => {
  const { setTheme } = useTheme();

  const onThemeChange = useCallback((theme: string) => () => setTheme(theme), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="bg-transparent border-0">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onThemeChange('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onThemeChange('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onThemeChange('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
