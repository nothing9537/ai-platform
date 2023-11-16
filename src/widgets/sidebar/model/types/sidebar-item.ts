import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}
