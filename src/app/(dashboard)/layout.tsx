import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Genius | Dashboard',
  description: 'The home page of all our AIs.',
};

export { DashboardPageLayout as default } from '@/pages-layer/dashboard-page';
