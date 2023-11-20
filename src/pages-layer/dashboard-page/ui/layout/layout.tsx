import APILimit from '@/shared/lib/api-limit';
import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';
import type { FC, ReactNode } from 'react';

interface DashboardPageLayoutProps {
  children: ReactNode;
}

export const DashboardPageLayout: FC<DashboardPageLayoutProps> = async ({ children }) => {
  const userAPICallLimit = await APILimit.getAPILimitCount();

  return (
    <div className="h-full relative">
      <section className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar userAPICallLimit={userAPICallLimit} />
      </section>
      <main className="md:pl-72">
        <Navbar sheetContent={<Sidebar userAPICallLimit={userAPICallLimit} />} />
        {children}
      </main>
    </div>
  );
};
